import React from "react";
import classnames from 'classnames'
import PropTypes from 'prop-types'
 function Icon({type,className,...rest}) {
  return (
    <svg className={classnames('icon',className)} {...rest} aria-hidden="true" >
      <use xlinkHref={`#${type}`}></use>
    </svg>
  );
}
Icon.propTypes = {
  type:PropTypes.string.isRequired,
}

export default Icon
