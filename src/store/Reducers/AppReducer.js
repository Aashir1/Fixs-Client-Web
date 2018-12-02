import actionsType from '../actionTypes';

let initalState = {
    busesRoutes: [],
    busesRoutesProgress: false,
    busesRoutesErrorMessage: "",
    busesInfo: [],
    busesInfoProgress: false,
    busesInfoErrorMessage: "",
    hasMorePage: true,
    currentPage: 1,
    eta: 0,
    distance: 0,
    etaProgress: false,
    etaErrorMessage: "",

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


        case actionsType.GET_BUSINFO_PROGRESS:
            return Object.assign({}, state, { busesInfoProgress: true });
        case actionsType.GET_BUSINFO_SUCCEED:
            let infoArray = [...state.busesInfo, ...action.payload.info];
            infoArray = infoArray.length === 1 ? infoArray[0] : infoArray;
            return Object.assign({}, state, { busesInfoProgress: false, busesInfo: infoArray, currentPage: action.payload.currentPage, hasMorePage: action.payload.hasMorePages });
        case actionsType.GET_BUSINFO_FAIL:
            return Object.assign({}, state, { busesInfoProgress: false, busesInfoErrorMessage: action.payload });




        case actionsType.GET_ETAINFO_PROGRESS:
            return Object.assign({}, state, { etaProgress: true });
        case actionsType.GET_ETAINFO_SUCCEED:
            return Object.assign({}, state, { etaProgress: false, distance: action.payload.distance.text, eta: action.payload.duration.text });
        case actionsType.GET_ETAINFO_FAIL:
            return Object.assign({}, state, { etaErrorMessage: action.payload, etaProgress: false });
        default:
            return state;
    }
};