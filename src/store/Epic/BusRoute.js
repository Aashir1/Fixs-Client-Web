import actionsType from '../actionTypes';
import HttpService from '../service/httpService';
import { Observable } from 'rxjs';
let header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEyMzQiLCJlbWFpbCI6InRlc3QxMjM0QG1haWwuY29tIiwiaWF0IjoxNTQzMDgyOTYxfQ.R9Y0r_Zx_gY4E2nolwQzwR-AqokFZwxAHduy9ordxfg';
const baseURL = 'https://warm-thicket-69046.herokuapp.com';
// const baseURL = 'http://localhost:8080';

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
            let { wayPoint } = payload;
            return HttpService.post(`https://maps.googleapis.com/maps/api/directions/json?origin=${wayPoint[0].lat},${wayPoint[0].lng}&destination=${wayPoint[wayPoint.length - 1].lat},${wayPoint[wayPoint.length - 1].lng}&waypoints=${wayPoint[1].lat},${wayPoint[1].lng}|${wayPoint[2].lat},${wayPoint[2].lng}|${wayPoint[3].lat},${wayPoint[3].lng}|${wayPoint[4].lat},${wayPoint[4].lng}|${wayPoint[5].lat},${wayPoint[5].lng}|${wayPoint[6].lat}, ${wayPoint[6].lng}|${wayPoint[7].lat},${wayPoint[7].lng}|${wayPoint[8].lat},${wayPoint[8].lng}&key=AIzaSyDDmyFwVLZ7Fys0sWTDMxa7h_Dyy79BXuM`)
                // return HttpService.post(`${baseURL}/busroute/add`, payload, header)
                .pluck('response')
                .map((response) => {
                    console.log("added bus route: ", response);
                    return response;
                })
                .switchMap((data) => {
                    console.log("response comming from google API: ", data)
                    let obj = {
                        busName: payload.busName,
                        wayPoint: wayPoint,
                        route: data.routes[0].overview_polyline.points
                    }
                    console.log("way point checking: ", obj);
                    return HttpService.post(`${baseURL}/busroute/add`, obj, header)
                        .pluck('response')
                        .map(doc => {
                            return {
                                type: actionsType.ADD_ROUTE_SUCCEED,
                                payload: doc
                            }
                        })
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.ADD_ROUTE_FAIL,
                        payload: error.message
                    })
                })
        })
    }

    // static updateRoute($action) {
    //     return $action.ofType(actionsType.UPDATE_ROUTE_PROGRESS).switchMap(({ payload }) => {
    //         return HttpService.post(`${baseURL}/busroute/update`, payload, header)
    //             .pluck('response')
    //             .map(data => {
    //                 console.log("data: ", data);
    //                 return {
    //                     type: actionsType.UPDATE_ROUTE_SUCCEED,
    //                     payload: data
    //                 }
    //             })
    //             .catch(error => {
    //                 return Observable.of({
    //                     type: actionsType.UPDATE_ROUTE_FAIL,
    //                     payload: error.message
    //                 })
    //             })
    //     })
    // }

    static updateRoute($action) {
        return $action.ofType(actionsType.UPDATE_ROUTE_PROGRESS).switchMap(({ payload }) => {
            let { wayPoint } = payload;
            return HttpService.post(`https://maps.googleapis.com/maps/api/directions/json?origin=${wayPoint[0].lat},${wayPoint[0].lng}&destination=${wayPoint[wayPoint.length - 1].lat},${wayPoint[wayPoint.length - 1].lng}&waypoints=${wayPoint[1].lat},${wayPoint[1].lng}|${wayPoint[2].lat},${wayPoint[2].lng}|${wayPoint[3].lat},${wayPoint[3].lng}|${wayPoint[4].lat},${wayPoint[4].lng}|${wayPoint[5].lat},${wayPoint[5].lng}|${wayPoint[6].lat}, ${wayPoint[6].lng}|${wayPoint[7].lat},${wayPoint[7].lng}|${wayPoint[8].lat},${wayPoint[8].lng}&key=AIzaSyDDmyFwVLZ7Fys0sWTDMxa7h_Dyy79BXuM`)
                // return HttpService.post(`${baseURL}/busroute/add`, payload, header)
                .pluck('response')
                .map((response) => {
                    console.log("added bus route: ", response);
                    return response;
                })
                .switchMap((data) => {
                    let obj = {
                        busName: payload.busName,
                        wayPoint: wayPoint,
                        route: data.routes[0].overview_polyline.points,
                        id: payload.id
                    }
                    console.log("way point checking: ", obj);
                    return HttpService.post(`${baseURL}/busroute/update`, obj, header)
                        .pluck('response')
                        .map(doc => {
                            console.log("data: ", doc);
                            return {
                                type: actionsType.UPDATE_ROUTE_SUCCEED,
                                payload: doc
                            }
                        })
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