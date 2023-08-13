import DatePicker from "react-datepicker";
import { Field } from "react-final-form";
import { DateInputStyles } from "./date-selector.styles";

interface DateSelectorProps {
  name: string;
  label?: string;
}

const DateSelector = (props: DateSelectorProps) => {
  const { name, label } = props;
  return (
    <>
      <label style={{ fontWeight: "bold" }}>{label}</label>
      <Field name={name}>
        {(props) => (
          <>
          <DateInputStyles>
            <DatePicker
              name={name}
              value={props.input.value}
              onChange={props.input.onChange}              
            />
          </DateInputStyles>
          {props.meta.touched && props.meta.error && <span className="errorfield">{props.meta.error}</span>}
          </>
        )}
      </Field>
    </>
  );
};

export default DateSelector;
