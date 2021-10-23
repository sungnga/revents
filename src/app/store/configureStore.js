import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { verifyAuth } from '../../features/auth/authActions';

export function configureStore() {
	// 1st arg is a reducer
	// 2nd arg is an enhancer
	// We have 2 enhancers: redux thunk and redux devTool
	const store = createStore(
		rootReducer,
		composeWithDevTools(applyMiddleware(thunk))
	);

	// The store continuously listening to user auth state change
	store.dispatch(verifyAuth());

	return store;
}
