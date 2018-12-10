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
import './index.css';
import Input from '../Input';
import { connect } from 'react-redux';
import button from '../../Components/Button';
import AppActions from '../../store/Actions/AppActions';

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
            showLoader: false
        };
        comRef = this;

    }

    componentDidMount() {
        console.log('form componentDidMount: ', this.props.editObj.bus);
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
        console.log(obj);
        this.setState(obj);
    }

    addRoute = () => {
        this.setState({ showLoader: true });
        let { busName, route } = this.state;

        if (busName.trim() !== "" && route.trim() !== "") {
            this.props.addRoute({
                busName,
                route
            });
        }
        setTimeout(() => {
            this.setState({ showLoader: false, busName: "", route: "" });
            this.props.handleClose();
        }, 2000);

    }
    render() {
        console.log("comming props************: ", this.props.editObj)
        const { fullScreen } = this.props;
        // console.log('all props: ', this.getDirection(this.props.route));
        return (
            <div>
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
                        <div className="form-parent">
                            <div className="email-wrapper">
                                <Input placeholder="Enter Bus Name" className="email" type="text" onChange={(e) => this.updateValue(e, "busName")} value={this.state.busName} />
                            </div>
                            <div className="password-wrapper">
                                <Input placeholder="Enter Bus Route" className="password" type="text" onChange={(e) => this.updateValue(e, "route")} value={this.state.route} />
                            </div>
                            <button className="add-route" onClick={this.addRoute} btnText="Add Route"
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