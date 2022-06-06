import {
  TOGGLE_ADD_MUSIC_MODAL, SAVE_RESULTS_MUSIC, SUBMIT_SEARCH_MUSIC,
} from '../actions/addMusic';
import { CHANGE_INPUT } from '../actions';

const initialState = {
  modalOpened: false,
  loading: false,
  searchMusic: '',
  typeMusic: 1, // 1 - Titre, 2 - Album, 3 - Artiste
  resultsMusic: [],
};

const addMusic = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_ADD_MUSIC_MODAL:
      return {
        ...state,
        modalOpened: !state.modalOpened,
        // searchMusic: '',
        resultsMusic: [],
      };
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
        resultsMusic: [],
      };
    case SUBMIT_SEARCH_MUSIC:
      return {
        ...state,
        loading: true,
      };
    case SAVE_RESULTS_MUSIC:
      return {
        ...state,
        searchMusic: '',
        resultsMusic: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default addMusic;
