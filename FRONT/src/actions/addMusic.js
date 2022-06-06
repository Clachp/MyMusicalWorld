export const TOGGLE_ADD_MUSIC_MODAL = 'TOGGLE_ADD_MUSIC_MODAL';
export const SUBMIT_SEARCH_MUSIC = 'SUBMIT_SEARCH_MUSIC';
export const SAVE_RESULTS_MUSIC = 'SAVE_RESULTS_MUSIC';
export const SUBMIT_ADD_MUSIC = 'SUBMIT_ADD_MUSIC';

export const toggleAddMusicModal = () => ({
  type: TOGGLE_ADD_MUSIC_MODAL,
});

export const submitSearchMusic = (search) => ({
  type: SUBMIT_SEARCH_MUSIC,
  payload: {
    search,
  },
});

export const saveResultsMusic = (results) => ({
  type: SAVE_RESULTS_MUSIC,
  payload: results,
});

export const submitAddMusic = (apiId) => ({
  type: SUBMIT_ADD_MUSIC,
  payload: apiId,
});
