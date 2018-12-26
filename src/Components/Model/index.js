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
import MyMapComponent from '../Maps/Map';
import { connect } from 'react-redux';
import ETA from '../../Components/ETA';


class ResponsiveDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: this.props.open,
            mapLoader: true,
            coordinates: [],
        };

    }

    componentDidMount() {
        console.log('form componentDidMount');
    }

    onEntered = () => {
        this.getDirection(this.props.route);
        console.log("onEntered called now");
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
            this.setState({ coordinates: coordinates, mapLoader: false });
            // console.log('coords: ', coords.length);
            // this.setState({ coordinates: coordinates, mapLoader: false });
            // localStorage.setItem('coordinates', JSON.stringify(oldCoordinates));
            // return coordinates;
        }
    }

    onExited = () => {
        this.setState({ mapLoader: true });
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
                    <DialogContent>
                        <ETA coordinates={this.state.coordinates} />
                        {
                            this.state.mapLoader ?
                                // false ?
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Loader type="RevolvingDot" color="#1f317e" height={30} width={30} />
                                </div>
                                :
                                <MyMapComponent
                                    lat={0}
                                    lng={0}
                                    accuracy={0}
                                    isMarkerShown={true}
                                    center={{ lag: 0, lng: 0 }}
                                    coordinates={this.state.coordinates}
                                // onCenterChanged={}
                                />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
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
        homeFlag: state.authReducer.homeFlag
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        // signOut: () => dispatch(AuthAction.signOut()),
        // updateHomeFlag: () => dispatch(AuthAction.updateHomeFlag())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDialog);