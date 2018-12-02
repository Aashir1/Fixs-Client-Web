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
import InfiniteScroll from 'react-infinite-scroller';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import './businfo.css';
let Ref = {};
let colors = ["#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57", "#ef5777", "#575fcf", "#e67e22", "#3498db", "#c0392b", "#f1c40f", "#1B1464", "#0652DD", "#ffc048", "#ff5e57"]
class Home extends Component {
    constructor(props) {
        super(props);
        this._mount = true;
        this.state = {
            lat: 0,
            lng: 0,
            accuracy: 0,
            mapLoader: true,
            busInfoPage: 1,
            isCallPage: true
        }
        Ref = this;
    }

    componentDidMount() {
        console.log("this.props.currentPage*10: ", this.props.currentPage * 10)
        console.log("this.props.busesInfo: ", this.props.busesInfo);
        console.log("this.props.currentPage*10 !== this.props.busesInfo: ", this.props.currentPage * 10 !== this.props.busesInfo.length)
        if (this.props.currentPage * 10 !== this.props.busesInfo.length) {
            this.props.getBusInfo(this.props.currentPage);
        }
        this._mount = true;
        window.addEventListener('scroll', this.callPaging);
    }

    componentWillUnmount() {
        this._mount = false;
        window.removeEventListener('scroll', this.callPaging);
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

    callPaging = () => {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight;
        let offsetHeight = document.documentElement.clientHeight;
        let contentHeight = scrollHeight - offsetHeight;
        console.log("scrollHeight: ", scrollHeight);
        console.log("offsetHeight: ", offsetHeight);
        console.log("scrollTop: ", scrollTop);
        console.log("contentHeight: ", contentHeight);
        console.log("(scrollHeight / contentHeight) * 100: ", (scrollTop / contentHeight) * 100)

        if ((scrollTop / contentHeight) * 100 >= 80) {
            console.log("/////////////////////**********************///////////////////");
            if (this.props.hasMorePage) {
                this.props.getBusInfo(parseInt(this.props.currentPage) + 1);
                // this.setState({ isCallPage: false });
            }
        }
    }


    render() {
        let items = [];
        if (!this.props.busesInfoProgress) {
            this.props.busesInfo.map((data, i) => {
                // console.log()
                items.push(
                    <div className="info-item hvr-bob" key={i}>
                        <div className="info-item-child1">
                            <div className="bus-name" style={{ backgroundColor: colors[i], color: "#fff" }}>{data.bus_name}</div>
                        </div>
                        <div className="info-item-child2">
                            <div className="info-data">{`Driver Name: ${data.bus_driver_name}`}</div>
                            <div className="info-data">{`Driver Phone: ${data.bus_driver_phone}`}</div>
                            <div className="info-data">{`Bus Name: ${data.bus_name}`}</div>
                            <div className="info-data">{`Stop Info: ${data.stop_info}`}</div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <Navbar history={this.props.history}>
                <div style={{background: "#7deb9f"}}>
                    Add Bus Info
                </div>
                <h1>Driver Info</h1>
                <Button btnText="Signout" onClick={this.signOut} />
                {
                    this.props.busesInfoProgress ? (
                        <Loader type="Oval" color="#000" height={50} width={50} />
                    )
                        :
                        <InfiniteScroll
                            pageStart={this.props.currentPage}
                            loadMore={() => this.props.getBusInfo(parseInt(this.props.currentPage) + 1)}
                            hasMore={this.props.hasMore}
                            loader={<Loader type="Oval" color="#000" height={50} width={50} />}
                        >
                            <section className="businfo-main">
                                {
                                    items
                                }
                            </section>
                        </InfiniteScroll>


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
        homeFlag: state.authReducer.homeFlag,
        currentPage: state.appReducer.currentPage,
        busesInfo: state.appReducer.busesInfo,
        busesInfoProgress: state.appReducer.busesInfoProgress,
        hasMorePage: state.appReducer.hasMorePage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(AuthAction.signOut()),
        updateHomeFlag: () => dispatch(AuthAction.updateHomeFlag()),
        getBusInfo: (page) => dispatch(AppActions.getBusInfo(page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);