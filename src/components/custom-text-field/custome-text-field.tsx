import { TextField } from "@mui/material";
import { Field } from "react-final-form";

interface CustomTextFieldProps {
    name: string
    label?: string
    textBoxFullWidth? : boolean
    isMultiline?: boolean
    rows? : string | number
}

const CustomTextField = (props : CustomTextFieldProps) => {
    const { name, label, textBoxFullWidth, isMultiline, rows} = props;

  return (
    <>
    <label style={{fontWeight: "bold"}}>{label}</label>
    <Field name={name}>
      {(props) => (
        <div>
          <TextField
            name={props.input.name}
            value={props.input.value}
            onChange={props.input.onChange}
            fullWidth ={textBoxFullWidth}
            multiline ={isMultiline}
            rows={rows}
            inputProps={{
                style: {
                  height: isMultiline ? "100px" : "8px",
                },
              }}
          />
          {props.meta.touched && props.meta.error && <span className="errorfield">{props.meta.error}</span>}
        </div>
      )}
    </Field>
    </>
    
  );
};

export default CustomTextField;
