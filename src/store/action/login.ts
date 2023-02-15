import request from '@/utils/request'
import {setTokenInfo} from '@/utils/storage'
import {Dispatch } from 'redux'

export const sendCode = (mobile:string) =>{
    return async (dispatch:Dispatch)=>{
         await request({
            url:"/sms/codes/"+mobile,
            method:'get'
        })
    }
}


export const saveToken = (payload:any)=>{
    return {
        type:'login/token',
        payload
    }
}


export const login = (mobile:string,code:string):any=>{

    return async (dispatch:Dispatch)=>{
        const res =  await request({
            url:'/authorizations',
            method:'post',
            data:{
                mobile,code
            }
        })
        
        // 保存token到redux中
        dispatch(saveToken(res.data))
        // 保存到本地
        setTokenInfo(res.data)
    }
}

