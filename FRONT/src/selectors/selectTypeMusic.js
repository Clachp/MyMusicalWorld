/* eslint-disable import/prefer-default-export */
export const selectTypeMusic = (value) => {
  let typeMusicString;
  let typeMusicStringFr;
  switch (value) {
    case 1:
      typeMusicString = 'track';
      typeMusicStringFr = 'titre';
      break;
    case 2:
      typeMusicString = 'album';
      typeMusicStringFr = 'album';
      break;
    case 3:
      typeMusicString = 'artist';
      typeMusicStringFr = 'artiste';
      break;
    default:
      break;
  }
  return [typeMusicString, typeMusicStringFr];
};
