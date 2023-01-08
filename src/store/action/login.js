import request from '@/utils/request'
import {setTokenInfo} from '@/utils/storage'
export const sendCode = (mobile)=>{
    return async (dispatch)=>{
         await request({
            url:"/sms/codes/"+mobile,
            method:'get'
        })
    }
}


export const saveToken = (payload)=>{
    return {
        type:'login/token',
        payload
    }
}


export const login = (mobile,code)=>{

    return async (dispatch)=>{
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