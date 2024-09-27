import { Button } from "@mui/material";
import { motion } from "framer-motion";

const ThemeButton = ({
  variant,
  className,
  color = "",
  textColor = "",
  ...rest
}) => {
  return (
    <motion.span whileHover={{ scale: 1.03 }}>
      <Button
        sx={{
          background: `${color} !important`,
          color: `${textColor} !important`,
        }}
        className={`btn ${
          variant === "outlined" ? "btn_outlined" : "btn_contained"
        } ${className}`}
        {...rest}
      />
    </motion.span>
  );
};

export default ThemeButton;
