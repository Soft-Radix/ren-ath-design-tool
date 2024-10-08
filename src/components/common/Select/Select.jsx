/* eslint-disable no-nested-ternary */
import { KeyboardArrowDown } from "@mui/icons-material";
import { InputLabel, MenuItem, Select } from "@mui/material";
export const SelectField = ({
  formik,
  name,
  label,
  placeholder,
  options,
  required,
  isReset,
  selectedValue,
  value,
  defalutValue,
  className,
  disabled = false,
  onChange,
  handleOnOpen,
  defalutlMenuHide = false,
}) => {
  const selectComponent = () => (
    <div className="input_field_wrap">
      <Select
        onOpen={handleOnOpen}
        fullWidth
        className={`form_select ${className ? className : ""} ${
          formik?.values[name] === "" ? "placeholderSelected" : ""
        }`}
        value={
          value
            ? value
            : formik?.values[name] === undefined
            ? ""
            : formik?.values[name]
        }
        name={name}
        disabled={disabled}
        onChange={onChange ? onChange : formik?.handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        MenuProps={{ className: "form_select_list" }}
        IconComponent={KeyboardArrowDown}
        error={formik?.touched[name] && formik?.errors[name]}
        defaultValue={
          defalutValue
            ? defalutValue
            : formik?.values[name]
            ? formik?.values[name]
            : ""
        }
      >
        {placeholder && (
          <MenuItem
            disabled
            value=""
            style={defalutlMenuHide ? { display: "none" } : { opacity: "0.75" }}
          >
            {placeholder}
          </MenuItem>
        )}
        {isReset && <MenuItem value="none">None</MenuItem>}

        {options.map((item) => (
          <MenuItem
            key={item.value}
            value={item.value}
            onClick={() => {
              // formik?.setFieldValue(name, item.value);
              selectedValue && selectedValue(item);
            }}
          >
            <div className="options_content">
              <div
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                }}
              >
                {item.title}
              </div>
            </div>
          </MenuItem>
        ))}
      </Select>
      <div className="error">
        {formik?.touched[name] && formik?.errors[name]}
      </div>
    </div>
  );

  return (
    <div className="form_control">
      {label && (
        <InputLabel className="form_label" htmlFor={name}>
          {label}
          {required && <sup>*</sup>}
        </InputLabel>
      )}
      {selectComponent()}
    </div>
  );
};
