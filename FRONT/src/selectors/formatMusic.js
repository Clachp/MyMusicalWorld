/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const corsReverseProxy = 'https://cors--reverse--proxy.herokuapp.com';

const deezerAPIUrl = 'https://api.deezer.com';

export const formatTracks = async (tracks) => {
  const tracksFormated = await Promise.all(tracks.map(async (track) => {
    const trackId = track.id;
    const trackFormated = {};
    let albumId;

    await axios.get(`${corsReverseProxy}/${deezerAPIUrl}/track/${trackId}`)
      .then(async (res) => {
        trackFormated.name = res.data.title;
        trackFormated.artist = res.data.artist.name;
        trackFormated.year = Number(res.data.release_date.substring(0, 4));
        trackFormated.album = res.data.album.title;
        trackFormated.urlImage = res.data.album.cover_xl;
        trackFormated.apiId = res.data.id;
        trackFormated.urlSample = res.data.preview;
        albumId = res.data.album.id;

        await axios.get(`${corsReverseProxy}/${deezerAPIUrl}/album/${albumId}`)
          .then((res) => {
            trackFormated.genre = res.data.genres.data[0].name;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    return trackFormated;
  }));
  return tracksFormated;
};

export const formatAlbums = async (albums) => {
  const albumsFormated = await Promise.all(albums.map(async (album) => {
    const albumId = album.id;
    const albumFormated = {};

    await axios.get(`${corsReverseProxy}/${deezerAPIUrl}/album/${albumId}`)
      .then((res) => {
        albumFormated.name = res.data.title;
        albumFormated.artist = res.data.artist.name;
        albumFormated.year = Number(res.data.release_date.substring(0, 4));
        albumFormated.urlImage = res.data.cover_xl;
        albumFormated.apiId = res.data.id;
        albumFormated.genre = res.data.genres.data[0].name;
      })
      .catch((err) => console.log(err));
    return albumFormated;
  }));
  return albumsFormated;
};

export const formatArtists = (artists) => {
  const artistsFormated = artists.map((artist) => {
    const artistFormated = {
      name: artist.name,
      urlImage: artist.picture_xl,
      apiId: artist.id,
    };
    return artistFormated;
  });
  return artistsFormated;
};
