import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-calendar/dist/Calendar.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { configureStore, history } from './app/store/configureStore';
import ScrollToTop from './app/layout/ScrollToTop';
import { ConnectedRouter } from 'connected-react-router';

const store = configureStore();

// To see the state inside the store
// console.log(store.getState());

const rootEl = document.getElementById('root');

function render() {
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<ScrollToTop />
				<App />
			</ConnectedRouter>
		</Provider>,
		rootEl
	);
}

// If we make changes to our App component and module.hot is available,
// update the page with the App component without doing a full page reload
if (module.hot) {
	module.hot.accept('./app/layout/App', function () {
		setTimeout(render);
	});
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
