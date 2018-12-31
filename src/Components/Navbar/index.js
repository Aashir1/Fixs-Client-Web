import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppActions from '../../store/Actions/AppActions';
import { Box, Grommet, Clock } from "grommet";
import { grommet } from "grommet/themes";
import './index.css';
const DigitalClock = () => (
    <Grommet theme={grommet} style={{ background: 'transparent', padding: '5rem 2rem 0rem 2rem' }}>
        {/* <Box align="center" justify="start" pad="large">
        </Box> */}
        <Box round='large' background='#7bf4ed' align="center" pad='small' time="T10:37:45"  >
            <Clock type="digital" />
            {/* <Clock type='digital' size='large' run='backward' time='PT18H10M48S' /> */}
        </Box>
    </Grommet>
);
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            navOptions: {
                busRoute: {
                    colorIcon: 'colorRoute',
                    icon: 'route',
                    name: "Bus Route",
                    isFocus: false
                },
                driverInfo: {
                    colorIcon: 'colorInfo',
                    icon: 'info',
                    name: "Bus Info",
                    isFocus: false
                },
                signOut: {
                    colorIcon: 'colorSignout',
                    icon: 'signOut',
                    name: "Logout",
                    isFocus: false
                },
                student: {
                    colorIcon: 'colorStudent',
                    icon: 'student',
                    name: "Students",
                    isFocus: false
                },
                tracking: {
                    colorIcon: 'colorTracking',
                    icon: 'tracking',
                    name: "Bus tracking",
                    isFocus: false
                },
            }
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        return null;
    }


    itemClick = (name) => {
        // console.log('name: ', name)
        // let { navOptions } = this.state;
        // navOptions[name].isFocus = true;
        // for (let i in navOptions) {
        //     if (i !== name) {
        //         navOptions[i].isFocus = false;
        //         console.log(navOptions[i]);
        //     }
        // }
        // this.setState({ navOptions });
        // this.props.history.push(`${name}`);
        this.props.updateNavbar({
            name,
            history: this.props.history
        });
    }

    render() {
        let { navOptions } = this.props;
        return (
            <div className="grid-container">
                <div className="col-1">
                    <div>
                        <section className="heading">
                            <img src={require('../../assets/largicon.png')} className="heading-icon" />
                            <div className="logo">
                                F<img src={require('../../assets/icon.png')} className="logo-heading-icon" />XS
                            </div>
                        </section>

                        <section className="nav-options">
                            <div className="nav-item" onClick={() => this.itemClick('busRoute')} style={{ backgroundColor: navOptions['busRoute'].isFocus ? 'rgba(1,1,1,0.2)' : 'transparent' }}>
                                <div className="nav-item-child1">
                                    <img src={require(`../../assets/${navOptions['busRoute'].isFocus ? navOptions['busRoute'].icon : navOptions['busRoute'].colorIcon}.png`)} alt="Icon" />
                                </div>
                                {
                                    navOptions['busRoute'].isFocus ?
                                        <div className="nav-item-child2" style={{ color: '#fff', fontWeight: 'bold' }}>
                                            {navOptions['busRoute'].name}
                                        </div>
                                        :
                                        <div className="nav-item-child2">
                                            {navOptions['busRoute'].name}
                                        </div>
                                }
                            </div>
                            <div className="nav-item" onClick={() => this.itemClick('driverInfo')} style={{ backgroundColor: navOptions['driverInfo'].isFocus ? 'rgba(1,1,1,0.2)' : 'transparent' }}>
                                <div className="nav-item-child1">
                                    <img src={require(`../../assets/${navOptions['driverInfo'].isFocus ? navOptions['driverInfo'].icon : navOptions['driverInfo'].colorIcon}.png`)} alt="Icon" />
                                </div>
                                {
                                    navOptions['driverInfo'].isFocus ?
                                        <div className="nav-item-child2" style={{ color: '#fff', fontWeight: 'bold' }}>
                                            {navOptions['driverInfo'].name}
                                        </div>
                                        :
                                        <div className="nav-item-child2">
                                            {navOptions['driverInfo'].name}
                                        </div>
                                }
                            </div>
                            <div className="nav-item" onClick={() => this.itemClick('time')} style={navOptions.time && { backgroundColor: navOptions['time'].isFocus ? 'rgba(1,1,1,0.2)' : 'transparent' }}>
                                <div className="nav-item-child1">
                                    <img src={require(`../../assets/${navOptions.time && navOptions['time'].isFocus ? navOptions['time'].icon : navOptions['time'].colorIcon}.png`)} alt="Icon" />
                                </div>
                                {
                                    navOptions.time && navOptions['time'].isFocus ?
                                        <div className="nav-item-child2" style={{ color: '#fff', fontWeight: 'bold' }}>
                                            {navOptions['time'].name}
                                        </div>
                                        :
                                        <div className="nav-item-child2">
                                            {navOptions['time'].name}
                                        </div>
                                }
                            </div>

                            <div className="nav-item" onClick={() => this.itemClick('tracking')} style={{ backgroundColor: navOptions['tracking'].isFocus ? 'rgba(1,1,1,0.2)' : 'transparent' }}>
                                <div className="nav-item-child1">
                                    <img src={require(`../../assets/${navOptions['tracking'].isFocus ? navOptions['tracking'].icon : navOptions['tracking'].colorIcon}.png`)} alt="Icon" />
                                </div>
                                {
                                    navOptions['tracking'].isFocus ?
                                        <div className="nav-item-child2" style={{ color: '#fff', fontWeight: 'bold' }}>
                                            {navOptions['tracking'].name}
                                        </div>
                                        :
                                        <div className="nav-item-child2">
                                            {navOptions['tracking'].name}
                                        </div>
                                }
                            </div>
                            <div className="nav-item" onClick={() => this.itemClick('report')} style={{ backgroundColor: navOptions['report'].isFocus ? 'rgba(1,1,1,0.2)' : 'transparent' }}>
                                <div className="nav-item-child1">
                                    <img src={require(`../../assets/${navOptions['report'].isFocus ? navOptions['report'].icon : navOptions['report'].colorIcon}.png`)} alt="Icon" />
                                </div>
                                {
                                    navOptions['report'].isFocus ?
                                        <div className="nav-item-child2" style={{ color: '#fff', fontWeight: 'bold' }}>
                                            {navOptions['report'].name}
                                        </div>
                                        :
                                        <div className="nav-item-child2">
                                            {navOptions['report'].name}
                                        </div>
                                }
                            </div>
                            <div className="nav-item" onClick={() => this.itemClick('student')} style={{ backgroundColor: navOptions['student'].isFocus ? 'rgba(1,1,1,0.2)' : 'transparent' }}>
                                <div className="nav-item-child1">
                                    <img src={require(`../../assets/${navOptions['student'].isFocus ? navOptions['student'].icon : navOptions['student'].colorIcon}.png`)} alt="Icon" />
                                </div>
                                {
                                    navOptions['student'].isFocus ?
                                        <div className="nav-item-child2" style={{ color: '#fff', fontWeight: 'bold' }}>
                                            {navOptions['student'].name}
                                        </div>
                                        :
                                        <div className="nav-item-child2">
                                            {navOptions['student'].name}
                                        </div>
                                }
                            </div>
                            <div className="nav-item" onClick={() => this.itemClick('signOut')} style={{ backgroundColor: navOptions['signOut'].isFocus ? 'rgba(1,1,1,0.2)' : 'transparent' }}>
                                <div className="nav-item-child1">
                                    <img src={require(`../../assets/${navOptions['signOut'].isFocus ? navOptions['signOut'].icon : navOptions['signOut'].colorIcon}.png`)} alt="Icon" />
                                </div>
                                {
                                    navOptions['signOut'].isFocus ?
                                        <div className="nav-item-child2" style={{ color: '#fff', fontWeight: 'bold' }}>
                                            {navOptions['signOut'].name}
                                        </div>
                                        :
                                        <div className="nav-item-child2">
                                            {navOptions['signOut'].name}
                                        </div>
                                }
                            </div>
                        </section>
                        <section>
                            <DigitalClock />
                        </section>
                    </div>
                </div>
                <div className="col-2" style={{ backgroundColor: this.props.backgroundColor || '#f1f2f6', height: 'auto' }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    console.log('from home reducers state: ', state)
    return {
        navOptions: state.appReducer.navOptions
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNavbar: (obj) => dispatch(AppActions.updateNavbar(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);