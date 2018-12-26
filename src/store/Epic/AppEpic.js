import actionsType from '../actionTypes';
import HttpService from '../service/httpService';
import { Observable } from 'rxjs';
const fcmKey = 'key=AAAAsIjTuDY:APA91bH1XhBCp_7skWwFtLOYaqqoMCy--qw8Vy_67LUo1i176YAr3iXQuQtuOxrc34h7gwADHMJDnvsi6wT9V04YLp3-244TBanBqB9IFWxf2-UhxFq6AcdsyT3OwGqzZrSbjoNboNIY'
export default class AppEpic {

    static subscribeToTopic($action) {
        return $action.ofType(actionsType.SUBSCRIBE_TO_TOPIC).switchMap(({ payload }) => {
            return HttpService.post(`https://iid.googleapis.com/iid/v1/${payload}/rel/topics/all`, {}, fcmKey)
                .pluck('response')
                .map(data => {
                    return {
                        type: null
                    }
                })
                .catch(error => {
                    console.log('topic subscription error: ', error.message);
                })
        })
    }
}