import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { injectReducer } from '../store/reducers';
import TodosContainer from './TodosContainer';
import todosReducer from './TodosReducer';

// ------------------------------------
// PersistConfig
// ------------------------------------
const persistConfig = {
  key: 'todos',
  storage,
  whiteList: ['todos'], // only navigation will be persisted
};

export default store => {
  /*  Add the reducer to the store on key 'counter'  */
  injectReducer(store, {
    key: 'todos',
    reducer: persistReducer(persistConfig, todosReducer),
  });

  // return container as main module for route definition
  return TodosContainer;
};
