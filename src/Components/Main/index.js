import React from 'react';
import './index.css';
import { connect } from 'react-redux';
import AppActions from '../../store/Actions/AppActions';
import { askForPermissioToReceiveNotifications } from '../../push-notification';
import firebase from '../../push-notification';


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        // this.send = this.send.bind(this);
    }

    componentDidMount() {
        const messaging = firebase.messaging();
        messaging.requestPermission();
        messaging.getToken()
            .then(token => {
                console.log('user token: ', token);
                this.props.subscribeToTopic({ token });
            })
            .catch(error => {
                console.error('error from retraival token: ', error);
            })
    }

    navigate = (value) => {
        if (value === 'admin') {
            this.props.setAdminFlag();
        } else {
            this.props.resetAdminFlag();
        }
        askForPermissioToReceiveNotifications();
        this.props.history.replace('/login');
    }
    render() {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#0b2239'
            }}>
                <button >
                    show Notification
            </button>
                <section>
                    <div style={{
                        color: "#4286f4",
                        fontSize: '84px',
                        fontWeight: '500',
                        // fontFamily: "Muli",
                        // display: 'flex',
                        flex: 0.3,
                        fontWeight: '700',
                        height: 'calc(100vh/3)',
                        display: "flex",
                        alignItems: 'center',
                        marginLeft: '5rem',
                        visibility: 'hidden',
                        color: '#fff'
                    }} >
                        <div>
                            F<img src={require('../../assets/logoColorIcon.png')} />XS
                        </div>
                    </div>
                </section>
                <section style={{
                    /* display: flex; */
                    // flex: '0.3',
                    fontSize: '90px',
                    fontWeight: '700',
                    color: 'rgb(68, 68, 68)',
                    height: 'calc(100vh/3)',
                    display: 'flex',
                    justifyContent: 'center',
                    color: '#fff'
                }} className="heading">
                    <div>
                        <span>
                            Welcome
                        </span>
                        <span >
                            , in FiXS
                            {/* F<img src={require('../../assets/logoColorIcon.png')} />XS */}
                        </span>
                    </div>
                </section>
                <section style={{
                    height: 'calc(100vh/3)'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <div onClick={() => this.navigate(null)} style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            background: '#61ec9f',
                            padding: "12px 24px",
                            borderRadius: '96px',
                            width: '127px',
                            cursor: 'pointer'
                        }} className="login-btn">
                            <span>
                                <img src={require('../../assets/user.png')} />
                            </span>
                            <span>
                                User
                            </span>
                        </div>
                        <div onClick={() => this.navigate('admin')} style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            background: '#61ec9f',
                            padding: "12px 24px",
                            borderRadius: '96px',
                            width: '127px',
                            marginLeft: '1.5rem',
                            cursor: 'pointer'
                        }} className="login-btn">
                            <span>
                                <img src={require('../../assets/admin.png')} />
                            </span>
                            <span>
                                Admin
                            </span>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}
let mapStateToProps = () => {
    return {

    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        setAdminFlag: () => dispatch(AppActions.setAdminFlag()),
        resetAdminFlag: () => dispatch(AppActions.resetAdminFlag()),
        subscribeToTopic: (obj) => dispatch(AppActions.subscribeToTopic(obj))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);