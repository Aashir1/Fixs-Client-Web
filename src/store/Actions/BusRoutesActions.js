import actionsType from '../actionTypes';


export default class BusRoutesActions {

    static getBusRoutes(obj) {
        return {
            type: actionsType.GET_BUSROUTE_PROGRESS
        }
    }
    static deleteRoute(id) {
        return {
            type: actionsType.DELETE_ROUTE_PROGRESS,
            payload: id
        }
    }

    static setEditObj(obj) {
        return {
            type: actionsType.SET_EDIT_OBJ,
            payload: obj
        }
    }

}