import actionTypes from '../actionTypes';


export default class AuthActions {
    static login(obj) {
        return {
            type: actionTypes.LOGIN_PROGRESS,
            payload: obj
        }
    }

    static signUp(obj) {
        return {
            type: actionTypes.SIGNUP_PROGRESS,
            payload: obj
        }
    }

    static signOut(props) {
        return {
            type: actionTypes.SIGNOUT_SUCCEED
        }
    }

    static updateHomeFlag() {
        return {
            type: actionTypes.HOME_FLAG
        }
    }

    static makeIserrorFalse() {
        return {
            type: actionTypes.MAKE_ISERROR_FALSE
        }
    }
}