import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthAction from '../../store/Actions/AuthActions';
import MyMapComponent from '../../Components/Map';
import Button from '../../Components/Button';
import Loader from 'react-loader-spinner';
import Navbar from '../../Components/Navbar';
import Im from '../../logo.svg';
let Ref = {};
class Home extends Component {
    constructor(props) {
        super(props);
        this._mount = true;
        this.state = {
            lat: 0,
            lng: 0,
            accuracy: 0,
            mapLoader: true
        }
        Ref = this;
    }

    componentDidMount() {
        this.getLocation();
        setInterval(() => {
            this.setState({ mapLoader: false });
            // Mutating Dots
        }, 1000);
    }

    componentWillUnmount() {
        this._mount = false;
    }
    static getDerivedStateFromProps = (props, state) => {
        console.log('getDerivedStateFromProps called')
        if (props.homeFlag && Ref._mount) {
            props.history.replace('/');
            props.updateHomeFlag();
        }
        return null;
    }

    getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);
            console.log(position.coords.accuracy);
            this.setState({ lat: position.coords.latitude, lng: position.coords.longitude, accuracy: position.coords.accuracy });
        })
    }

    signOut = () => {
        this.props.signOut();
    }
    render() {
        return (
            <Navbar history={this.props.history}>
                <h1>Driver Info</h1>
                <Button btnText="Signout" onClick={this.signOut} />
                {
                    this.state.mapLoader ? (
                        <Loader type="Oval" color="#000" height={50} width={50} />
                    )
                        :
                        <div></div>
                    // <MyMapComponent
                    //     lat={this.state.lat}
                    //     lng={this.state.lng}
                    //     accuracy={this.state.accuracy}
                    //     isMarkerShown={true}
                    //     center={{ lag: this.state.lat, lng: this.state.lng }}
                    // // onCenterChanged={}
                    // />
                }
            </Navbar>
        )
    }
}

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
        signOut: () => dispatch(AuthAction.signOut()),
        updateHomeFlag: () => dispatch(AuthAction.updateHomeFlag())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);