import {SETUSERCHANNELS} from '@/store/action_types/home'
export default function reducer(state={userChannels:[]},action){
    switch(action.type){
        case SETUSERCHANNELS:
            return {...state,userChannels:action.payload}
        default:
            return state
    }
    
}