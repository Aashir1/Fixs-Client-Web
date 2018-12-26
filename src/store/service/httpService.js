import { Observable } from 'rxjs';
// import 'rxjs/add/observable/dom/ajax';

// https://xgrommx.github.io/rx-book/content/rxjs_bindings/dom/index.html#rxdomrequestgetjsonurl
// https://github.com/ReactiveX/rxjs/blob/master/src/observable/dom/AjaxObservable.ts
export default class HttpService {

    static get(url, authToken) {
        let headerObj = {
            'Content-Type': 'application/json',
            'Authorization': authToken
        }
        return Observable.ajax({
            url,
            method: 'GET',
            headers: headerObj,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // get

    static post(url, body, headers) {
        let headerObj = {
            'Content-Type': 'application/json',
        }
        if (headers) {
            headerObj['Authorization'] = headers;
        }
        return Observable.ajax({
            url,
            method: 'POST',
            body,
            headers: headerObj,
            async: true,
            crossDomain: true,
            responseType: 'json',
            createXHR: () => new XMLHttpRequest()
        });
    } // post
}