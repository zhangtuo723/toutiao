import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
export default function NotFound() {
    const [time,setTime] = useState(3)
    const navigate = useNavigate()
    const timer = useEffect(()=>{
        setTimeout(()=>{
            
            setTime(state=>{
                return state-1
            })
            
        },1000)
        if(time===0){
            clearTimeout(timer)
            navigate('/home')
        }

    },[navigate,time])
  return (
    <div>
        <h1>对不起，你访问的内容不存在...</h1>
        <p>
            {time}秒后返回 <Link to='/home'>首页</Link>
        </p>

    </div>
  )
}
