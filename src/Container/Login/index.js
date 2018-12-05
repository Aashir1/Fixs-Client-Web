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
            showLoader: false,
            showForgetPasswordForm: false,
            newPassword: ""
        }
        comRef = this;
    }
    // componentWillReceiveProps(nextporps) {
    //     console.log('recived new props: ', nextporps)
    //     if (nextporps.user) {
    //         this.props.history.push('/home')
    //     }
    // }
    componentDidMount() {

    }
    static getDerivedStateFromProps = (nextporps) => {
        console.log('recived new props Login: ', comRef.props, nextporps)
        if (nextporps.isError) {
            comRef.setState({ showAlert: true, showLoader: false });
            comRef.showAlert();
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
    showAlert = () => {
        Alert.error(this.props.errorMessage || 'Something is wrong', {
            position: 'bottom-right',
            effect: 'bouncyflip',
            html: false,
            timeout: 2000,
            onClose: function () {
                comRef.props.makeIserrorFalse();
            }
        })
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
        let { email, password, showForgetPasswordForm, newPassword } = this.state;
        if (showForgetPasswordForm) {  //if forget password form
            if (email.trim() !== "" && newPassword === password && newPassword.trim() !== "" && password.trim() !== "") {
                setTimeout(() => {
                    this.props.changePassword({
                        email,
                        newPassword
                    });
                }, 2000);
            } else {
                Alert.error('Something is wrong', {
                    position: 'bottom-right',
                    effect: 'bouncyflip',
                    html: false,
                    timeout: 2000
                })
            }
        } else {
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
    }
    showForgetPasswordForm = () => {
        this.setState({ showForgetPasswordForm: true }, () => {
            console.log("this.state.showForgotPasswordForm: ", this.state);
        });

    }
    makeShowForgetPasswordFalse = () => {
        this.setState({ showForgetPasswordForm: false });
    }
    render() {
        return (
            <div className="parent" style={this.state.showForgetPasswordForm ? {
                width: '100%',
                height: '100%'
            } :
                {
                    width: "100vw",
                    height: "100vh"
                }}>
                {
                    this.state.showAlert ?
                        <Alert stack={{ limit: 1 }} />
                        :
                        <span></span>
                }
                <div className="heading-wrapper">
                    {
                        this.state.showForgetPasswordForm ?
                            <img src={require('../../assets/arrow.png')}
                                className="back-arrow"
                                onClick={this.makeShowForgetPasswordFalse}
                                style={{
                                    width: "40px",
                                    margin: "25px 0 0 25px",
                                    cursor: "pointer"
                                }} />
                            :
                            <div></div>
                    }
                    <div className="heading">
                        F<img src={require('../../assets/icon.png')} alt="AppIcon" />XS
                    </div>
                    <div className="sub-heading">Login to continue</div>
                </div>
                {
                    this.state.showForgetPasswordForm ?
                        <div className="form-wrapper">
                            <div className="form-parent">
                                <div className="email-wrapper">
                                    <Input placeholder="Enter email" className="email" type="email" onChange={(e) => this.updateValue(e, "email")} value={this.state.email} />
                                </div>
                                <div className="password-wrapper">
                                    <Input placeholder="Enter new password" className="password" type="password" onChange={(e) => this.updateValue(e, "password")} value={this.state.password} />
                                </div>
                                <div className="password-wrapper">
                                    <Input placeholder="Re enter new password" className="password" type="password" onChange={(e) => this.updateValue(e, "newPassword")} value={this.state.newPassword} />
                                </div>
                                <Button className="button" onClick={this.submitForm} btnText={
                                    this.state.showLoader ?
                                        <div style={{ paddingTop: '4px' }}>
                                            <Loader type="RevolvingDot" color="#fff" height={30} width={30} />
                                        </div>
                                        :
                                        'Change Password'
                                } />
                            </div>
                        </div>
                        :
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
                }
                <div style={{ textAlign: 'center' }}>
                    <span className="signup-link" style={{ display: "inline-block" }}>
                        <span onClick={() => this.props.history.push('/signup')}>Sign up for an account</span>
                    </span>
                    <span style={{
                        fontSize: "14px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "1.42857142857143",
                        marginLeft: "5px",
                        color: "white"
                    }}>
                        Or
                        <span onClick={this.showForgetPasswordForm} style={{
                            marginLeft: "5px",
                            color: "#deebff",
                            fontWeight: "500",
                            textDecoration: "underline",
                            cursor: "pointer"
                        }}>forget password ?</span>
                    </span>
                </div>
            </div >
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
        makeIserrorFalse: () => dispatch(AuthAction.makeIserrorFalse()),
        changePassword: (obj) => dispatch(AuthAction.changePassword(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);