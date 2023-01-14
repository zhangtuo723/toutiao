import React, { useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import Textarea from '@/components/Textarea'
import Input from '@/components/Input'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '@/store/action/profile'
import { Toast } from 'antd-mobile'
export default function EditInput({onCloseP,type}) {
  
  
  const defaultValue = useSelector(state=>{
    
    return state.profile.profile[type]
  })
  const [name,setName] = useState(defaultValue)
  const dispatch = useDispatch()
  const onCommit = async (type,value)=>{
    await dispatch(updateProfile({[type]:value}))
    Toast.show('修改成功')
    onCloseP()
  }

  return (
    <div className={styles.root}>
        <NavBar extra={<span className='commit-btn' onClick={()=>{onCommit(type,name)}}>提交</span>} onLeftClick={onCloseP} >
          编辑{type==='name'?'昵称':'简介'}
        </NavBar>
        <div className="content">
        <h3>{type==='name'?'昵称':'简介'}</h3>
        {
          
          type==='name'? <Input value={name} onChange={(e)=>{setName(e.target.value)}} autoFocus={true}></Input>:
          <Textarea maxLength={200} placeholder='请输入昵称' value={name} onChange={(v)=>{setName(v)}}></Textarea>
        }
        </div>
        
        

        
        
    </div>
  )
}
