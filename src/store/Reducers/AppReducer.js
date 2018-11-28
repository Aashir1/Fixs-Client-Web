import actionsType from '../actionTypes';

let initalState = {
    busesRoutes: [],
    busesRoutesProgress: false,
    busesRoutesErrorMessage: "",
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
            icon: 'signout',
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
            name: "Bus Tracking",
            isFocus: false
        },
    }
}

export default function appReducer(state = initalState, action) {
    switch (action.type) {
        case actionsType.UPDATE_NAVBAR: {
            let name = action.payload.name;
            console.log('name: ', name)
            let { navOptions } = state;
            navOptions[name].isFocus = true;
            for (let i in navOptions) {
                if (i !== name) {
                    navOptions[i].isFocus = false;
                    console.log(navOptions[i]);
                }
            }
            // this.setState({ navOptions });
            action.payload.history.push(`${name}`);
            return Object.assign({}, state, { navOptions: navOptions });
        }

        case actionsType.GET_BUSROUTE_PROGRESS:
            return Object.assign({}, state, { busesRoutesProgress: true });
        case actionsType.GET_BUSROUTE_SUCCEED:
            return Object.assign({}, state, { busesRoutes: action.payload, busesRoutesProgress: false });
        case actionsType.GET_BUSROUTES_FAIL:
            return Object.assign({}, state, { busesRoutesProgress: false, busesRoutesErrorMessage: action.payload });

        default:
            return state;
    }
};