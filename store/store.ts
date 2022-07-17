import { configureStore } from '@reduxjs/toolkit';
import { authModule, authReducer } from 'features/auth';
import { playerModule, playerReducer } from 'features/player/store';
import { searchModule, searchReducer } from 'features/search';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    [searchModule]: searchReducer,
    [authModule]: authReducer,
    [playerModule]: playerReducer,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
