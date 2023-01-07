import React from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
export default function Input({extra,className,onExtraClick,...rest}) {
    // console.log(rest);
    
  return (
    <div className={styles.root}>
        <input  {...rest} className={classnames('input',className)} type="text" />
        <div className='extra'
        onClick={onExtraClick}
        >{extra}</div>
    </div>
  )
}
