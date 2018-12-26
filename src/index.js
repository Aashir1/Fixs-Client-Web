import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import { store } from '../src/store/index';
import { Provider } from 'react-redux';
import Navbar from './Components/Navbar';
// import * as serviceWorker from './serviceWorker';
import registerServiceWorker from './registerServiceWorker';
import { initializeFirebase } from './push-notification';
import { askForPermissioToReceiveNotifications } from './push-notification';


ReactDOM.render(

    <Provider store={store}>
        <Routes />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// LocalServiceWorkerRegister();
registerServiceWorker();
// initializeFirebase();
// askForPermissioToReceiveNotifications();