import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthAction from '../../../store/Actions/AuthActions';
import Navbar from '../../../Components/Navbar';
import AppActions from '../../../store/Actions/AppActions';
import '../../../assets/Hover-master/css/hover-min.css';
import Select from '../../../Components/Select';
import '../index.css';

let Ref = {};
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
        console.log('Montly render')
        return (
            <Navbar history={this.props.history} backgroundColor="#fff">
                <h2 style={{
                    color: 'rgb(47, 53, 66)',
                    textAlign: 'center',
                    fontWeight: '600'
                }}>Montly</h2>
                <section>
                    <Select options={this.state.busesName} value={this.state.value} setBusName={(bus) => {
                        console.log("set this bus: ", bus);
                        this.setState({ value: bus })
                    }} />
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