import { User, UserChapterProgression } from '../interfaces/user';

const storageKey = 'einfach-schach-guest-training-progress';

type GuestTrainingProgress = Pick<
  User,
  'chapterProgression' | 'coursesFinishedTotal'
>;

function emptyProgress(): GuestTrainingProgress {
  return {
    chapterProgression: {},
    coursesFinishedTotal: 0
  };
}

function validProgression(value: unknown): value is Record<number, UserChapterProgression> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Guest data belongs only to the current browser session.  It is deliberately
 * separate from users.json, which is reserved for registered local profiles.
 */
export function loadGuestTrainingProgress(): GuestTrainingProgress {
  if (typeof window === 'undefined') return emptyProgress();

  try {
    const stored = window.sessionStorage.getItem(storageKey);
    if (!stored) return emptyProgress();

    const parsed = JSON.parse(stored);
    return {
      chapterProgression: validProgression(parsed?.chapterProgression)
        ? parsed.chapterProgression
        : {},
      coursesFinishedTotal:
        typeof parsed?.coursesFinishedTotal === 'number' &&
        Number.isFinite(parsed.coursesFinishedTotal) &&
        parsed.coursesFinishedTotal >= 0
          ? parsed.coursesFinishedTotal
          : 0
    };
  } catch {
    return emptyProgress();
  }
}

export function saveGuestTrainingProgress(user: GuestTrainingProgress): void {
  if (typeof window === 'undefined') return;

  window.sessionStorage.setItem(storageKey, JSON.stringify(user));
}

export function clearGuestTrainingProgress(): void {
  if (typeof window === 'undefined') return;

  window.sessionStorage.removeItem(storageKey);
}
