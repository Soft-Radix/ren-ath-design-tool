/* eslint-disable no-nested-ternary */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { removeInitialSpace } from "../../../utils/funtions";

export const InputField = ({
  isUrl,
  required,
  formik,
  type = "text",
  name,
  prefix,
  placeholder,
  label,
  disabled,
  isNotFormik = false,
  onChangeWork,
  textFieldProps,
  valueData,
  sign,
  error,
  inputProps,
  multiline,
  rows,
  ...rest
}) => {
  const [isType, setIsType] = useState(type);
  const handleEyeToggle = () => {
    setIsType(isType === "text" ? "password" : "text");
  };

  const handleFormikOnChange = (e) => {
    const regex = /^\d*[.]?\d*$/;
    if (type === "number") {
      if (regex.test(e.target.value)) {
        formik.setFieldValue(name, removeInitialSpace(e.target.value));
      }
    } else {
      const { name, value } = e.target;
      formik.setFieldValue(name, removeInitialSpace(value));
    }
  };

  const textField = () => {
    const textFieldPropNew = {
      ...textFieldProps,
      ...rest,
    };
    if (sign && sign !== "") {
      textFieldPropNew.InputProps = {
        startAdornment: (
          <InputAdornment position="start">{sign}</InputAdornment>
        ),
      };
    }
    return (
      <div className={`form_input_wrap ${disabled ? "disabledState" : ""}`}>
        {prefix && <span className="input_prefix">{prefix}</span>}
        <TextField
          className={`form_input  ${prefix ? "hasPrefix" : ""} ${
            type === "password" ? "type_password" : ""
          }`}
          type={isType}
          size="small"
          placeholder={placeholder}
          name={name}
          multiline={multiline}
          rows={rows}
          value={isNotFormik ? valueData : formik?.values[name]}
          onChange={isNotFormik ? onChangeWork : handleFormikOnChange}
          // onChange={onChangeWork}
          id={name}
          error={error ?? (formik?.touched[name] && formik?.errors[name])}
          disabled={disabled}
          required={isNotFormik ? required : false}
          {...textFieldPropNew}
          sx={{
            "& .MuiInputBase-input.Mui-disabled": {
              WebkitTextFillColor: "#8D8A8C",
            },
            "& .MuiInputBase-input":
              sign === "$"
                ? {
                    paddingLeft: "0 !important",
                  }
                : {},
            "& .MuiInputAdornment-root":
              sign === "$"
                ? {
                    marginRight: "1px !important",
                  }
                : { whiteSpace: "break-spaces" },
            "& .MuiTypography-root": {
              color: disabled ? "#8D8A8C" : "#0e2b3a",
            },
          }}
          inputProps={inputProps}
        />
        {type === "password" && (
          <span className="form_input_icon" onClick={handleEyeToggle}>
            {isType === "password" ? <VisibilityOff /> : <Visibility />}
          </span>
        )}

        {error ? (
          <div className="error">{error}</div>
        ) : formik?.touched[name] && formik?.errors[name] !== "" ? (
          <div className="error">{formik.errors[name]}</div>
        ) : (
          ""
        )}
      </div>
    );
  };
  return (
    <div className="form_control">
      {label && (
        <InputLabel className="form_label" htmlFor={name}>
          {label}
          {required && <sup>*</sup>}
        </InputLabel>
      )}
      {textField()}
    </div>
  );
};
