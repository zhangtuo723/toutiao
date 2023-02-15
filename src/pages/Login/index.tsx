import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import sytles from "./index.module.scss";
import Input from "@/components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

import { Toast } from "antd-mobile";

// const validate  = values => {
//   const errors = {};
//   if (!values.mobile) {
//     errors.mobile = 'Required';
//   } else if(!/^1[23578][0-9]{9}$/.test(values.mobile)){
//     errors.mobile = '格式有误'
//   }
//   if (!values.code) {
//     errors.code = 'Required';
//   } else if (!/^\d{6}$/.test(values.code)) {
//     errors.code = '格式有误';
//   }
//   // console.log(values.code);
//   // console.log(errors);

//   return errors;
// };
import { useDispatch } from "react-redux";

import { login, sendCode } from "@/store/action/login";
import { useLocation, useNavigate } from "react-router-dom";





export default function Login() {
  const [time, setTime] = useState(0);
  const dispatch:any = useDispatch(); //不知道怎么搞 这里配合ts貌似要重构uesDispatch
  const navigate = useNavigate();
  const location = useLocation()





  const onExtraClick = async () => {
    if (time > 0) {
      return;
    }
    //先验证
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      formik.setTouched({
        mobile: true,
      });
      return;
    }

    await dispatch(sendCode(mobile));

    Toast.show({
      content: "发送成功",
      maskClickable: false,
    });
    setTime(6);
    const clt = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(clt);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  };

  const formik = useFormik({
    initialValues: {
      mobile: "13911111111",
      code: "246810",
    },
    // validate,
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("手机号不能为空")
        .matches(/^1[3-9]\d{9}$/, "手机号格式错误"),
      code: Yup.string()
        .required("验证码不能为空")
        .matches(/^\d{6}$/, "验证码格式有误"),
    }),
    onSubmit: async (values) => {
      await dispatch(login(values.mobile, values.code));
      Toast.show({
        content: "登录成功",
      });
      // 跳转首页
    
      if (location.state){
        navigate(location.state.pathfrom,{replace:true})
     
        
      }else{
        navigate('/home')
      }
      // navigate('/home')
      // navigate(-1)
    },
  });

  const {
    values: { mobile, code },
    handleChange,
    handleSubmit,
    errors,
  } = formik;

  return (
    <div className={sytles.root}>
      {/* 导航栏 */}
      <NavBar onLeftClick={()=>{navigate(-1)}}>登录</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登录</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              name="mobile"
              placeholder="请输入手机号"
              value={mobile}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            ></Input>
            {/* {errors.mobile?} */}
            <div className="validate">
              {formik.touched.mobile ? errors.mobile : ""}
            </div>
          </div>
          <div className="input-item">
            <Input
              name="code"
              placeholder="请输入手机号"
              extra={time === 0 ? "获取验证码" : time + "s"}
              onExtraClick={onExtraClick}
              value={code}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            ></Input>
            <div className="validate">
              {formik.touched.code ? errors.code : ""}
            </div>
          </div>

          <button
            type="submit"
            className={classNames("login-btn", { disabled: !formik.isValid })}
            disabled={!formik.isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  );
}
