import axios from 'axios'
import {Toast}from 'antd-mobile'
import { getTokenInfo } from './storage'
import history from '@/history'
// 1. 创建新的 axios 实例
const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout:5000
})

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use(config => {

  const token = getTokenInfo().token
  if(token){
    config.headers['Authorization'] = 'Bearer '+token
  }
  
  return config
})

http.interceptors.response.use(response => {
  return response.data
}, error => {
  // console.log(error);

  if(error.response){
    Toast.show({
      content:error.response.data.message
    })
    if(error.response.status===401){
      // console.log('回退登录页面');
      history.push('/login',{pathfrom:history.location})
      
    }

  }else{
    Toast.show({
      content:"网络繁忙，请稍后重试"
    })
  }
  
  return Promise.reject(error)
})

// 3. 导出该 axios 实例
export default http