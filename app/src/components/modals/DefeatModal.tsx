import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from 'next/router';

export default function DefeatDialog({ open, setOpen, text, onDownload }) {
    const router = useRouter();
    const handleClose = () => {
      setOpen(false);
      router.push('/');
    };
  
    return (
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Verloren!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDownload} aria-label="Partie als PGN speichern">
              PGN speichern
            </Button>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
  
