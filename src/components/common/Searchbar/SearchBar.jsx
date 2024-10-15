/* eslint-disable no-nested-ternary */
import { TextField } from "@mui/material";
import { searchIcon } from "../../../assets/icons/icons";




export const SearchBar = ({
  minWidth,
  paddingLeft,
  fontSize,
  maxHeight,
  name,
  placeholder,
  value,
  handleChange,
  textFieldProps,
}) => {
  return (
    <div className="form_control" style={{ fontSize: fontSize }}>
      <TextField
        style={{ minWidth: minWidth }}
        className="form_input search_field"
        type="text"
        placeholder={placeholder ?? "Search"}
        name={name}
        value={value}
        autoComplete="off"
        onChange={handleChange}
        id={name}
        InputProps={{ style: { maxHeight: maxHeight, fontSize: "inherit" } }}
        inputProps={{ style: { paddingLeft: paddingLeft } }}
        {...textFieldProps}
      />
      <div className="searchIcon">{searchIcon}</div>
    </div>
  );
};
