import React from "react";
import { Button } from "@mui/material";
import styles from "./CustomButton.module.css";
const CustomButton = ({ children, handler }) => {
  return (
    <Button className={styles.button} onClick={handler}>
      {children}
    </Button>
  );
};

export default CustomButton;
