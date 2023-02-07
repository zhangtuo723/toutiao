import React from "react";
import classnames from 'classnames'
// import PropTypes from 'prop-types'

type Props = {
  type:string
  className?:string
  onClick?:()=>void

}

 function Icon({type,className,...rest}:Props) {
  return (
    <svg className={classnames('icon',className)} {...rest} aria-hidden="true" >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}
// Icon.propTypes = {
//   type:PropTypes.string.isRequired,
// }

export default Icon
