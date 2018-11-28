import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import AuthAction from '../../store/Actions/AuthActions';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import './index.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            showLoader: false,
            disableBtn: false
        }
    }

    static getDerivedStateFromProps = (nextporps) => {
        if (nextporps.user) {
            nextporps.history.replace('/home');
        }
        return null;
    }

    updateValue = (e, name) => {
        let obj = {};
        obj[name] = e.target.value;
        console.log(obj);
        this.setState(obj);
    }


    submitForm = () => {
        let { firstName, lastName, email, password } = this.state;
        this.setState({ showLoader: true, disableBtn: true }, () => {
            console.log('showLoader: ', this.state.showLoader)
        })
        console.log('outer')
        if (firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
            let obj = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                name: this.state.firstName + " " + this.state.lastName,
                email: this.state.email,
                password: this.state.password
            }
            setTimeout(() => {
                this.props.signUp(obj);
            }, 2000)
        }
        else {
            alert('Data badly formated');
            this.setState({ showLoader: false, disableBtn: false });
        }
    }
    render() {
        return (
            <div className="parent">
                <div className="heading-wrapper">
                    <div className="heading">
                        F<img src={require('../../assets/icon.png')} alt="AppIcon" />XS
                    </div>
                    <div className="sub-heading">Register an account</div>
                </div>
                <div className="form-wrapper">
                    <div className="form-parent">
                        <div className="firstName-wrapper">
                            <Input placeholder="First name" className="firstName" type="text" onChange={(e) => this.updateValue(e, "firstName")} value={this.state.firstName} />
                        </div>
                        <div className="lastName-wrapper">
                            <Input placeholder="Last name" className="lastName" type="text" onChange={(e) => this.updateValue(e, "lastName")} value={this.state.lastName} />
                        </div>
                        <div className="email-wrapper">
                            <Input placeholder="Enter email" className="email" type="email" onChange={(e) => this.updateValue(e, "email")} value={this.state.email} />
                        </div>
                        <div className="password-wrapper">
                            <Input placeholder="Enter password" className="password" type="password" onChange={(e) => this.updateValue(e, "password")} value={this.state.password} />
                        </div>
                        <Button disabled={this.state.disableBtn} className="button" onClick={this.submitForm} btnText={
                            this.state.showLoader ?
                                <div style={{ paddingTop: '4px' }}>
                                    <Loader type="RevolvingDot" color="#fff" height={30} width={30} />
                                </div>
                                :
                                'Register'
                        } />
                    </div>
                </div>
                <div className="signup-link">
                    <div onClick={() => this.props.history.push('/')}>Already have an account log in</div>
                </div>
            </div>
            // <div>
            //     <Input type="text" onChange={(e) => this.updateValue(e, "firstName")} value={this.state.firstName} />
            //     <Input type="text" onChange={(e) => this.updateValue(e, "lastName")} value={this.state.lastName} />
            //     <Input type="email" onChange={(e) => this.updateValue(e, "email")} value={this.state.email} />
            //     <Input type="password" onChange={(e) => this.updateValue(e, "password")} value={this.state.password} />
            //     <Button onClick={this.submitForm} btnText='Submit' />
            // </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        user: state.authReducer.userInfo
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        signUp: (obj) => dispatch(AuthAction.signUp(obj))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));