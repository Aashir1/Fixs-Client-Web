import actionsType from '../actionTypes';

let initalState = {
    userInfo: null,
    isProgress: false,
    errorMsg: '',
    homeFlag: false,
    forUpdate: "",
    isError: false
};

export default function authReducer(state = initalState, action) {
    switch (action.type) {
        case actionsType.LOGIN_PROGRESS:
            return Object.assign({}, state, { isProgress: true });
        case actionsType.LOGIN_SUCCEED:
            return Object.assign({}, state, { isProgress: false, userInfo: action.payload });
        case actionsType.LOGIN_FAIL:
            return Object.assign({}, state, { isProgress: false, errorMsg: action.payload, isError: true });


        case actionsType.CHANGE_PASSWORD_PROGRESS:
            return Object.assign({}, state, { isProgress: true });
        case actionsType.CHANGE_PASSWORD_SUCCEED:
            return Object.assign({}, state, { isProgress: false, userInfo: action.payload });
        case actionsType.CHANGE_PASSWORD_FAIL:
            return Object.assign({}, state, { isProgress: false, errorMsg: action.payload, isError: true });



        case actionsType.SIGNUP_PROGRESS:
            return Object.assign({}, state, { isProgress: true });
        case actionsType.SIGNUP_SUCCEED:
            return Object.assign({}, state, { isProgress: false, userInfo: action.payload });
        case actionsType.SIGNOUT_FAIL:
            return Object.assign({}, state, { isProgress: false, errorMsg: action.payload, isError: true });

        //     case actionsType.SIGNUP_PROGRESS:
        //     return Object.assign({}, state, { isProgress: true });
        // case actionsType.SIGNUP_SUCCEED:
        //     return Object.assign({}, state, { isProgress: false, userInfo: action.payload });
        // case actionsType.SIGNUP_FIAL:
        //     return Object.assign({}, state, { isProgress: false, errorMsg: action.payload });

        case actionsType.SIGNOUT_SUCCEED:
            localStorage.setItem('user', null);
            let { userInfo } = state;
            userInfo = null;
            return Object.assign({}, state, { userInfo, homeFlag: true, forUpdate: Date.now() });

        case actionsType.HOME_FLAG:
            return Object.assign({}, state, { homeFlag: false });

        case actionsType.MAKE_ISERROR_FALSE:
            return Object.assign({}, state, { isError: false, errorMsg: "" });

        default:
            return state;
    }
};