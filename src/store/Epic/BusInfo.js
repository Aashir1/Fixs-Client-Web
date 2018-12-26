import actionsType from '../actionTypes';
import HttpService from '../service/httpService';
import { Observable } from 'rxjs';

const baseURL = 'https://warm-thicket-69046.herokuapp.com';


let header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEyMzQiLCJlbWFpbCI6InRlc3QxMjM0QG1haWwuY29tIiwiaWF0IjoxNTQzMDgyOTYxfQ.R9Y0r_Zx_gY4E2nolwQzwR-AqokFZwxAHduy9ordxfg';
export default class BusInfo {
    static getBusInfo($action) {
        return $action.ofType(actionsType.GET_BUSINFO_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.get(`${baseURL}/businfo/?page=${payload}`, header)
                    .pluck('response')
                    .map(data => {
                        console.log("from bus info epic: ", data);
                        return {
                            type: actionsType.GET_BUSINFO_SUCCEED,
                            payload: data
                        }
                    })
                    .catch(err => {
                        return Observable.of({
                            type: actionsType.GET_BUSINFO_FAIL,
                            payload: err.message
                        })
                    })
            })
    }

    static getETAInfo($action) {
        return $action.ofType(actionsType.GET_ETAINFO_PROGRESS)
            .switchMap(({ payload }) => {
                // alert('eta chala')
                return HttpService.post(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${payload.origin}&destinations=${payload.des}&key=AIzaSyDDmyFwVLZ7Fys0sWTDMxa7h_Dyy79BXuM`)
                    .pluck('response')
                    .map((data) => {
                        console.log("ETA info: ", data);
                        return {
                            type: actionsType.GET_ETAINFO_SUCCEED,
                            payload: data.rows[0].elements[0]
                        }
                    })
                    .catch(err => {
                        return Observable.of({
                            type: actionsType.GET_ETAINFO_FAIL,
                            payload: err.message
                        })
                    })
            })
    }

    static updateBusInfo($action) {
        return $action.ofType(actionsType.UPDATE_BUS_INFO_PROGRESS).switchMap(({ payload }) => {
            return HttpService.post(`${baseURL}/businfo/update`, payload, header)
                .pluck('response')
                .map(data => {
                    console.log("data: ", data);
                    return {
                        type: actionsType.UPDATE_BUS_INFO_SUCCEED,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.UPDATE_BUS_INFO_FAIL,
                        payload: error.message
                    })
                })
        })
    }

    static addBusInfo($action) {
        return $action.ofType(actionsType.ADD_BUSINFO_PROGRESS).switchMap(({ payload }) => {
            return HttpService.post(`${baseURL}/businfo/add`, payload, header)
                .pluck('response')
                .map((data) => {
                    console.log("added bus info: ", data);
                    return {
                        type: actionsType.ADD_BUSINFO_SUCCEED,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.ADD_BUSINFO_FAIL,
                        payload: error.message
                    })
                })
        })
    }

    static deleteInfo($action) {
        return $action.ofType(actionsType.DELETE_INFO_PROGRESS).switchMap(({ payload }) => {
            return HttpService.post(`${baseURL}/businfo/delete/${payload}`, {}, header)
                .pluck('response')
                .map(data => {
                    console.log("data: ", data);
                    return {
                        type: actionsType.DELETE_INFO_SUCCEED,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.DELETE_INFO_FAIL,
                        payload: error.message
                    })
                })
        })
    }

    static getAllBuses($action) {
        return $action.ofType(actionsType.GET_ALL_BUSES_PROGRESS).switchMap(({ payload }) => {
            return HttpService.get(`${baseURL}/businfo/all`, header)
                .pluck('response')
                .map(data => {
                    console.log("data: ", data);
                    return {
                        type: actionsType.GET_ALL_BUSES_SUCCEED,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.GET_ALL_BUSES_FAIL,
                        payload: error.message
                    })
                })
        })
    }
}