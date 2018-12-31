import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthAction from '../../store/Actions/AuthActions';
import MyMapComponent from '../../Components/Maps/Map';
// import Button from '../../Components/Button';
import Loader from 'react-loader-spinner';
import Navbar from '../../Components/Navbar';
import Im from '../../logo.svg';
import AppActions from '../../store/Actions/AppActions';
import Select from '../../Components/Select';
import { database } from 'firebase';
import '../../assets/Hover-master/css/hover-min.css';
import { compose, withProps } from "recompose"
import { Box, Button, Grommet, RoutedButton, Text } from "grommet";
import { grommet } from "grommet/themes";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline } from "react-google-maps";
import Decoder from '@mapbox/polyline';
import dist from 'react-loader-spinner/dist';
import './index.css';
import io from 'socket.io-client';

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
            i: 0,
            value: '',
            busesName: ['HU-01', 'HU-02', 'HU-03', 'HU-04', 'HU-05', 'HU-06', 'HU-07', 'HU-08'],
            responseFlag: ''
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



    makeShowMapFalse = () => {
        this.setState({ showMap: false });
        clearInterval(this.intrevalRef)
    }

    render() {
        return (
            <Navbar history={this.props.history} backgroundColor="#fff">
                <h2 style={{
                    color: 'rgb(47, 53, 66)',
                    textAlign: 'center',
                    fontWeight: '600'
                }}>Report</h2>
                <section style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div style={{
                        width: '15rem',
                        height: '21rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around'
                    }}>
                        <div>
                            <Button onClick={() => {
                                console.log('weekly')
                                this.setState({ responseFlag: 'weekly' });
                                this.props.history.push('/report/weekly');
                                console.log(this.props.history)
                            }} style={{ width: '100%' }} label="Weekly" />
                        </div>
                        <div>
                            <Button onClick={() => {
                                console.log('monthly')
                                this.props.history.push('/report/monthly');
                                this.setState({ responseFlag: 'monthly' })
                                console.log(this.props.history)
                            }} label="Monthly" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <Button onClick={() => {
                                console.log('yearly');
                                this.props.history.push('/report/yearly');
                                this.setState({ responseFlag: 'yearly' })
                                console.log(this.props.history)
                            }} label="Yearly" style={{ width: '100%' }} />
                        </div>
                    </div>
                </section>
            </Navbar >
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