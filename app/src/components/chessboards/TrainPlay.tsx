import { useEffect, useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { fetchWrapper } from '../../utils/fetch-wrapper';
import AlertDialog from '../modals/AlertModal';
import { useStore } from '../../utils/store';
import { Button, Typography } from '@mui/material';
import SuccessTrainingDialog from '../modals/SuccessTrainingModal';
import { Config } from 'chessground/config';
import { Chapter, Course } from '../../interfaces/training';
import { Api } from 'chessground/api';
import { toColor, toDests, toGermanColor } from '../../utils/helper';
import { Chessground as ChessgroundApi } from 'chessground';

import 'chessground/assets/chessground.base.css';
import 'chessground/assets/chessground.cburnett.css';
import PromotionDialog from '../modals/PromotionModal';
import ProgressBar from '../progress/ProgressBar';
import { saveGuestTrainingProgress } from '../../utils/guest-progress';

interface TrainPlayProps {
  width?: number;
  config?: Config;
  course?: Course;
  setSelectedCourse?: any;
  index?: number;
  chapter?: Chapter;
}

export default function TrainPlay({ width = 450, config, course, setSelectedCourse, index, chapter }: TrainPlayProps) {
  const legalMoves = course.moves;

  const [api, setApi] = useState<Api | null>(null);
  const [modal, setModal] = useState(false);
  const [win, setWin] = useState(false);
  const [promo, setPromo] = useState(false);
  const [variation, setVariation] = useState(-1);
  const [auswahl, setAuswahl] = useState('none');
  const [pendingPromotion, setPendingPromotion] = useState<{
    from: string;
    to: string;
    variationIndex: number;
  } | null>(null);
  // The exercise position must exist before Chessground is created.  Starting
  // with an empty Chess instance briefly exposed the normal opening position
  // and its move targets, which could leave an exercise board unresponsive.
  const [chess, setChess] = useState(() => new Chess(course.start));
  const [currentLegal, setCurrentLegal] = useState(0);
  const user = useStore((state) => state.loggedInUser);
  const setUser = useStore((state) => state.setLoggedInState);

  const ref = useRef<HTMLDivElement>(null);
  config = {
    ...config,
    fen: chess.fen(),
    movable: {
      color: 'white',
      free: false,
      dests: toDests(chess)
    },
    highlight: {
      check: true
    }
  };
  useEffect(() => {
    if (ref && ref.current && !api) {
      const chessgroundApi = ChessgroundApi(ref.current, {
        animation: { enabled: true, duration: user.animationSpeed },
        ...config
      });
      setApi(chessgroundApi);
    } else if (ref && ref.current && api) {
      api.set(config);
    }
  }, [ref]);

  useEffect(() => {
    api?.set({
      ...config,
      fen: chess.fen(),
      movable: {
        color: toColor(chess),
        dests: toDests(chess),
        events: {
          after: trainPlay(api, chess, user.animationSpeed)
        }
      }
    });
  }, [api, config]);

  useEffect(() => {
    if (!pendingPromotion || auswahl === 'none' || !api) return;

    const expectedMove = legalMoves[pendingPromotion.variationIndex][currentLegal];
    if (auswahl !== expectedMove.charAt(4)) {
      setModal(true);
      setCG(api, chess, true);
    } else {
      playCorrectMove(
        api,
        chess,
        user.animationSpeed,
        pendingPromotion.variationIndex,
        pendingPromotion.from,
        pendingPromotion.to,
        auswahl
      );
    }

    setAuswahl('none');
    setPendingPromotion(null);
  }, [auswahl, pendingPromotion, api]);

  function trainPlay(cg: Api, chess: Chess, delay: number) {
    return (orig, dest) => {
      let cou = 0;
      let found = false;
      if (variation === -1) {
        for (const vare of legalMoves) {
          if (vare[0].slice(0, 4) === orig + dest) {
            setVariation(cou);
            found = true;
            break;
          }
          cou += 1;
        }
        if (!found) {
          setModal(true);
          setCG(cg, chess, true);
        }
      }

      if (found || variation != -1) {
        const variationIndex = variation === -1 ? cou : variation;
        const expectedMove = legalMoves[variationIndex][currentLegal];
        if (orig + dest === expectedMove.slice(0, 4)) {
          const destFigure = chess.get(orig);
          if (dest[1] === '8' && destFigure.color === 'w' && destFigure.type === 'p') {
            setPromo(true);
            setPendingPromotion({ from: orig, to: dest, variationIndex });
          } else {
            playCorrectMove(cg, chess, delay, variationIndex, orig, dest);
          }
        } else {
          setModal(true);
          setCG(cg, chess, true);
        }
      }
    };
  }

  function playCorrectMove(
    cg: Api,
    chess: Chess,
    delay: number,
    variationIndex: number,
    from: string,
    to: string,
    promotion?: string
  ) {
    const moves = legalMoves[variationIndex];
    chess.move(promotion ? { from, to, promotion } : { from, to });

    if (currentLegal + 1 >= moves.length) {
      setWin(true);
      updateUserProgression();
      setCG(cg, chess, false);
      cg.destroy();
      return;
    }

    const nextFrom = moves[currentLegal + 1].slice(0, 2);
    const nextTo = moves[currentLegal + 1].slice(2, 4);
    chess.move({ from: nextFrom, to: nextTo });
    setTimeout(() => {
      //@ts-ignore
      cg.move(nextFrom, nextTo);
      setCG(cg, chess, true);
      increaseLegal();
    }, delay);
  }

  function updateUserProgression() {
    const previousProgress = user.chapterProgression[chapter.id];

    // Repeating a completed chapter is useful practice, but must not add
    // phantom exercises to the saved progress counter.
    if (previousProgress?.completed) {
      resetExerciseState();
      return;
    }

    const coursesFinished = Math.min(
      (previousProgress?.coursesFinished || 0) + 1,
      chapter.courses.length
    );
    const nextUser = {
      ...user,
      chapterProgression: {
        ...user.chapterProgression,
        [chapter.id]: {
          completed: coursesFinished === chapter.courses.length,
          coursesFinished
        }
      },
      coursesFinishedTotal: user.coursesFinishedTotal + 1
    };

    if (user.id != 999999) {
      fetchWrapper.post('/api/users/update', { ...nextUser });
    } else {
      saveGuestTrainingProgress(nextUser);
    }
    setUser(nextUser);
    resetExerciseState();
  }

  function resetExerciseState() {
    setChess(new Chess(course.start));
    setCurrentLegal(0);
    setVariation(-1);
    setPendingPromotion(null);
  }

  function increaseLegal() {
    setCurrentLegal(currentLegal + 2) ;
  }

  function skipCourse() {
    resetExerciseState();
    setSelectedCourse(index+1);
    setCG(api, chess, false);
  }

  function setCG(cg: Api, chess: Chess, highlight: boolean = true) {
    cg.set({
      fen: chess.fen(),
      turnColor: toColor(chess),
      movable: {
        color: toColor(chess),
        dests: toDests(chess)
      },
      highlight: {
        lastMove: highlight,
        check: true
      }
    });
  }

  const isRepeatingCompletedChapter =
    typeof user.chapterProgression[chapter.id] != 'undefined' &&
    user.chapterProgression[chapter.id].completed;

  const exerciseCount = isRepeatingCompletedChapter
    ? Math.min(10, chapter.courses.length)
    : chapter.courses.length;

  return (
    <>
      <AlertDialog open={modal} setOpen={setModal} text={'Probier es doch noch einmal'} />
      <PromotionDialog
        open={promo}
        setOpen={setPromo}
        text={
          'Dein Bauer hat das Ende des Spielfeldes erreicht! Du kannst jetzt Auswählen, durch welche Figur Du ihn ersetzen möchtest. Tippe die jeweilige Figur an und drücke anschließend auf “Bestätigen”.'
        }
        setAuswahl={setAuswahl}
      />
      <SuccessTrainingDialog
        open={win}
        setOpen={setWin}
        text={'Du hast alle richtigen Züge gefunden!'}
        setSelectedCourse={setSelectedCourse}
        index={index}
      />
      
      <Typography variant="h4" sx={{ textAlign: 'center', marginTop: -5, marginBottom: 1 }}>
  Am Zug: {toGermanColor(api?.state.turnColor)}
</Typography>

<Button
  variant="contained"
  sx={{
    position: 'absolute', 
    right: 0, 
    top: '2rem',
    marginRight: '1rem',
    backgroundColor: '#B12929',
    width: '9rem',
    height: '3rem',
    fontSize: 17,
    borderRadius: 5,
  }}
  onClick={skipCourse}
>
  Überspringen
</Button>


      <div style={{ height: width, width: width }}>
        <ProgressBar
          column={exerciseCount}
          progress={
            !isRepeatingCompletedChapter &&
            typeof user.chapterProgression[chapter.id] != 'undefined'
              ? user.chapterProgression[chapter.id].coursesFinished
              : index - 1
          }
        />
        <div ref={ref} style={{ height: '100%', width: '100%', display: 'table' }} />
      </div>
      
    </>
  );
}
