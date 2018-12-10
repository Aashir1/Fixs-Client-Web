import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Container/Login';
import Signup from './Container/Signup';
import Home from './Container/Home';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import BusRoute from './Container/BusRoutes';
import BusInfo from './Container/BusInfo';
import Main from './Components/Main';
// import { syncHistoryWithStore } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();
// const history = syncHistoryWithStore(createBrowserHistory(), store)
// localStorage.setItem('user', null)
// const user = JSON.parse(localStorage.getItem('user'));
const options = {
    position: 'bottom center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
}
const Routes = () => {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" render={(props) => {
                    const user = JSON.parse(localStorage.getItem('user'))
                    return (
                        user ? (
                            <Redirect to="/home" />
                        ) : (
                                <AlertProvider template={AlertTemplate} {...options}>
                                    <Login {...props} />
                                </AlertProvider>
                            )
                    )
                }} />
                {/* <Route exact path="/" render={() => <Login />} /> */}
                <Route path="/signup" render={(props) => {
                    const user = JSON.parse(localStorage.getItem('user'))
                    return (
                        user !== null ? (
                            <Redirect to="/home" />
                        ) : (
                                <AlertProvider template={AlertTemplate} {...options}>
                                    <Signup {...props} />
                                </AlertProvider>
                            )
                    )
                }} />
                <Route path="/home" render={(props) => (
                    <AlertProvider template={AlertTemplate} {...options}>
                        <Home {...props} />
                    </AlertProvider>
                )} />


                <Route path="/busRoute" render={(props) => (
                    <BusRoute {...props} />
                )} />

                <Route path="/driverinfo" render={(props) => (
                    <BusInfo {...props} />
                )} />

                {/* <Route path="/busRoute" render={(props) => {
                    <BusRoute {...props}/>
                }} />

                <Route path="/BusInfo" render={(props) => {
                    <BusInfo {...props}/>
                }} /> */}
            </Switch>
        </Router>
    )
}

export default Routes;