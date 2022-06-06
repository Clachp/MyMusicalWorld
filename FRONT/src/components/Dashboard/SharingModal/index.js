import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { toggleSharingModal } from 'src/actions/dashboard';

const SharingModal = () => {
  const location = window.location.href.replace('dashboard', '');

  const { pseudo } = useSelector((state) => state.user);
  const { sharingModalOpened } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();

  const [isCopied, setIsCopied] = useState(false);

  const url = `${location}shared-space/${pseudo}`;

  const handleModalClose = () => {
    const action = toggleSharingModal();
    dispatch(action);
  };

  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    }
    return document.execCommand('copy', true, text);
  }
  const handleCopyClick = () => {
    copyTextToClipboard(url)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog className="sharing-modal" open={sharingModalOpened} onClose={handleModalClose}>
      <DialogTitle className="sharing-modal__title">Partager ma bibliothèque musicale</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="sharing-modal__input"
            margin="dense"
            name="url"
            id="url"
            label="Lien de partage"
            type="url"
            fullWidth
            variant="standard"
            value={url}
          />
          <DialogActions>
            <Button
              onClick={handleCopyClick}
              className="button-green"
            >
              {isCopied ? 'Copié!' : 'Copier'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
      <IconButton
        aria-label="close"
        onClick={handleModalClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </Dialog>
  );
};

export default SharingModal;
