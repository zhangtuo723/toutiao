import axios, { AxiosError } from "axios";
import { Toast } from "antd-mobile";
import { getTokenInfo, setTokenInfo } from "./storage";
import history from "@/history";
import store from "@/store";
import { saveToken } from "@/store/action/login";
import { logout } from "@/store/action/profile";
const baseUrl = "http://geek.itheima.net/v1_0"
// 1. 创建新的 axios 实例
const http = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
});

// 2. 设置请求拦截器和响应拦截器
http.interceptors.request.use((config:any ) => {
  const token = getTokenInfo().token;
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error:AxiosError<{message:string}>) => {
    // console.log(error);
    
    
    if(!error.response){
      Toast.show({
        content: "网络繁忙，请稍后重试",
      });
      return Promise.reject(error);
    }

    if(error.response.status !== 401){
      Toast.show({
        content: error.response.data.message,
      });
      return Promise.reject(error);
    }

    // 401 错误
    const {refresh_token} = getTokenInfo()
    // 没有刷新token就去登录
    if(!refresh_token){
      history.replace('/login',{pathfrom:history.location.pathname})
      return Promise.reject(error);
    }
    // 有刷新token，发请求，但是不能使用当前的这个http实例,直接用axios

    try {
      const res= await axios({
        method:'put',
        url: baseUrl+'/authorizations',
        headers:{Authorization:'Bearer '+ refresh_token}
      })
     
      const tokenInfo = {token:res.data.data.token,refresh_token}
      // 保存redux
      store.dispatch(saveToken(tokenInfo))
      // 保存本地
      setTokenInfo(tokenInfo)
      // token 刷新后需要重新发送一次之前的请求 error里面的config 就是请求的参数
      // 这时候就不返回错误了
      
      return http(error.config!)


    } catch (error) {
      store.dispatch(logout())
      history.replace('/login',{pathfrom:history.location.pathname})
      return Promise.reject(error)
    }


    
  }
);

// 3. 导出该 axios 实例
export default http;
