// == Import : npm
import { createStore, compose, applyMiddleware } from 'redux';

// == Import : local
import rootReducer from 'src/reducers';
// import logMiddleware from '../middleware/logMiddleware';
import authenticationMW from 'src/middleware/authenticationMW';
import profileUpdateMW from 'src/middleware/profileUpdateMW';
import addMusicMW from 'src/middleware/addMusicMW';
import dashboardMW from 'src/middleware/dashboardMW';

// == Enhancers
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    // logMiddleware,
    authenticationMW,
    profileUpdateMW,
    addMusicMW,
    dashboardMW,
  ),
);

// == Store
const store = createStore(
  rootReducer,
  // preloadedState,
  enhancers,
);

// == Export
export default store;
