import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import sliderCompilerReducer from './store/reducers/sliderCompiler';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import {watchAuth, watchSliderCompiler, watchOrder} from './store/sagas';

let composeEnhancers = null;

if (process.env.NODE_ENV === 'development') {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
	composeEnhancers = compose;
}

const rootReducer = combineReducers({
	sliderCompiler: sliderCompilerReducer,
	order: orderReducer,
	auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchSliderCompiler);
sagaMiddleware.run(watchOrder);

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app , document.getElementById('root'));
registerServiceWorker();