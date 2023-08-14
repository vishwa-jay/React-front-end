import { Box } from "@mui/material";
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
  const { name, label, optionList} = props;
  return (
    <>
      <label style={{ fontWeight: "bold" }}>{label}</label>
      
      <Box display={"flex"} flexDirection={"row"}>
      {optionList.map((item) => {
        return (
          <>
            <Field name={name} type="radio" value={item.value} key={item.key}>
                {({ input }) => {
                  return (
                    <Box display={"flex"} flexDirection={"row"} sx={{mr:2}}>
                    <input
                        name={input.name}
                        type="radio"
                        value={item.value}
                        checked={input.checked}
                        onChange={input.onChange}
                      />
                      <label>{item.label}</label>
                    </Box>
                  );
                }}
              </Field>            
          </>
        );
      })}
      </Box>
    </>
  );
};

export default CustomRadioButton;
