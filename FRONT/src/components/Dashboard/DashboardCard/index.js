import { deleteDashboardItem } from 'src/actions/dashboard';
import { toggleAddMusicModal } from 'src/actions/addMusic';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert, Button, ButtonGroup, CardActions, Divider,
} from '@mui/material';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';

import PropTypes from 'prop-types';

import './style.scss';
import style from 'src/styles/_exports.module.scss';

import logo from 'src/assets/vinyles.jpg';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

const DashboardCard = ({
  name,
  genre,
  artist,
  year,
  url_image,
  type,
  album,
  api_id,
  url_sample,
}) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);

  const { isLogged } = useSelector((state) => state.user);

  const handleCardDelete = (api_id, type) => {
    const action = deleteDashboardItem(api_id, type);
    dispatch(action);
  };

  const handleOpenAddMusicModal = () => {
    const action = toggleAddMusicModal();
    dispatch(action);
  };

  return (
    <Card className="dashboard-card" sx={{ mb: '20px' }}>
      <CardMedia
        component="img"
        alt={name}
        height="auto"
        image={url_image}
      />
      <CardContent sx={{ textAlign: 'center' }}>
        {type !== 'artist' && type !== 'empty' && (
          <Typography gutterBottom variant="h5" component="div">
            {artist}
          </Typography>
        )}
        <Typography sx={type !== 'artist' ? { fontStyle: 'italic', fontSize: '20px' } : {}} gutterBottom variant="h5" component="div">
          {type === 'artist' ? name : `"${name}"`} {year && type === 'album' && `(${year})`}
        </Typography>
        {type === 'track' && (
          <Typography variant="body2" color="text.secondary">
            Album: {`"${album}" (${year})`}
          </Typography>
        )}
        {genre && (
          <Typography variant="body2" color="text.secondary">
            Genre: {genre}
          </Typography>
        )}
      </CardContent>
      { (type === 'track' || (isLogged && type !== 'empty')) && <Divider sx={{ mt: 'auto' }} /> }
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {isLogged && type !== 'empty' && (
          <Button
            onClick={() => {
              setShowAlert(true);
            }}
            size="small"
            sx={{ color: style.blue }}
          >
            <DeleteIcon sx={{ color: style.red }} />
          </Button>
        )}
        { type === 'track' && (
          <Button
            onClick={() => {
              window.open(url_sample, name, `width=300,height=100,left=${(window.innerWidth / 2) - 150},top=${(window.innerHeight / 2)}`);
            }}
          >
            <PlayCircleFilledOutlinedIcon sx={{ color: style['dark-grey'] }} />
          </Button>
        )}
        { type === 'empty' && (
          <Button sx={{ margin: '0 auto' }} onClick={handleOpenAddMusicModal}>
            Ajouter de la musique
          </Button>
        )}
      </CardActions>
      {showAlert && (
        <Alert
          sx={{ flexDirection: 'column', alignItems: 'center' }}
          severity="error"
          action={(
            <ButtonGroup orientation="vertical">
              <Button
                onClick={() => {
                  setShowAlert(false);
                }}
                color="inherit"
                size="small"
              >
                Annuler
              </Button>
              <Button
                onClick={() => handleCardDelete(api_id, type)}
                color="inherit"
                size="small"
              >
                Confirmer
              </Button>
            </ButtonGroup>
        )}
        >
          Confirmer la suppression ?
        </Alert>
      )}
    </Card>
  );
};

DashboardCard.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string,
  year: PropTypes.number,
  album: PropTypes.string,
  url_image: PropTypes.string.isRequired,
  api_id: PropTypes.number.isRequired,
  url_sample: PropTypes.string,
  genre: PropTypes.string,
  type: PropTypes.string.isRequired,
};

DashboardCard.defaultProps = {
  name: 'Mon album favori',
  type: 'empty',
  api_id: 1,
  url_image: logo,
};

export default DashboardCard;
