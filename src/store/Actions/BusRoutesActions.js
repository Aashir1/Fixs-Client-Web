import actionsType from '../actionTypes';


export default class BusRoutesActions {

    static getBusRoutes(obj) {
        return {
            type: actionsType.GET_BUSROUTE_PROGRESS
        }
    }

}