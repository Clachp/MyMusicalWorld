import './style.scss';

import { useDispatch, useSelector } from 'react-redux';
import { toggleAddMusicModal, submitSearchMusic } from 'src/actions/addMusic';
import { changeInput } from 'src/actions';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import CardResultsMusic from 'src/components/AddMusicModal/CardResultsMusic';
import Loading from 'src/components/Loading';

const AddMusicModal = () => {
  const dispatch = useDispatch();
  const {
    modalOpened, loading, searchMusic, typeMusic, resultsMusic,
  } = useSelector((state) => state.addMusic);

  const handleClose = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };
  const handleChangeInput = (event) => {
    const action = changeInput(event.target.value, event.target.name);
    dispatch(action);
  };
  const handleSubmit = () => {
    const action = submitSearchMusic();
    dispatch(action);
  };

  return (
    <Dialog className="addmusic__modal" open={modalOpened} onClose={handleClose}>
      <DialogTitle className="addmusic__title">Ajouter un titre / album / artiste</DialogTitle>
      <DialogContent className="addmusic__search">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': {
              m: 1, width: '25ch',
            },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="search__input"
            autoFocus
            margin="dense"
            name="searchMusic"
            id="search"
            label="Recherche"
            type="search"
            fullWidth
            variant="standard"
            placeholder="Entrez votre recherche"
            value={searchMusic}
            onChange={handleChangeInput}
          />
          <div className="search__wrapper">
            <FormControl className="search__type" sx={{ m: 1, width: 100 }}>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                label="Type"
                name="typeMusic"
                id="demo-simple-select"
                value={typeMusic}
                onChange={handleChangeInput}
              >
                <MenuItem value={1}>Titre</MenuItem>
                <MenuItem value={2}>Album</MenuItem>
                <MenuItem value={3}>Artiste</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button
                onClick={handleSubmit}
                className="button-green"
              >
                Rechercher
              </Button>
            </DialogActions>
          </div>
        </Box>
      </DialogContent>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      {loading && (
      <div className="result__loading">
        <Loading />
      </div>
      )}
      {(resultsMusic.length !== 0) && (
      <div className="result__cards">
        {resultsMusic.map((music) => (
          <CardResultsMusic
            key={music.apiId}
            music={music}
          />
        ))}
      </div>
      )}
    </Dialog>
  );
};

export default AddMusicModal;
