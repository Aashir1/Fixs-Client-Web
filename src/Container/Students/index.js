import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthAction from '../../store/Actions/AuthActions';
import MyMapComponent from '../../Components/Map';
import Button from '../../Components/Button';
import Loader from 'react-loader-spinner';
import Navbar from '../../Components/Navbar';
import Im from '../../logo.svg';
import AppActions from '../../store/Actions/AppActions';
import { database } from 'firebase';
import '../../assets/Hover-master/css/hover-min.css';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import Decoder from '@mapbox/polyline';
import dist from 'react-loader-spinner/dist';
import './index.css';
import io from 'socket.io-client';
const socket = io('http://localhost:8080');
let Ref = {};
const icon = { url: require('../../assets/markerlocation.png'), scaledSize: { width: 32, height: 32 } };
let colors = ["#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57"]
class Tracking extends Component {
    constructor(props) {
        super(props);
        this._mount = true;
        this.state = {
            openUpdateModel: false,
            trackingObj: {},
            showMap: false,
            i: 0
        }
        Ref = this;
        this.intrevalRef = {};
        this.coordinates = JSON.parse(localStorage.getItem('coordinates'));
    }
    componentDidMount() {
        this.props.getAllBuses();
        console.log('component did mount of tracking: ');
    }

    signOut = () => {
        this.props.signOut();
    }

    trackThis = (busName) => {
        this.setState({ showMap: true });
        console.log('track this: ', busName);
        socket.on(busName, (data) => {
            console.log('data comming from server : ', data);
            this.setState({ trackingObj: { lat: parseFloat(data.lat), lng: parseFloat(data.lng) } });
        });
        // this.intrevalRef = setInterval(() => {
        //     console.log('this.coordinates[this.state.i]: ', this.coordinates[this.state.i]);
        //     this.setState({ trackingObj: this.coordinates[this.state.i], i: this.state.i + 1 });
        // }, 5000);
    }

    makeShowMapFalse = () => {
        this.setState({ showMap: false });
        clearInterval(this.intrevalRef)
    }

    render() {
        return (
            <Navbar history={this.props.history}>
                <h2 style={{
                        color: 'rgb(47, 53, 66)',
                        textAlign: 'center',
                        fontWeight: '600'
                }}>Students</h2>
            </Navbar>
        )
    }
}


let mapStateToProps = (state) => {
    console.log('from home reducers state: ', state)
    return {
        allBuses: state.appReducer.allBuses
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(AuthAction.signOut()),
        getAllBuses: () => dispatch(AppActions.getAllBuses())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracking);