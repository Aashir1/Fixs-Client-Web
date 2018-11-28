import actionsType from '../actionTypes';
import HttpService from '../service/httpService';
import { Observable } from 'rxjs';
let header = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDEyMzQiLCJlbWFpbCI6InRlc3QxMjM0QG1haWwuY29tIiwiaWF0IjoxNTQzMDgyOTYxfQ.R9Y0r_Zx_gY4E2nolwQzwR-AqokFZwxAHduy9ordxfg';
export default class BusRouteEpic {

    static getBusRoutes($action) {
        console.log('epic is running');
        return $action.ofType(actionsType.GET_BUSROUTE_PROGRESS).switchMap(({ }) => {
            return HttpService.get(`http://localhost:8080/busesroutes`, header)
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

}