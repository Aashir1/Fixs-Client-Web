import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthAction from '../../store/Actions/AuthActions';
import MyMapComponent from '../../Components/Maps/Map';
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
const socket = io('https://warm-thicket-69046.herokuapp.com');
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
        this.getLocation();
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
        this.setState({ trackingObj: { lat: position.coords.latitude, lng: position.coords.longitude } });
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
                }}>Tracking</h2>
                {
                    this.state.showMap ?
                        <div>
                            <img src={require('../../assets/left-arrow.png')}
                                className="back-arrow"
                                onClick={this.makeShowMapFalse}
                                style={{
                                    width: "60px",
                                    margin: "5px 0 20px 32px",
                                    cursor: "pointer"
                                }} />
                            <div style={{
                                padding: '0em 2em',
                                boxShadow: '0px 0px 15px #deded'
                            }}>
                                <MapComponent
                                    trackingObj={this.state.trackingObj || { lat: parseFloat(54), lng: parseFloat(54) }}
                                    isMarkerShown={true}
                                />
                            </div>
                        </div>
                        :
                        <section style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '2em'
                        }}>
                            <div className="buses-wrapper">
                                {
                                    this.props.allBuses.map((data, i) => {
                                        return (
                                            <div onClick={() => this.trackThis(data.bus_name)} style={{ backgroundColor: colors[i], color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
                                                <img src={require('../../assets/front-bus.png')} alt="routeimage" />
                                                <span style={{
                                                    fontWeight: '700',
                                                    paddingTop: '1rem'
                                                }}>
                                                    {data.bus_name}
                                                </span>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </section>
                }
            </Navbar>
        )
    }
}

const MapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDDmyFwVLZ7Fys0sWTDMxa7h_Dyy79BXuM",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={18}
        defaultCenter={(Number(67.072423), Number(24.890555))}
        accuracy={props.accuracy}
        center={props.trackingObj || (Number(67.072423), Number(24.890555))}
    >
        {props.isMarkerShown && <Marker icon={icon} position={props.trackingObj || (Number(67.072423), Number(24.890555))} onClick={props.onMarkerClick} />}
    </GoogleMap>
)



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