import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthAction from '../../store/Actions/AuthActions';
import MyMapComponent from '../../Components/Map';
import Button from '../../Components/Button';
import Loader from 'react-loader-spinner';
import Model from '../../Components/Model';
import BusRouteActions from '../../store/Actions/BusRoutesActions';
import Navbar from '../../Components/Navbar';
import RouteModel from '../../Components/RouteModel';
import './index.css';
import RouteUpdateModel from '../../Components/RouteUpdateModel';
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
            mapLoader: true,
            routeModelOpen: false,
            routeUpdateModelOpen: false,
            editObj: {}
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
    addBusRoute = () => {
        alert("asdfasd");
    }
    routeModelHandler = (editObj) => {

        this.setState({ routeModelOpen: !this.state.routeModelOpen, editObj }, () => {
            console.log("after state update: ", this.state.editObj)
        });
    }
    routeUpdateModelHandler = (editObj) => {
        console.log("edit obj: ", editObj);
        if (editObj) {
            this.props.setEditObj(editObj);
        }
        this.setState({ routeUpdateModelOpen: !this.state.routeUpdateModelOpen, editObj }, () => {
            console.log("after state update: ", this.state.editObj)
        });
    }
    render() {
        return (
            <Navbar history={this.props.history}>
                <RouteModel open={this.state.routeModelOpen} handleClose={this.routeModelHandler} />
                <RouteUpdateModel open={this.state.routeUpdateModelOpen} handleClose={this.routeUpdateModelHandler} editObj={this.state.editObj} />
                <div className="add-btn" >
                    <div className="add-btn-child" onClick={this.routeModelHandler}>
                        Add Bus Route
                    </div>
                </div>
                <Model open={this.state.open} handleClose={this.closeModel} route={this.state.route} />
                {
                    this.props.busesRoutesProgress ?
                        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Loader type="RevolvingDot" color="#1f317e" height={60} width={60} />
                        </div>
                        :
                        <div>
                            <section>
                                <h1 style={{
                                    color: 'rgb(47, 53, 66)',
                                    textAlign: 'center',
                                    fontWeight: '600'
                                }}>Bus Routes</h1>
                            </section>
                            <section style={{ display: 'flex', justifyContent: 'center', padding: "3rem 0" }}>
                                <section className="route-container">
                                    {
                                        this.props.busesRoutes.map((bus, i) => {
                                            return (
                                                <div key={i} className="route-item" >
                                                    <div className="route-item-child1" onClick={() => this.openModel(bus.bus_route[bus.bus_route.length - 1].routes[0].overview_polyline.points)}>
                                                        <img src={require('../../assets/routeImage.jpg')} alt="routeimage" width="100%" height="100%" />
                                                    </div>
                                                    <div className="route-item-child2">
                                                        <h2 className="bus_name">
                                                            {bus.bus_name}
                                                        </h2>
                                                        <div style={{ margin: "0 18px" }}>
                                                            <hr />
                                                        </div>
                                                        {
                                                            this.props.adminFlag ?
                                                                <div className="info-div">
                                                                    <div className="info-div-child1" onClick={() => this.routeUpdateModelHandler({ editFlag: true, bus })}>
                                                                        <img src={require('../../assets/editicon.png')} alt="routeimage" />
                                                                        <span>
                                                                            Edit
                                                                        </span>
                                                                    </div>
                                                                    <div className="info-div-child2" onClick={() => this.props.deleteRoute(bus._id)}>
                                                                        <img src={require('../../assets/deleteicon.png')} alt="routeimage" />
                                                                        <span>
                                                                            Delete
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                :
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
                                                        }
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
        busesRoutesErrorMessage: state.appReducer.busesRoutesErrorMessage,
        adminFlag: state.appReducer.adminFlag
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(AuthAction.signOut()),
        updateHomeFlag: () => dispatch(AuthAction.updateHomeFlag()),
        getBusRoutes: () => dispatch(BusRouteActions.getBusRoutes()),
        deleteRoute: (id) => dispatch(BusRouteActions.deleteRoute(id)),
        setEditObj: (obj) => dispatch(BusRouteActions.setEditObj(obj))
        // editicon
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusRoute);