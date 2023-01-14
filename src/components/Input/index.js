import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
export default function Input({extra,className,autoFocus,onExtraClick,...rest}) {
    // console.log(rest);
    const inputRef =  useRef(null)
    useEffect(()=>{
      if(autoFocus){
        inputRef.current.focus()
      }
      
    },[autoFocus])
    
  return (
    <div className={styles.root}>
        <input ref={inputRef} {...rest}  className={classnames('input',className)} type="text" />
        <div className='extra'
        onClick={onExtraClick}
        >{extra}</div>
    </div>
  )
}
