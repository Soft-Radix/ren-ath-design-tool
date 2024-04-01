import { Button } from "@mui/material";
import { motion } from "framer-motion";

const ThemeButton = (props) => {
  return (
    <motion.span whileHover={{ scale: 1.05 }}>
      <Button
        className={`btn ${
          props.variant === "outlined" ? "btn_outlined" : "btn_contained"
        }`}
        {...props}
      />
    </motion.span>
  );
};

export default ThemeButton;
