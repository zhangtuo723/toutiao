
import {SAVE_USER,SAVE_PROFILE} from '../action_types/profile'

const initValue = {
    user:{},
    profile:{}
}

export default function reducer(state=initValue,action){
    if(action.type===SAVE_USER){
        return {...state,user:action.payload.data}
    }else if(action.type===SAVE_PROFILE){
        return {...state,profile:action.payload.data}
    }else if(action.type==='profile/logout'){
        return {
            user:{},
            profile:{}
        }
    }
    return state
}