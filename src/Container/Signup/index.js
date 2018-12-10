import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../Components/Button';
import Input from '../../Components/Input';
import AuthAction from '../../store/Actions/AuthActions';
import { withRouter } from 'react-router-dom';
import Loader from 'react-loader-spinner';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import './index.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            cmsid: '',
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
        let { name, cmsid, userType, email, password } = this.state;
        this.setState({ showLoader: true, disableBtn: true }, () => {
            console.log('showLoader: ', this.state.showLoader)
        })
        console.log('outer')
        if (name.trim() !== "" && cmsid.trim() !== "" && userType.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
            let obj = {
                name: this.state.name,
                cmsId: this.state.cmsid,
                userType: this.state.userType,
                email: this.state.email,
                pass: this.state.password
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
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <div className="parent">
                <div className="heading-wrapper">
                    <div className="heading">
                        F<img src={require('../../assets/icon.png')} alt="AppIcon" />XS
                    </div>
                    <div className="sub-heading">Register an account</div>
                </div>
                <div className="form-wrapper" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <div style={{
                        marginTop: '48px',
                        width: '304px',
                        height: '209px',
                        padding: '48px',
                        backgroundColor: '#fff',
                        borderRadius: '3px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        // alignItems: 'center'
                    }}>
                        <div className="firstName-wrapper">
                            <Input placeholder="Enter name" className="firstName" type="text" onChange={(e) => this.updateValue(e, "name")} value={this.state.name} />
                        </div>
                        <div className="email-wrapper">
                            <Input placeholder="Enter email" className="email" type="email" onChange={(e) => this.updateValue(e, "email")} value={this.state.email} />
                        </div>
                        <div className="password-wrapper">
                            <Input placeholder="Enter password" className="password" type="password" onChange={(e) => this.updateValue(e, "password")} value={this.state.password} />
                        </div>
                        <div className="lastName-wrapper">
                            <Input placeholder="CMS ID" className="lastName" type="text" onChange={(e) => this.updateValue(e, "cmsid")} value={this.state.lastName} />
                        </div>
                        {/* <FormControl >
                            <InputLabel htmlFor="age-simple">Age</InputLabel>
                            <Select
                                value={this.state.userType}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'userType',
                                    id: 'age-simple',
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Student</MenuItem>
                                <MenuItem value={20}>Staff</MenuItem>
                            </Select>
                        </FormControl> */}
                        {/* <div className="lastName-wrapper">
                            <Input placeholder="User" className="lastName" type="text" onChange={(e) => this.updateValue(e, "cmsid")} value={this.state.lastName} />
                        </div> */}
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
                    <div onClick={() => this.props.history.push('/login')}>Already have an account log in</div>
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