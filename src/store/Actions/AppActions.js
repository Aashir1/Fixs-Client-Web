import actionsType from '../actionTypes';


export default class AppActions{
    
    static updateNavbar(obj){
        return{
            type: actionsType.UPDATE_NAVBAR,
            payload: obj
        }
    }

}