import { combineReducers } from 'redux';
import cellsReducer from 'state/reducers/cellsReducers';
import bundlesReducer from 'state/reducers/bundleReducers';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;