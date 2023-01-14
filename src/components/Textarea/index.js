import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
export default function Textarea({ maxLength, className, ...rest }) {
  const [value, setValue] = useState(rest.value||'');
  const onChange = (e)=>{
    setValue(e.target.value)
    // 要把值通过props给父组件，父组件要提交
    if(rest.onChange){
        rest.onChange?.(e.target.value)
    }
  }
  const texRef = useRef(null)
  useEffect(()=>{
    texRef.current.focus()
    texRef.current.setSelectionRange(-1,-1)
  },[])
  return (
    <div className={styles.root}>
      <textarea
        ref={texRef}
        className={classNames("textarea", className)}
        maxLength={maxLength}
        {...rest}
       
        value={value}
        onChange={onChange}
      />

      <div className="count">
        {value.length}/{maxLength}
      </div>
    </div>
  );
}
