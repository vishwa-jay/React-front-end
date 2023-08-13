import { MenuItem, Select } from "@mui/material";
import { Field } from "react-final-form";

interface CustomSelectFieldProps {
  name: string;
  label?: string;
  textBoxFullWidth?: boolean;
  optionList: {
    key: string;
    value: string;
    label: string;
  }[];
}

const CustomSelectField = (props: CustomSelectFieldProps) => {
  const { name, label, textBoxFullWidth, optionList } = props;
  return (
    <>
      <label style={{ fontWeight: "bold" }}>{label}</label>
      <Field name={name}>
        {(props) => (
          <div>
            <Select
              onChange={props.input.onChange}
              fullWidth={textBoxFullWidth}
              defaultValue={props.input.value}
              sx={{ height: "40px"}}
            >
              {optionList.map((item) => {
                return (
                  <MenuItem key={item.key} value={item.value}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
            {props.meta.touched && props.meta.error && (
              <span className="errorfield">{props.meta.error}</span>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default CustomSelectField;
