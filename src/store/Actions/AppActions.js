import actionsType from '../actionTypes';


export default class AppActions {

    static updateNavbar(obj) {
        return {
            type: actionsType.UPDATE_NAVBAR,
            payload: obj
        }
    }

    static getAllBuses() {
        return {
            type: actionsType.GET_ALL_BUSES_PROGRESS
        }
    }


    static deleteInfo(id) {
        return {
            type: actionsType.DELETE_INFO_PROGRESS,
            payload: id
        }
    }

    static updateBusInfo(obj) {
        return {
            type: actionsType.UPDATE_BUS_INFO_PROGRESS,
            payload: obj
        }
    }

    static infoUpdateObj(obj) {
        return {
            type: actionsType.INFO_UPDATE_OBJ,
            payload: obj
        }
    }

    static getBusInfo(page) {
        return {
            type: actionsType.GET_BUSINFO_PROGRESS,
            payload: page
        }
    }

    static getETAInfo(obj) {
        return {
            type: actionsType.GET_ETAINFO_PROGRESS,
            payload: obj
        }
    }

    static setAdminFlag() {
        return {
            type: actionsType.SET_ADMIN_FLAG
        }
    }

    static resetAdminFlag() {
        return {
            type: actionsType.RESET_ADMIN_FLAG
        }
    }

    static addRoute(obj) {
        return {
            type: actionsType.ADD_ROUTE_PROGRESS,
            payload: obj
        }
    }

    static updateRoute(obj) {
        return {
            type: actionsType.UPDATE_ROUTE_PROGRESS,
            payload: obj
        }
    }

    static addBusInfo(obj) {
        return {
            type: actionsType.ADD_BUSINFO_PROGRESS,
            payload: obj
        }
    }

}