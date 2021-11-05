import React from "react";
import StyledButton from "./button.styles";

const Button = (props) => {
  const { primary, className, ...rest } = props;
  console.log(primary);
  return (
    <StyledButton primary={primary} className={`${className}`} {...rest}>
      {props.children}
    </StyledButton>
  );
};

export default Button;
