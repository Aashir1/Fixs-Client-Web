import actionsType from '../actionTypes';


export default class AppActions {

    static updateNavbar(obj) {
        return {
            type: actionsType.UPDATE_NAVBAR,
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

}