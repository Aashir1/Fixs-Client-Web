import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import AuthAction from '../../store/Actions/AuthActions';
import Loader from 'react-loader-spinner';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-default.css';
import Alert from 'react-s-alert';
import './index.css';
import { func } from 'prop-types';
let comRef = {};
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showLoader: false
        }
        comRef = this;
    }
    // componentWillReceiveProps(nextporps) {
    //     console.log('recived new props: ', nextporps)
    //     if (nextporps.user) {
    //         this.props.history.push('/home')
    //     }
    // }
    static getDerivedStateFromProps = (nextporps) => {
        console.log('recived new props Login: ', comRef.props, nextporps)
        if (nextporps.isError) {
            comRef.setState({ showAlert: true, showLoader: false });
            comRef.props.makeIserrorFalse();
        }
        if (nextporps.user) {
            nextporps.history.replace('/home');
            //     comRef.props.alert.show('Welcome', {
            //         timeout: 1000,
            //         type: 'success'
            //     });
            //     setTimeout(() => {
            //         nextporps.history.replace('/home');
            //     }, 1000);
        }
        return {
            nextporps
        }
    }

    updateValue = (e, name) => {
        let obj = {};
        obj[name] = e.target.value;
        console.log(obj);
        this.setState(obj);
    }

    submitForm = () => {
        this.setState({ showLoader: true }, () => {
            console.log('showLoader: ', this.state.showLoader)
        })
        let { email, password } = this.state;
        if (email.trim() !== "" && password.trim() !== "") {
            let obj = {
                email: this.state.email,
                pass: this.state.password
            }
            setTimeout(() => {
                this.props.login(obj);
            }, 2000)
        }
        else {
            alert('Data badly formated');
            this.setState({ showLoader: false });
        }
    }
    render() {
        return (
            <div className="parent">
                {
                    this.state.showAlert ?
                        Alert.error(this.props.errorMessage || 'Something is wrong', {
                            position: 'bottom-right',
                            effect: 'bouncyflip',
                            html: false,
                            timeout: 1000,
                            onClose: function () {
                                this.props.makeIserrorFalse();
                            }
                        }) :
                        <span></span>
                }
                <div className="heading-wrapper">
                    <div className="heading">
                        F<img src={require('../../assets/icon.png')} alt="AppIcon" />XS
                    </div>
                    <div className="sub-heading">Login to continue</div>
                </div>
                <div className="form-wrapper">
                    <div className="form-parent">
                        <div className="email-wrapper">
                            <Input placeholder="Enter email" className="email" type="email" onChange={(e) => this.updateValue(e, "email")} value={this.state.email} />
                        </div>
                        <div className="password-wrapper">
                            <Input placeholder="Enter password" className="password" type="password" onChange={(e) => this.updateValue(e, "password")} value={this.state.password} />
                        </div>
                        <Button className="button" onClick={this.submitForm} btnText={
                            this.state.showLoader ?
                                <div style={{ paddingTop: '4px' }}>
                                    <Loader type="RevolvingDot" color="#fff" height={30} width={30} />
                                </div>
                                :
                                'Log in'
                        } />
                    </div>
                </div>
                <div className="signup-link">
                    <div onClick={() => this.props.history.push('/signup')}>Sign up for an account</div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    console.log('state: ', state)
    return {
        user: state.authReducer.userInfo,
        errorMessage: state.authReducer.errorMsg,
        isError: state.authReducer.isError
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        login: (obj) => dispatch(AuthAction.login(obj)),
        makeIserrorFalse: () => dispatch(AuthAction.makeIserrorFalse())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);