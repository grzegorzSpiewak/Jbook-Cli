import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from 'state/reducers';
import { persistMiddlware } from 'state/middlewares/persist-middleware';

export const store = createStore(reducers, {}, applyMiddleware(thunk, persistMiddlware));
