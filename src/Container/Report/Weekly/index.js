import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthAction from '../../../store/Actions/AuthActions';
import Navbar from '../../../Components/Navbar';
import AppActions from '../../../store/Actions/AppActions';
import Select from '../../../Components/Select';
import SimpleDate from '../../../Components/Date';
import BarChart from '../../../Components/BarChart';
import MyMapComponent from '../../../Components/Maps/AddRouteMap';
import '../../../assets/Hover-master/css/hover-min.css';
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
            wayPoint: [],
            zoom: 10,
            busesData: {
                'HU-01': {
                    arrivalTime: 8.00,
                    departureTime: 4.10,
                    travelHistory: [{ lat: 24.900260, lng: 67.043444 }, { lat: 24.908291, lng: 67.049235 }, { lat: 24.910450, lng: 67.049723 }, { lat: 24.926293, lng: 67.046785 }, { lat: 24.961482, lng: 67.063946 }, { lat: 25.004700, lng: 67.047965 }, { lat: 25.083340, lng: 25.083340 }],
                },
                'HU-02': {
                    arrivalTime: 8.10,
                    departureTime: 4.00,
                    travelHistory: [],
                },
                'HU-03': {
                    arrivalTime: 8.15,
                    departureTime: 4.08,
                    travelHistory: [],
                },
                'HU-04': {
                    arrivalTime: 8.05,
                    departureTime: 4.05,
                    travelHistory: [],
                },
                'HU-05': {
                    arrivalTime: 8.02,
                    departureTime: 4.20,
                    travelHistory: [],
                },
                'HU-06': {
                    arrivalTime: 8.25,
                    departureTime: 3.50,
                    travelHistory: [],
                },
                'HU-07': {
                    arrivalTime: 8.13,
                    departureTime: 4.00,
                    travelHistory: [],
                },
                'HU-08': {
                    arrivalTime: 8.02,
                    departureTime: 4.00,
                    travelHistory: [],
                },
                'HU-09': {
                    arrivalTime: 8.00,
                    departureTime: 4.10,
                    travelHistory: [],
                }
            },

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
        console.log('his.state.wayPoint[Math.ceil(this.state.wayPoint / 2)]: ', this.state.wayPoint[Math.ceil(this.state.wayPoint.length / 2)], " this.state.waypoint::: ", this.state.wayPoint);
        let allBuses = Object.keys(this.state.busesData);
        let { busesData } = this.state;
        let arrivalData = [], departureData = [];
        for (let i = 0; i < allBuses.length; i++) {
            if (busesData[allBuses[i]].departureTime) {
                console.log(busesData[allBuses[i]], busesData[allBuses[i]].departureTime)
                arrivalData.push(busesData[allBuses[i]].arrivalTime);
                departureData.push(busesData[allBuses[i]].departureTime);
            }
        }

        return (
            <Navbar history={this.props.history} backgroundColor="#fff">
                <div style={{ padding: '0 5rem' }}>
                    <h2 style={{
                        color: 'rgb(47, 53, 66)',
                        textAlign: 'center',
                        fontWeight: '600'
                    }}>Weekly</h2>
                    <section>
                        <Select options={allBuses} value={this.state.value} setBusName={(bus) => {
                            console.log("this.state.busesData[bus].travelHistory: ", this.state.busesData[bus].travelHistory);
                            this.setState({ value: bus, wayPoint: this.state.busesData[bus].travelHistory, zoom: 9 });
                        }} />
                    </section>
                    <section>
                        <SimpleDate onSelect={(date) => this.setState({ date })} date={this.state.date} />
                    </section>
                    <section>
                        <BarChart heading={"Weekly Response"}
                            chartData={{
                                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], //x-axis label array
                                datasets: [
                                    {
                                        label: 'Arrival Time',
                                        data: arrivalData,
                                        backgroundColor: "#8161db"
                                    }
                                ]
                            }}
                        />
                        <BarChart heading={"Weekly Response"}
                            chartData={{
                                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], //x-axis label array
                                datasets: [
                                    {
                                        label: 'Departure Time',
                                        data: departureData,
                                        backgroundColor: "#7bf4ed"
                                    }
                                ]
                            }}
                        />
                    </section>
                    <div>
                        <div>
                            <MyMapComponent
                                lat={0}
                                lng={0}
                                accuracy={0}
                                draggable={false}
                                mapClicked={(event) => {

                                }}
                                updateMarkerLocation={(e, index) => {

                                }}
                                deleteMarker={(i) => {

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
                                defaultCenter={this.state.wayPoint[Math.ceil(this.state.wayPoint.length / 2)] ? this.state.wayPoint[Math.ceil(this.state.wayPoint / 2)] : { lat: 0, lng: 0 }}
                                isMarkerShown={true}
                                center={this.state.wayPoint[Math.ceil(this.state.wayPoint.length / 2)]}
                                zoom={this.state.zoom}
                            />
                        </div>
                    </div>
                </div>
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