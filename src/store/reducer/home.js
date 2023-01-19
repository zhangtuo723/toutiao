import {SETUSERCHANNELS,SETALLCHANNELS,SETARTICLELIST} from '@/store/action_types/home'
export default function reducer(state={userChannels:[],allChannels:[],articles:{}},action){
    switch(action.type){
        case SETUSERCHANNELS:
            return {...state,userChannels:action.payload}
        case SETALLCHANNELS:
            return {...state,allChannels:action.payload}
        case SETARTICLELIST:
           
            return {...state,articles:{
                ...state.articles,
                [action.payload.channelId]:{timestamp:action.payload.timestamp,list:action.payload.list}
            }}
        default:
            return state
    }
    
}