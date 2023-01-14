import request from '@/utils/request'
import {SAVE_USER,SAVE_PROFILE,LOGOUT} from '../action_types/profile'

export const saveUser = (payload)=>{
    
    return {
        type:SAVE_USER,
        payload
    }
}

export const saveProfile = (payload)=>{
    
    return {
        type:SAVE_PROFILE,
        payload
    }
}

export const getUser = ()=>{
    return async (dispatch)=>{
        const res = await request({
            url:'/user',
            method:'get'
        })
        
        dispatch(saveUser(res))
    }
}

export const getprofile = ()=>{
    return async (dispatch)=>{
        const res = await request({
            url:'/user/profile',
            method:'get'
        })
        dispatch(saveProfile(res))
        
    }
}

export const updateProfile = (data)=>{
    return async (dispatch)=>{
        await request({
            url:'/user/profile',
            method:'PATCH',
            data
        })
        dispatch(getprofile())
        
       
    }
}

export const updatePhoto = (data)=>{
    return async (dispatch)=>{
         await request({
            url:'/user/photo',
            method:'patch',
            data
        })
        dispatch(getprofile())
        
    }
}

export const logout = ()=>{
    return {
        type:LOGOUT,
    }
}