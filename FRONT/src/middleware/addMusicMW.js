import axios from 'axios';
import { SUBMIT_SEARCH_MUSIC, saveResultsMusic, SUBMIT_ADD_MUSIC } from 'src/actions/addMusic';

import { selectTypeMusic } from 'src/selectors/selectTypeMusic';
import { formatTracks, formatAlbums, formatArtists } from 'src/selectors/formatMusic';
import { findOneResultMusic } from 'src/selectors/findOneResultMusic';

const addMusicMW = (store) => (next) => (action) => {
  // url reverse proxy to allow cors deezer api
  const corsReverseProxy = 'https://cors--reverse--proxy.herokuapp.com';

  const deezerAPIUrl = 'https://api.deezer.com';

  const rootAPIUrl = process.env.ROOT_API_URL;

  switch (action.type) {
    case SUBMIT_SEARCH_MUSIC: {
      const { addMusic: { searchMusic, typeMusic } } = store.getState();
      const [typeMusicString] = selectTypeMusic(typeMusic);
      axios({
        method: 'get',
        url: `${corsReverseProxy}/${deezerAPIUrl}/search/${typeMusicString}?q=${searchMusic}&limit=4`,
      })
        .then(async (res) => {
          let resultsMusicFormated;
          switch (typeMusicString) {
            case 'track':
              resultsMusicFormated = await formatTracks(res.data.data);
              break;
            case 'album':
              resultsMusicFormated = await formatAlbums(res.data.data);
              break;
            case 'artist':
              resultsMusicFormated = formatArtists(res.data.data);
              break;
            default:
              break;
          }
          const actionSaveResultsMusic = saveResultsMusic(resultsMusicFormated);
          store.dispatch(actionSaveResultsMusic);
        })
        .catch((err) => console.log(err));
    }
      next(action);
      break;
    case SUBMIT_ADD_MUSIC: {
      const { addMusic: { resultsMusic, typeMusic } } = store.getState();
      const [typeMusicString, typeMusicStringFr] = selectTypeMusic(typeMusic);
      const token = localStorage.getItem('token');
      axios({
        method: 'post',
        url: `${rootAPIUrl}/dashboard/${typeMusicString}`,
        headers: {
          Authorization: token,
        },
        data: findOneResultMusic(action.payload, resultsMusic),
      })
        .then((res) => {
          // TODO affichage des messages aux utilisateurs
          if (res.status === 200) console.log(`Votre ${typeMusicStringFr} a bien été ajouté à votre bibliothèque !`);
        })
        .catch((err) => console.log(err));
    }
      next(action);
      break;
    default:
      next(action);
  }
};

export default addMusicMW;
