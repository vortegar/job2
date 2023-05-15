import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import lget from "lodash";

const Input = ({name, register, style, ...rest}) => {
  const context = useFormContext();
  //const { error: allErrors } = context || {};
  //const error = lget(allErrors, name);

  return (
    <div>
      <input name={name} ref={register} {...rest}/>
    </div>
  )
}

export default Input