import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Decoder from '@mapbox/polyline';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Loader from 'react-loader-spinner';
// import './index.css';
import Input from '../Input';
import { connect } from 'react-redux';
import button from '../../Components/Button';
import AppActions from '../../store/Actions/AppActions';


class ResponsiveDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            mapLoader: true,
            coordinates: [],
            busName: this.props.infoUpdateObj.data.bus_name,
            stopInfo: this.props.infoUpdateObj.data.stop_info,
            driverNum: this.props.infoUpdateObj.data.bus_driver_phone,
            driverName: this.props.infoUpdateObj.data.bus_driver_name,
            showLoader: false
        };

    }

    componentDidMount() {
        console.log('form componentDidMount');
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

    updateBusInfo = () => {
        this.setState({ showLoader: true });
        let { busName, stopInfo, driverName, driverNum } = this.state;
        if (busName.trim() !== "" && stopInfo.trim() !== "" && driverName.trim() !== "" && driverNum.trim() !== "") {
            this.props.updateBusInfo({
                busName,
                stopInfo,
                driverName,
                driverNum,
                id: this.props.infoUpdateObj.data._id
            });
        }
        setTimeout(() => {
            this.setState({ showLoader: false, busName: "", stopInfo: "", driverName: '', driverNum: '' });
            this.props.handleClose();
        }, 2000);

    }
    render() {
        const { fullScreen } = this.props;
        // console.log('all props: ', this.getDirection(this.props.route));
        return (
            <div>
                <Dialog
                    disableBackdropClick={true}
                    onEntered={this.onEntered}
                    onExited={this.onExited}
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
                        <div style={{ color: '#E3E9ED' }}>Update Bus Info</div>
                        <img className="cross-image" onClick={this.props.handleClose} src={require('../../assets/multiply.png')} />
                    </div>
                    <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="form-parent">
                            <div className="email-wrapper">
                                <Input placeholder="Bus Name" className="email" type="text" onChange={(e) => this.updateValue(e, "busName")} value={this.state.busName || this.props.infoUpdateObj.data.bus_name} />
                            </div>
                            <div className="password-wrapper">
                                <Input placeholder="Driver Name" className="password" type="text" onChange={(e) => this.updateValue(e, "driverName")} value={this.state.driverName || this.props.infoUpdateObj.data.bus_driver_name} />
                            </div>
                            <div className="password-wrapper">
                                <Input placeholder="Driver Phone" className="password" type="text" onChange={(e) => this.updateValue(e, "driverNum")} value={this.state.driverNum || this.props.infoUpdateObj.data.bus_driver_phone} />
                            </div>
                            <div className="password-wrapper">
                                <Input placeholder="Stop Info" className="password" type="text" onChange={(e) => this.updateValue(e, "stopInfo")} value={this.state.stopInfo || this.props.infoUpdateObj.data.stop_info} />
                            </div>
                            <button className="add-route" onClick={this.updateBusInfo}
                            >
                                {
                                    this.state.showLoader ?
                                        <div style={{ paddingTop: '4px' }}>
                                            <Loader type="RevolvingDot" color="#0B2239" height={30} width={30} />
                                        </div>
                                        :
                                        'Update Bus Info'
                                }
                            </button>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ borderRadius: '0', backgroundColor: '#E3E9ED', color: "#0B2239" }} onClick={this.props.handleClose} color="#000">
                            Close
                        </Button>
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
    console.log('from home reducers state: ', state);
    return {
        user: state.authReducer.userInfo,
        // forUpdate: state.authReducer.forUpdate,
        homeFlag: state.authReducer.homeFlag,
        infoUpdateObj: state.appReducer.infoUpdateObj
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        // signOut: () => dispatch(AuthAction.signOut()),
        // updateHomeFlag: () => dispatch(AuthAction.updateHomeFlag())
        updateBusInfo: (obj) => dispatch(AppActions.updateBusInfo(obj))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog);