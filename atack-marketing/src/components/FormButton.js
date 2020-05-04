import React from "react";
import { Button } from "react-native-elements";

const FormButton = ({
  title,
  titleColor,
  buttonType,
  buttonColor,
  ...rest
}) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{ backgroundColor: buttonColor, borderRadius: 5 }}
    titleStyle={{ color: titleColor }}
  />
);

export default FormButton;
