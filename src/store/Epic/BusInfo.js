import actionsType from '../actionTypes';
import HttpService from '../service/httpService';
import { Observable } from 'rxjs';

let header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEyMzQiLCJlbWFpbCI6InRlc3QxMjM0QG1haWwuY29tIiwiaWF0IjoxNTQzMDgyOTYxfQ.R9Y0r_Zx_gY4E2nolwQzwR-AqokFZwxAHduy9ordxfg';
export default class BusInfo {
    static getBusInfo($action) {
        return $action.ofType(actionsType.GET_BUSINFO_PROGRESS)
            .switchMap(({ payload }) => {
                return HttpService.get(`http://localhost:8080/businfo/?page=${payload}`, header)
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
}