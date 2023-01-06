import React from "react";
import NavBar from "@/components/NavBar";
import sytles from './index.module.scss'
import Input from '@/components/Input'
export default function Login(props) {

  const onExtraClick = ()=>{
    console.log(1);
  }
 
  
  return (
    <div className={sytles.root}>
      {/* 导航栏 */}
      <NavBar>登录</NavBar>
     {/* 内容 */}
     <div className="content" >
     <h3>短信登录</h3>
        <form>
          <div className="input-item">
          <Input placeholder='请输入手机号' extra='获取验证吗' onExtraClick={onExtraClick}></Input>
          <div className="validate">验证码错误</div>
          </div>
          <div className="input-item">
          <Input></Input>
          <div className="validate">验证码错误</div>
          </div>
        
          
          <button type="submit" className="login-btn">
            登录
          </button>

        </form>

     </div>
     
    </div>
  );
}
