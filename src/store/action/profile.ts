import request from '@/utils/request'

import { Dispatch } from 'redux'
import {SAVE_USER,SAVE_PROFILE,LOGOUT} from '../action_types/profile'
import {ProfileAction,User,Profile} from '../reducer/profile'


export const saveUser = (payload:{data:User}):ProfileAction=>{
    
    
    return {
        type:SAVE_USER,
        payload
    }
}

export const saveProfile = (payload:{data:Profile}):ProfileAction=>{
    
    return {
        
        type:SAVE_PROFILE,
        payload
    }
}

export const getUser = ()=>{
    return async (dispatch:Dispatch)=>{
        
        const res = await request({
            url:'/user',
            method:'get'
        })
        
        dispatch(saveUser(res))
    }
}

export const getprofile = ()=>{
    return async (dispatch:Dispatch)=>{
        const res = await request({
            url:'/user/profile',
            method:'get'
        })
        dispatch(saveProfile(res))
        
    }
}
// 返回变成可选类型
type PartialProfile = Partial<Profile>
export const updateProfile = (data:PartialProfile)=>{
    return async (dispatch:any)=>{
        await request({
            url:'/user/profile',
            method:'PATCH',
            data
        })
        dispatch(getprofile())
        
       
    }
}



export const updatePhoto = (data:FormData)=>{
    return async (dispatch:any)=>{
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