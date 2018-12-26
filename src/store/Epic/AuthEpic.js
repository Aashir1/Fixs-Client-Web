import actionsType from '../actionTypes';
import HttpService from '../service/httpService';
import { Observable } from 'rxjs';

const baseURL = 'https://warm-thicket-69046.herokuapp.com';

export default class AuthEpic {
    static login($action) {
        console.log('epic is running');
        return $action.ofType(actionsType.LOGIN_PROGRESS).switchMap(({ payload }) => {
            console.log('comming till there', payload);
            return HttpService.post(`${baseURL}/signIn`, payload)
                .pluck('response')
                .map(data => {
                    localStorage.setItem('user', JSON.stringify(data));
                    // store.dispatch(push('/home'));
                    return {
                        type: actionsType.LOGIN_SUCCEED,
                        payload: data
                    }
                })
                .catch(err => {
                    return Observable.of({
                        type: actionsType.LOGIN_FAIL,
                        payload: err.response ? err.response.error : err.message
                    });
                })
        })
    }

    static signUp($action) {
        return $action.ofType(actionsType.SIGNUP_PROGRESS).switchMap(({ payload }) => {
            return HttpService.post(`${baseURL}/signUp`, payload)
                .pluck('response')
                .map(data => {
                    localStorage.setItem('user', JSON.stringify(data));
                    console.log("data from signUp: ", data);
                    return {
                        type: actionsType.SIGNUP_SUCCEED,
                        payload: data
                    }
                })
                .catch(err => {
                    console.log(err);
                    return Observable.of({
                        type: actionsType.SIGNUP_FIAL,
                        payload: err.response ? err.response.error : err.message
                    })
                })
        })
    }

    static changePassword($action) {
        return $action.ofType(actionsType.CHANGE_PASSWORD_PROGRESS).switchMap(({ payload }) => {
            return HttpService.post(`${baseURL}/changepassword`, payload)
                .pluck('response')
                .map(data => {
                    console.log("change password: ", data);
                    return {
                        type: actionsType.CHANGE_PASSWORD_SUCCEED,
                        payload: data
                    }
                })
                .catch(error => {
                    return Observable.of({
                        type: actionsType.CHANGE_PASSWORD_FAIL,
                        payload: error.message
                    })
                })
        })
    }
    // static signOut($action) {
    //     return $action.ofType(actionsType.SIGNOUT_PROGRESS).switchMap(({ payload }) => {
    //         return HttpService.post('http://192.168.43.11:8080/signout')
    //             .pluck('response')
    //             .map(data => {
    //                 localStorage.setItem('user', JSON.stringify(null));
    //                 return {
    //                     type: actionsType.SIGNOUT_PROGRESS,
    //                     payload: true
    //                 }
    //             })
    //     })
    // }
}