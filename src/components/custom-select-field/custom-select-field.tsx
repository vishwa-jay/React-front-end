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
      <Field name={name} component="select">
        {(props) => (
          <>
            <select
              onChange={props.input.onChange}
              value={props.input.value}
            >
              {optionList.map((item) => {
                return (
                  <option key={item.key} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
              {props.meta.touched && props.meta.error && (
                <span className="errorfield">{props.meta.error}</span>
              )}
            </select>
          </>
        )}
      </Field>
    </>
  );
};

export default CustomSelectField;
