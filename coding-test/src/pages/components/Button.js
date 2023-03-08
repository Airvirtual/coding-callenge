import React from "react";
import { Button } from "@material-ui/core";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const handleReload = () => {
    otherProps.refresh();
  };

  const configButton = {
    variant: "contained",
    color: "primary",
    fullWidth: false,
    onClick: handleReload,
  };

  return (
    <Button
      {...configButton}
    >
      {children}
    </Button>
  );
};

export default ButtonWrapper;
