import React from "react";
import Icon from "@/components/icon";
import './index.scss'
export default function Login() {
  return (
    <div>
      <h1>我是登录</h1>
      {/* <Icon type={"icon-mianxingfeizhunan"} className='big'></Icon> */}
      {/* 这是个组件不是标签，没有事件委托 */}
      <Icon type={"iconfanhui"} className='big' onClick={()=>{alert('hahah')}}></Icon>
    </div>
  );
}
