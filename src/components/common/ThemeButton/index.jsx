import { Button } from "@mui/material";

const ThemeButton = (props) => {
  return (
    <Button
      className={`btn ${
        props.variant === "outlined" ? "btn_outlined" : "btn_contained"
      }`}
      {...props}
    />
  );
};

export default ThemeButton;
