import actionsType from '../actionTypes';

let initalState = {
    busesRoutes: [],
    busesRoutesProgress: false,
    busesRoutesErrorMessage: "",
    busesInfo: [],
    allBuses: [],
    busesInfoProgress: false,
    busesInfoErrorMessage: "",
    hasMorePage: true,
    currentPage: 1,
    eta: 0,
    distance: 0,
    etaProgress: false,
    etaErrorMessage: "",
    adminFlag: true,
    editObj: {
        editFlag: false,
        bus: {}
    },
    infoUpdateObj: {
        editFlag: false,
        data: {}
    },
    trackingBusInfo: [],
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
        report: {
            colorIcon: 'colorReport',
            icon: 'report',
            name: "Report",
            isFocus: false
        },
        time: {
            colorIcon: 'colorTime',
            icon: 'time',
            name: "ETA",
            isFocus: false
        }
    }
}

export default function appReducer(state = initalState, action) {
    switch (action.type) {
        case actionsType.UPDATE_NAVBAR: {
            let name = action.payload.name;

            if (name === 'signOut') {
                localStorage.setItem('user', null);
                action.payload.history.replace('/');
                return Object.assign({}, state, {
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
                    adminFlag: false,
                    editObj: {
                        editFlag: false,
                        bus: {}
                    },
                    infoUpdateObj: {
                        editFlag: false,
                        data: {}
                    },
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
                        report: {
                            colorIcon: 'colorReport',
                            icon: 'report',
                            name: "Report",
                            isFocus: false
                        },
                        time: {
                            colorIcon: 'colorTime',
                            icon: 'time',
                            name: "ETA",
                            isFocus: false
                        }
                    }
                })
            }
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
            action.payload.history.push(`/${name}`);
            return Object.assign({}, state, { navOptions: navOptions });
        }



        case actionsType.GET_ALL_BUSES_PROGRESS:
            return Object.assign({}, state, { busesInfoProgress: true });
        case actionsType.GET_ALL_BUSES_SUCCEED:
            // let allBuses = [...action.payload.info];
            console.log('allBuses: ', action.payload.info);
            // infoArray = infoArray.length === 1 ? infoArray[0] : infoArray;
            // return Object.assign({}, state, { busesInfoProgress: false, trackingBusInfo: infoArray});
            return Object.assign({}, state, { busesInfoProgress: false, allBuses: action.payload.info });
        case actionsType.GET_BUSINFO_FAIL:
            return Object.assign({}, state, { busesInfoProgress: false, busesInfoErrorMessage: action.payload });



        case actionsType.ADD_ROUTE_PROGRESS:
            return Object.assign({}, state, { busesRoutesProgress: true });
        case actionsType.ADD_ROUTE_SUCCEED:
            return Object.assign({}, state, { busesRoutes: [...state.busesRoutes, action.payload.data], busesRoutesProgress: false });
        case actionsType.GET_BUSROUTES_FAIL:
            return Object.assign({}, state, { busesRoutesProgress: false, busesRoutesErrorMessage: action.payload });




        case actionsType.ADD_BUSINFO_PROGRESS:
            return Object.assign({}, state, { busesInfoProgress: true });
        case actionsType.ADD_BUSINFO_SUCCEED:
            return Object.assign({}, state, { busesRoutes: [...state.busesRoutes, action.payload.data], busesInfoProgress: false });
        case actionsType.ADD_BUSINFO_FAIL:
            return Object.assign({}, state, { busesRoutesProgress: false, busesRoutesErrorMessage: action.payload });





        case actionsType.UPDATE_ROUTE_PROGRESS:
            return Object.assign({}, state, { busesRoutesProgress: true });
        case actionsType.UPDATE_ROUTE_SUCCEED:
            let { busesRoutes } = state;
            for (let i = 0; i < busesRoutes.length; i++) {
                if (busesRoutes[i]._id === action.payload.data._id) {
                    busesRoutes[i] = action.payload.data;
                }
            }
            console.log('this is updated route', busesRoutes)
            return Object.assign({}, state, { busesRoutes, busesRoutesProgress: false });
        case actionsType.UPDATE_ROUTE_FAIL:
            return Object.assign({}, state, { busesRoutesProgress: false, busesRoutesErrorMessage: action.payload });




        case actionsType.UPDATE_BUS_INFO_PROGRESS:
            return Object.assign({}, state, { busesInfoProgress: true });
        case actionsType.UPDATE_BUS_INFO_SUCCEED:
            let busInfo = state.busesInfo;
            for (let i = 0; i < busInfo.length; i++) {
                if (busInfo[i]._id === action.payload.data._id) {
                    busInfo[i] = action.payload.data;
                }
            }
            console.log('this is updated route', busInfo);
            return Object.assign({}, state, { busesInfo: busInfo, busesInfoProgress: false });
        case actionsType.UPDATE_BUS_INFO_FAIL:
            return Object.assign({}, state, { busesInfoProgress: false, busesInfoErrorMessage: action.payload });



        case actionsType.DELETE_INFO_PROGRESS:
            return Object.assign({}, state, { busesInfoProgress: true });
        case actionsType.DELETE_INFO_SUCCEED:
            let busesInfo = state.busesInfo;
            let newBusesInfo = busesInfo.filter(data => data._id !== action.payload.data._id);
            return Object.assign({}, state, { busesInfo: newBusesInfo, busesInfoProgress: false });
        case actionsType.DELETE_INFO_FAIL:
            return Object.assign({}, state, { busesInfoProgress: false, busesInfoErrorMessage: action.payload });




        case actionsType.SET_EDIT_OBJ:
            let { editObj } = state;
            editObj.editFlag = action.payload.editFlag;
            editObj.bus = action.payload.bus;
            return Object.assign({}, state, { editObj: editObj });


        case actionsType.INFO_UPDATE_OBJ:
            let { infoUpdateObj } = state;
            infoUpdateObj.data = action.payload.data;
            infoUpdateObj.editFlag = action.payload.editFlag;
            return Object.assign({}, state, { infoUpdateObj });




        case actionsType.GET_BUSROUTE_PROGRESS:
            return Object.assign({}, state, { busesRoutesProgress: true });
        case actionsType.GET_BUSROUTE_SUCCEED:
            return Object.assign({}, state, { busesRoutes: action.payload, busesRoutesProgress: false });
        case actionsType.GET_BUSROUTES_FAIL:
            return Object.assign({}, state, { busesRoutesProgress: false, busesInfoErrorMessage: action.payload });




        case actionsType.DELETE_ROUTE_PROGRESS:
            return Object.assign({}, state, { busesRoutesProgress: true });
        case actionsType.DELETE_ROUTE_SUCCEED:
            let routes = state.busesRoutes;
            let newRoutes = routes.filter(data => data._id !== action.payload.data._id);
            return Object.assign({}, state, { busesRoutes: newRoutes, busesRoutesProgress: false });
        case actionsType.DELETE_ROUTE_FAIL:
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



        case actionsType.SET_ADMIN_FLAG:
            return Object.assign({}, state, { adminFlag: true });
        case actionsType.SET_ADMIN_FLAG:
            return Object.assign({}, state, { adminFlag: false });

        default:
            return state;
    }
};