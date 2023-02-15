import React, {
  // HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useEffect,
  useRef,
} from "react";
import styles from "./index.module.scss";
import classnames from "classnames";

// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//   extra?:string|React.ReactElement
//   className?:string
//   autoFocus?:boolean
//   onExtraClick?:()=>void
// }

type Props =Omit< InputHTMLAttributes<HTMLInputElement>,'autoFocus'> & {
    extra?:string|React.ReactElement
    className?:string
    autoFocus?:boolean
    onExtraClick?:()=>void
};

export default function Input({
  extra,
  className,
  autoFocus,
  onExtraClick,
  ...rest
}: Props) {
  // console.log(rest);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (autoFocus) {
      inputRef.current!.focus();
    }
  }, [autoFocus]);

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        {...rest}
        className={classnames("input", className)}
        type="text"
      />
      <div className="extra" onClick={onExtraClick}>
        {extra}
      </div>
    </div>
  );
}
