import React from 'react'
import styles from './index.module.scss'
export default function Input({extra,onExtraClick,...rest}) {
    // console.log(rest);
    
  return (
    <div className={styles.root}>
        <input  {...rest} className='input' type="text" />
        <div className='extra'
        onClick={onExtraClick}
        >{extra}</div>
    </div>
  )
}
