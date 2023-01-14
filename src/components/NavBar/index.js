import React from 'react'
import Icon from "@/components/icon";
import styles from './index.module.scss'
import classNames from 'classnames';



export default function NavBar({children,extra,onLeftClick,className}) {

 

  return (
    <div className={classNames(styles.root,className)}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={onLeftClick}/>
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}
