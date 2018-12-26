import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import Input from '../Input';
import { connect } from 'react-redux';
import AppActions from '../../store/Actions/AppActions';
import MyMapComponent from '../Maps/AddRouteMap';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-default.css';
import Alert from 'react-s-alert';

let comRef = {};
class ResponsiveDialog extends React.Component {
    constructor(props) {
        super(props);
        console.log("from constructor: ", this.props.editObj)
        let { bus } = this.props.editObj;
        this.state = {
            open: this.props.open,
            mapLoader: true,
            coordinates: [],
            busName: bus.bus_name,
            // route: bus.bus_route[bus.bus_route.length - 1].routes[0].overview_polyline.points,
            showLoader: false,
            wayPoint: bus.wayPoint,
            defaultCenter: {}
        };
        comRef = this;

    }

    componentDidMount() {
        console.log('form componentDidMount: ', this.props.editObj.bus);
        this.getLocation()
    }

    updateValue = (e, name) => {
        let obj = {};
        obj[name] = " " + e.target.value.slice(0);
        if (e.target.value.length === 1 || e.target.value === "") {
            obj[name] = " ";
            this.setState(obj);
            return;
        }
        obj[name] = e.target.value;
        console.log(obj);
        this.setState(obj);
    }

    addRoute = () => {
        this.setState({ showLoader: true });
        let { busName, wayPoint } = this.state;

        if (busName.trim() !== "" && wayPoint.length === 10) {
            this.props.updateRoute({
                busName,
                wayPoint,
                id: this.props.editObj.bus._id
            });
            // console.log('there your request will gone')
        } else {
            this.showAlert('badly formated data or incomplete data');
        }
        setTimeout(() => {
            this.setState({ showLoader: false, busName: "", route: "", addRouteFlag: true });
            this.props.handleClose();
        }, 2000);

    }
    getLocation = () => {
        if (navigator.geolocation) {
            console.log('location fetched: ');
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            // console.log('')
            alert('location not found');
        }
    }

    showPosition = (position) => {
        console.log('location fetched: ', position);
        this.setState({ defaultCenter: { lat: position.coords.latitude, lng: position.coords.longitude } });
    }
    render() {
        const { fullScreen } = this.props;
        return (
            <div>
                <Alert stack={{ limit: 1 }} />
                <div>
                    {/* <DialogTitle style={{ textAlign: "center" }} id="responsive-dialog-title">{"Map"}</DialogTitle> */}
                    <div className="model-title">
                        <div style={{ color: '#E3E9ED' }}>Update Bus Route</div>
                        <img className="cross-image" onClick={this.props.handleClose} src={require('../../assets/multiply.png')} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '85vh' }}>
                        <div style={{
                            // marginTop: '6rem',
                            width: '100%',
                            height: '100%',
                            padding: '0px',
                            backgroundColor: 'transparent',
                            borderRadius: '3px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            padding: '0 1rem'
                        }}>
                            <div className="email-wrapper">
                                <Input placeholder="Enter Bus Name" className="email" type="text" onChange={(e) => this.updateValue(e, "busName")} value={this.state.busName || this.props.editObj.bus.bus_name} />
                            </div>
                            <div style={{
                                boxShadow: '0px 0px 1px #ddd'
                            }}>
                                <MyMapComponent
                                    lat={0}
                                    lng={0}
                                    accuracy={0}
                                    mapClicked={(event) => {
                                        console.log('lat: ', event.latLng.lat());
                                        console.log('lng: ', event.latLng.lng());
                                        if (this.state.wayPoint.length <= 9) {
                                            this.setState({
                                                wayPoint: [...this.state.wayPoint, { lat: event.latLng.lat(), lng: event.latLng.lng(), showInfoBox: false }]
                                            })
                                            // } else {
                                            //     // alert('you have required to left only 10 way points');
                                        }
                                    }
                                    }
                                    updateMarkerLocation={(e, index) => {
                                        let { wayPoint } = this.state;
                                        for (let i = 0; i < wayPoint.length; i++) {
                                            if (index === i) {
                                                wayPoint[i].lat = e.latLng.lat();
                                                wayPoint[i].lng = e.latLng.lng();
                                            }
                                        }
                                        this.setState({ wayPoint: wayPoint })
                                    }}
                                    deleteMarker={(i) => {
                                        let { wayPoint } = this.state;
                                        wayPoint = wayPoint.filter((data, index) => index !== i);
                                        this.setState({ wayPoint: wayPoint });
                                    }}
                                    showThisInfoBox={(e, index) => {
                                        let { wayPoint } = this.state;
                                        for (let i = 0; i < wayPoint.length; i++) {
                                            if (index === i) {
                                                wayPoint[i].showInfoBox = true;
                                            } else {
                                                wayPoint[i].showInfoBox = false;
                                            }
                                        }
                                        this.setState({ wayPoint: wayPoint })
                                    }}
                                    wayPoint={this.state.wayPoint}
                                    defaultCenter={this.state.wayPoint[0]}
                                    isMarkerShown={true}
                                    center={{ lag: 0, lng: 0 }}
                                />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }}>
                                <button className="add-route" style={{ width: '25%' }} onClick={this.addRoute} btnText="Add Route"
                                >
                                    {
                                        this.state.showLoader ?
                                            <div style={{ paddingTop: '4px' }}>
                                                <Loader type="RevolvingDot" color="#0B2239" height={30} width={30} />
                                            </div>
                                            :
                                            'Update Route'
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <Button style={{ borderRadius: '0', backgroundColor: '#E3E9ED', color: "#0B2239" }} onClick={this.props.handleClose} color="#000">
                            Close
                        </Button> */}
                    </div>
                </div>
            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

let mapStateToProps = (state) => {
    console.log('from home reducers state: ', state)
    return {
        user: state.authReducer.userInfo,
        // forUpdate: state.authReducer.forUpdate,
        homeFlag: state.authReducer.homeFlag,
        // editObj: state.appReducer.editObj
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        // signOut: () => dispatch(AuthAction.signOut()),
        // updateHomeFlag: () => dispatch(AuthAction.updateHomeFlag())
        updateRoute: (obj) => dispatch(AppActions.updateRoute(obj)),
        // addRoute: (obj) => dispatch(AppActions.addRoute(obj))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog);