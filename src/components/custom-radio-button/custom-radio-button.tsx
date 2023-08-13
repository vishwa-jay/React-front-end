import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Field } from "react-final-form";

interface CustomRadioButtonProps {
  name: string;
  label?: string;
  optionList: {
    key: string;
    value: string;
    label: string;
  }[];
}

const CustomRadioButton = (props: CustomRadioButtonProps) => {
  const { name, label, optionList } = props;
  return (
    <>
      <label style={{fontWeight: "bold"}}>{label}</label>
      <Field name={name}>
        {(props) => (
          <div>
            <RadioGroup onChange={props.input.onChange} row defaultValue={props.input.value}>
              {optionList.map((item) => {
                return (
                  <FormControlLabel
                    key={item.key}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                );
              })}
            </RadioGroup>
            {props.meta.touched && props.meta.error && (
              <span className="errorfield">{props.meta.error}</span>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export default CustomRadioButton;
