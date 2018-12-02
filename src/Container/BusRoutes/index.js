import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthAction from '../../store/Actions/AuthActions';
import MyMapComponent from '../../Components/Map';
import Button from '../../Components/Button';
import Loader from 'react-loader-spinner';
import Model from '../../Components/Model';
import BusRouteActions from '../../store/Actions/BusRoutesActions';
import Navbar from '../../Components/Navbar';
import './index.css';
let Ref = {};
class BusRoute extends Component {
    constructor(props) {
        super(props);
        this._mount = true;
        this.state = {
            open: false,
            buses: [
                {
                    name: 'HU-01'
                },
                {
                    name: 'HU-38',
                }
                ,
                {
                    name: 'HU-02'
                },
                {
                    name: 'HU-03'
                },
                {
                    name: 'HU-04'
                },
                {
                    name: 'HU-33',
                }
            ],
            mapLoader: true
        }
        Ref = this;
    }

    componentDidMount() {
        // this.getLocation();
        setInterval(() => {
            this.setState({ mapLoader: false });
            // Mutating Dots
        }, 1000);
        this.props.getBusRoutes();
    }

    componentWillUnmount() {
        this._mount = false;
    }
    // static getDerivedStateFromProps = (props, state) => {
    //     console.log('getDerivedStateFromProps called')
    //     if (props.homeFlag && Ref._mount) {
    //         // props.history.replace('/');
    //         // props.updateHomeFlag();
    //     }
    //     return null;
    // }

    // getLocation = () => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         console.log(position.coords.latitude);
    //         console.log(position.coords.longitude);
    //         console.log(position.coords.accuracy);
    //         this.setState({ lat: position.coords.latitude, lng: position.coords.longitude, accuracy: position.coords.accuracy });
    //     })
    // }

    // signOut = () => {
    //     this.props.signOut();
    // }
    openModel = (bus_Route) => {
        this.setState({ open: true, route: bus_Route });
    }
    closeModel = () => {
        this.setState({ open: false });
    }
    render() {
        return (
            <Navbar history={this.props.history}>
                <Model open={this.state.open} handleClose={this.closeModel} route={this.state.route} />
                {
                    this.props.busesRoutesProgress ?
                        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Loader type="RevolvingDot" color="#1f317e" height={60} width={60} />
                        </div>
                        :
                        <div>
                            <section>
                                <h1 style={{ color: "#2f3542", textAlign: 'center', fontWeight: '500' }}>Bus Routes</h1>
                            </section>
                            <section style={{ display: 'flex', justifyContent: 'center' }}>
                                <section className="route-container">
                                    {
                                        this.props.busesRoutes.map((bus, i) => {
                                            return (
                                                <div key={i} className="route-item" onClick={() => this.openModel(bus.bus_route)}>
                                                    <div className="route-item-child1">
                                                        <img src={require('../../assets/routeImage.jpg')} alt="routeimage" width="100%" height="100%" />
                                                    </div>
                                                    <div className="route-item-child2">
                                                        <h2 className="bus_name">
                                                            {bus.bus_name}
                                                        </h2>
                                                        <div style={{ margin: "0 18px" }}>
                                                            <hr />
                                                        </div>
                                                        <div className="info-div">
                                                            <div className="info-div-child1">
                                                                <img src={require('../../assets/mappin.png')} alt="routeimage" />
                                                                <span>
                                                                    Pakistan
                                                                </span>
                                                            </div>
                                                            <div className="info-div-child2">
                                                                <img src={require('../../assets/calendar.png')} alt="routeimage" />
                                                                <span>
                                                                    01-11-2018
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </section>
                            </section>
                        </div>
                }
            </Navbar>
        )
    }
}

let mapStateToProps = (state) => {
    console.log('from home reducers state: ', state)
    return {
        busesRoutes: state.appReducer.busesRoutes,
        busesRoutesProgress: state.appReducer.busesRoutesProgress,
        busesRoutesErrorMessage: state.appReducer.busesRoutesErrorMessage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(AuthAction.signOut()),
        updateHomeFlag: () => dispatch(AuthAction.updateHomeFlag()),

        getBusRoutes: () => dispatch(BusRouteActions.getBusRoutes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusRoute);