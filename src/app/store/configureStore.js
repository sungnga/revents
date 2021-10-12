import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

export function configureStore() {
	// 1st arg is a reducer
	// 2nd arg is an enhancer
	// We have 2 enhancers: redux thunk and redux devTool
	return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
}
