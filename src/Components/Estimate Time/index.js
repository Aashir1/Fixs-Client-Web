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
import ETA from '../ETA';
import Decoder from '@mapbox/polyline';

// import './index.css';
import RouteUpdateModel from '../../Components/RouteUpdateModel';
let Ref = {};
let colors = ["#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57"]

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
            editObj: {},
            etaArray: [{
                bus_name: 'HU-02',
                eta: '34 mins',
                distance: '13.3 mi'
            },
            {
                bus_name: 'HU-38',
                eta: '26 mins',
                distance: '10.4 mi'
            }
            ]
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
    getDirection = (encodedPolyline) => {
        let coordinates = [];
        // const HU_38 = "s`swCmjixK@l@H`CLbJZxNp@l\\PpILtEV|A~EnSpCzKjB|H`ApEzB`OpDxVLp@DLMHYVq@h@sG~FyDrD{GjG_DrCuAvAmAvA{BhCaBvB]b@{@p@y@XqB^uBd@oIrBiDfAw@XmAn@cDhB{CnB_GpD{@h@y@x@mA~AeAbB[^uAtAc@j@iAv@sBbAwCtAsFbCiA\\uATq@DaBLcDPkC`@iBj@e@PaBl@}@XaAN}BVeMhAeXtB_Mf@_IR_GNy@DeE?yFGsUQwA@_Gr@kSzCIB{Cb@sL~AmJvAwDd@_DT{@HsHd@_DFqJ^kLn@gZfAmI^yDJ_BHaBNuCb@oAPyANgBJuCLuFRkDM}CQmGNmBJeDh@mDd@}Gl@_MjA@N";
        // const HU_38 = 'ko`xCmr_xKiBMw@CmA@cAD{BFkBLoARsDh@}Eh@qCRmLhAQ@@T';
        // var data = ...oldCoordinates;
        // console.log('encodedPolyline: ', encodedPolyline);
        if (encodedPolyline) {

            let point = Decoder.decode(encodedPolyline);
            // coords = point.map((point, index) => {
            //     return {
            //         lat: point[0],
            //         lng: point[1]
            //     }
            // });
            // console.log(point);
            for (let i = 0; i < point.length; i++) {
                // console.log("point[i][0], ", point[i]);
                coordinates.push({
                    lat: point[i][0],
                    lng: point[i][1]
                });
            }

            // coords.forEach((data) => {
            //     oldCoordinates.push(data);
            // });
            // oldCoordinates = oldCoordinates.slice(0, 106)
            console.log('coordinate: ', coordinates);
            // this.setState({ coordinates: coordinates, mapLoader: false });
            // console.log('coords: ', coords.length);
            // this.setState({ coordinates: coordinates, mapLoader: false });
            // localStorage.setItem('coordinates', JSON.stringify(oldCoordinates));
            return coordinates;
        }
    }

    render() {
        return (
            <Navbar history={this.props.history}>
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
                                }}>Estimated Time</h1>
                            </section>
                            <section style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: "3rem 0" }}>
                                <section style={{ display: 'flex', justifyContent: 'space-around' ,width: '90%'}}>
                                    {
                                        this.state.etaArray.map((data, i) => {
                                            return (
                                                <div style={{
                                                    backgroundColor: colors[i], color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', width: '14em',
                                                    padding: '25px',
                                                    borderRadius: '5px'
                                                }}>
                                                    <img src={require('../../assets/front-bus.png')} alt="routeimage" />
                                                    <div style={{
                                                        fontWeight: '700',
                                                        paddingTop: '1rem'
                                                    }}>
                                                        {data.bus_name}
                                                    </div>
                                                    <div style={{
                                                        fontWeight: '700',
                                                        paddingTop: '1rem'
                                                    }}>
                                                        ETA: {data.eta}
                                                    </div>
                                                    <div style={{
                                                        fontWeight: '700',
                                                        paddingTop: '1rem'
                                                    }}>
                                                        Distance: {data.distance}
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