import './style.scss';
import styles from 'src/styles/_exports.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { submitAddMusic } from 'src/actions/addMusic';

import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const CardResultsMusic = ({ music }) => {
  const dispatch = useDispatch();
  const { typeMusic } = useSelector((state) => state.addMusic);
  const { artists, albums, tracks } = useSelector((state) => state.dashboard);
  const isAlreadyAdded = (id) => [...artists, ...albums, ...tracks].some((element) => element?.api_id === id)
  // here "element && element.apiId" would have had the same effect, "?" is checking if element exists before testing the condition
  ;
  const handleSubmit = (apiId) => {
    const action = submitAddMusic(apiId);
    dispatch(action);
  };

  return (
    <div>
      <Card className="result__card">
        <div className="card__left">
          <CardMedia
            className="card__image"
            component="img"
            image={music.urlImage}
            alt={`photo de ${music.name}`}
          />
        </div>
        <div className="card__right">
          <CardContent className="card__content">
            <Typography className="content__title" gutterBottom variant="h5" component="div">
              {music.name}
            </Typography>
            {(typeMusic === 1 || typeMusic === 2) && (
              <Typography className="content__infos" component="div" variant="body2" color="text.secondary">
                <p className="infos__txt">{music.album}</p>
                {(typeMusic === 1) && (
                  <p className="infos__txt">{music.artist}</p>
                )}
                <p className="infos__txt">{music.year} / {music.genre}</p>
              </Typography>
            )}
            <div className="card__buttons">
              {/* typeMusic: 1 - Titre, 2 - Album, 3 - Artiste */}
              {(typeMusic === 1) && (
              <Button
                className="content__button"
                onClick={() => {
                  window.open(music.urlSample, music.name, `width=300,height=100,left=${(window.innerWidth / 2) - 150},top=${(window.innerHeight / 2)}`);
                }}
              >Ecouter un extrait
              </Button>
              )}
              {isAlreadyAdded(music.apiId) ? (
                <Typography
                  sx={{ display: 'flex', alignItems: 'center', color: styles.green }}
                >
                  <CheckCircleOutlineIcon />
                  Ajouté
                </Typography>
              ) : (
                <Button
                  onClick={() => handleSubmit(music.apiId)}
                  className="button-green"
                >
                  Ajouter
                </Button>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

CardResultsMusic.propTypes = {
  music: PropTypes.shape({
    name: PropTypes.string.isRequired,
    artist: PropTypes.string,
    year: PropTypes.number || PropTypes.string,
    album: PropTypes.string,
    urlImage: PropTypes.string.isRequired,
    apiId: PropTypes.number.isRequired,
    urlSample: PropTypes.string,
    genre: PropTypes.string,
  }).isRequired,
};

CardResultsMusic.defaultPropTypes = {
  music: {
    artist: 'Artiste non trouvé',
    year: 'Année non trouvé',
    album: 'Album non trouvé',
    urlSample: 'Extrait non trouvé',
    genre: 'Genre non trouvé',
  },
};

export default CardResultsMusic;
