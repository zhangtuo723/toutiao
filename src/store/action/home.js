import request from '@/utils/request'
import {SETUSERCHANNELS} from '@/store/action_types/home'
export const setUserChannels = (payload)=>{
    return {
        type:SETUSERCHANNELS,
        payload
    }
}

export const getUserChannels = ()=>{
    return async (dispatch)=>{
       const res =  await request({
            url:"/channels",
            method:'get',

        })
        dispatch(setUserChannels(res.data.channels))
    }
}