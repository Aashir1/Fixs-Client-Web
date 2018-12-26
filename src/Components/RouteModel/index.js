import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Loader from 'react-loader-spinner';
import './index.css';
import Input from '../Input';
import { connect } from 'react-redux';
import MyMapComponent from '../Maps/AddRouteMap';
import AppActions from '../../store/Actions/AppActions';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-default.css';
import Alert from 'react-s-alert';

let comRef = {};
class ResponsiveDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            mapLoader: true,
            coordinates: [],
            busName: "",
            route: "",
            showLoader: false,
            addRouteFlag: true,
            defaultCenter: {},
            wayPoint: []
        };
        comRef = this;

    }

    componentDidMount() {
        console.log('form componentDidMount: ', this.props.editObj.bus);
        this.getLocation()
    }

    onEntered = () => {
        // this.getDirection(this.props.route);
        console.log("onEntered called now");
    }

    onExited = () => {
        // this.setState({ mapLoader: true });
        console.log("onexited called")
    }

    updateValue = (e, name) => {
        let obj = {};
        obj[name] = e.target.value;
        if (e.target.value.length === 5) {
            obj['addRouteFlag'] = false;
        }
        console.log(obj);
        this.setState(obj);
    }

    addRoute = () => {
        this.setState({ showLoader: true });
        let { busName, wayPoint } = this.state;

        if (busName.trim() !== "" && wayPoint.length === 10) {
            this.props.addRoute({
                busName,
                wayPoint
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

    showAlert = (message) => {
        Alert.error(message || this.props.errorMessage || 'Something is wrong', {
            position: 'bottom-right',
            effect: 'bouncyflip',
            html: false,
            timeout: 2000
        })
    }
    render() {
        console.log("comming props************: ", this.props.editObj)
        const { fullScreen } = this.props;
        // console.log('all props: ', this.getDirection(this.props.route));
        return (
            <div>
                <Alert stack={{ limit: 1 }} />
                <Dialog
                    disableBackdropClick={true}
                    onEntered={this.onEntered}
                    onExited={this.onExited}
                    onEntering={this.onEntering}
                    // disableRestoreFocus={true}
                    maxWidth="lg"
                    fullWidth={true}
                    fullScreen={fullScreen}
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    {/* <DialogTitle style={{ textAlign: "center" }} id="responsive-dialog-title">{"Map"}</DialogTitle> */}
                    <div className="model-title">
                        <div style={{ color: '#E3E9ED' }}>Add Bus Route</div>
                        <img className="cross-image" onClick={this.props.handleClose} src={require('../../assets/multiply.png')} />
                    </div>
                    <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="form-parent" style={{ width: '100%' }}>
                            <div className="email-wrapper" style={{
                                width: '25%',
                                marginBottom: '1rem'
                            }}>
                                <Input maxLength={5} placeholder="Enter Bus Name" className="email" type="text" onChange={(e) => this.updateValue(e, "busName")} value={this.state.busName} />
                            </div>
                            <div>
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
                                        } else {
                                            alert('you have required to left only 10 way points');
                                        }
                                    }}
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
                                    defaultCenter={this.state.defaultCenter}
                                    isMarkerShown={true}
                                    center={{ lag: 0, lng: 0 }}
                                />
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <div>
                            <button disabled={this.state.addRouteFlag} className="add-route" style={{ width: '10rem' }} onClick={this.addRoute} btnText="Add Route"
                            >
                                {
                                    this.state.showLoader ?
                                        <div style={{ paddingTop: '4px' }}>
                                            <Loader type="RevolvingDot" color="#0B2239" height={30} width={30} />
                                        </div>
                                        :
                                        'Add Route'
                                }
                            </button>
                        </div>
                    </DialogActions>
                </Dialog>
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
        editObj: state.appReducer.editObj
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        // signOut: () => dispatch(AuthAction.signOut()),
        // updateHomeFlag: () => dispatch(AuthAction.updateHomeFlag())
        updateRoute: (obj) => dispatch(AppActions.updateRoute(obj)),
        addRoute: (obj) => dispatch(AppActions.addRoute(obj))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog);