import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
// import { routerReducer, routerMiddleware, push } from 'react-router-redux';
// import { connectRouter, routerMiddleware } from 'connected-react-router'
// import { browserHistory } from 'react-router';
// import createBrowserHistory from 'history/createBrowserHistory';
// import EpicActions from './Epic/EpicActions';
import AuthEpic from './Epic/AuthEpic';
// import dbReducer from './Reducers/DBReducer';
import authReducer from './Reducers/AuthReducer';
import appReducer from './Reducers/AppReducer';
import BusRouteEpic from './Epic/BusRoute';
import BusInfo from './Epic/BusInfo';
import BusRoutes from '../Container/BusRoutes';
import BusRoutesActions from './Actions/BusRoutesActions';
// const middleware = routerMiddleware(createBrowserHistory());
// const history = createBrowserHistory();
const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    // aReducer,
    authReducer,
    appReducer
    // routing: routerReducer
});

export const rootEpic = combineEpics(
    AuthEpic.signUp,
    AuthEpic.login,
    AuthEpic.changePassword,
    BusRouteEpic.getBusRoutes,
    BusRouteEpic.addRoute,
    BusRouteEpic.deleteRoute,
    BusRouteEpic.updateRoute,
    BusInfo.getBusInfo,
    BusInfo.getAllBuses,
    BusInfo.getETAInfo,
    BusInfo.addBusInfo,
    BusInfo.updateBusInfo,
    BusInfo.deleteInfo
);

// const epicMiddleware = createEpicMiddleware(rootEpic);

// const createStoreWithMiddleware = applyMiddleware(routerMiddleware(history), epicMiddleware, loggerMiddleware);

// export let store = createStore(connectRouter(history)(rootReducer), compose(createStoreWithMiddleware));


const epicMiddleware = createEpicMiddleware(rootEpic);

const createStoreWithMiddleware = applyMiddleware(epicMiddleware, loggerMiddleware);

export let store = createStore(rootReducer, compose(createStoreWithMiddleware));