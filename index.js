import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from "react-router-dom";
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import App from './src/components/App';
import reducers from './src/redux/reducers';
import rootSaga from './src/redux/sagas';

import './vendor/normalize.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={App}/>
        </Router>
    </Provider>,
    rootElement
);
