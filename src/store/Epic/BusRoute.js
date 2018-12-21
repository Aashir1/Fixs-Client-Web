import actionsType from '../actionTypes';
import HttpService from '../service/httpService';
import { Observable } from 'rxjs';
let header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEyMzQiLCJlbWFpbCI6InRlc3QxMjM0QG1haWwuY29tIiwiaWF0IjoxNTQzMDgyOTYxfQ.R9Y0r_Zx_gY4E2nolwQzwR-AqokFZwxAHduy9ordxfg';
const baseURL = 'https://warm-thicket-69046.herokuapp.com';

export default class BusRouteEpic {

    static getBusRoutes($action) {
        console.log('epic is running');
        return $action.ofType(actionsType.GET_BUSROUTE_PROGRESS).switchMap(({ }) => {
            return HttpService.get(`${baseURL}/busesroutes`, header)
                .pluck('response')
                .map(data => {
                    // localStorage.setItem('user', JSON.stringify(data));
                    // store.dispatch(push('/home'));
                    console.log('BusRoute: ', data);
                    return {
                        type: actionsType.GET_BUSROUTE_SUCCEED,
                        payload: data.data
                    }
                })
                .catch(err => {
                    return Observable.of({
                        type: actionsType.GET_BUSROUTES_FAIL,
                        payload: err
                    });
                })
        })
    }

    static addRoute($action) {
        return $action.ofType(actionsType.ADD_ROUTE_PROGRESS).switchMap(({ payload }) => {
            return HttpService.post(`${baseURL}/busroute/add`, payload, header)
                .pluck('response')
                .map((data) => {
                    console.log("added bus route: ", data);
                    return {
                        type: actionsType.ADD_ROUTE_SUCCEED,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.ADD_ROUTE_FAIL,
                        payload: error.message
                    })
                })
        })
    }

    static updateRoute($action) {
        return $action.ofType(actionsType.UPDATE_ROUTE_PROGRESS).switchMap(({ payload }) => {
            return HttpService.post(`${baseURL}/busroute/update`, payload, header)
                .pluck('response')
                .map(data => {
                    console.log("data: ", data);
                    return {
                        type: actionsType.UPDATE_ROUTE_SUCCEED,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.UPDATE_ROUTE_FAIL,
                        payload: error.message
                    })
                })
        })
    }

    static deleteRoute($action) {
        return $action.ofType(actionsType.DELETE_ROUTE_PROGRESS).switchMap(({ payload }) => {
            return HttpService.post(`${baseURL}/busroute/delete/${payload}`, {}, header)
                .pluck('response')
                .map(data => {
                    console.log("data: ", data);
                    return {
                        type: actionsType.DELETE_ROUTE_SUCCEED,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.DELETE_ROUTE_FAIL,
                        payload: error.message
                    })
                })
        })
    }

}