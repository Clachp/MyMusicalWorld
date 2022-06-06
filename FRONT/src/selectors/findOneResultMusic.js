/* eslint-disable import/prefer-default-export */
export const findOneResultMusic = (apiId, resultsMusic) => {
  const oneMusic = resultsMusic.find((music) => music.apiId === apiId);
  return oneMusic;
};





