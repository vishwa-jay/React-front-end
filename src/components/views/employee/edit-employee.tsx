import { Form } from "react-final-form";
import CustomTextField from "../../custom-text-field/custome-text-field";
import { Box, Button, Stack } from "@mui/material";
import CustomSelectField from "../../custom-select-field/custom-select-field";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCafeAllList } from "../../../store/actions/cafeAction";
import { AppState } from "../../../store/reducers/rootReducer";
import UseCafeListMap from "../../../hooks/useCafeListMap";
import CustomRadioButton from "../../custom-radio-button/custom-radio-button";
import {
  createEmployee,
  findEmployee,
  updateEmployee,
} from "../../../store/actions/employeeAction";
import { Employee } from "../../../store/states/employeeState";
import {
  INVALID_EMAIL_MSG,
  INVALID_PHONE_MSG,
  MAX_TEXT_LENGHT,
  MIN_MAX_LENGHT_MSG,
  MIN_TEXT_LENGHT,
  REQUIRED_MSG,
  genderList,
} from "../../../constants/common";
import { useNavigate, useParams } from "react-router";
import AlertBox, { AlertBoxProps } from "../../alert/alert-box";
import {
  checkStringMaxLength,
  checkStringMinLength,
  isValidEmail,
  isValidSGPhoneNo,
} from "../../../utils/validations";
import { VIEW_EMPLOYEE_ROUTE } from "../../../constants/routes";
import DateSelector from "../../date-selector/date-selector";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../../utils/common";


const EditEmployee = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const navigate = useNavigate();
  const employeeState = useSelector((state: AppState) => state.employee);
  const [alertState, setAlertState] = useState<AlertBoxProps>({
    message: "",
    severity: "info",
    showAlert: false,
  });

  const isEmployeeEdit =
    routeParams.id && routeParams.id.length > 0 ? true : false;

  const selectedEmployee = employeeState.response
    ? employeeState.response.data[0]
    : undefined;

  useEffect(() => {
    if (employeeState.loading) {
      return;
    }

    //Success and error message settings for alert
    if (employeeState.response && !employeeState.errors) {
      setAlertState({
        message: employeeState.response.message,
        severity: "success",
        showAlert: true,
      });
    } else if (employeeState.errors) {
      setAlertState({
        message: employeeState.errors,
        severity: "error",
        showAlert: true,
      });
    }
  }, [employeeState]);

  useEffect(() => {
    routeParams.id && dispatch(findEmployee(routeParams.id));
  }, [routeParams.id]);

  useMemo(() => {
    dispatch(getCafeAllList());
  }, []);

  const mappedCafeList = UseCafeListMap();

  const onSubmit = (e: Employee) => {
    console.log(e);
  
    const newEmployeeData: Employee = {
      id: routeParams.id || "",
      name: e.name,
      gender: e.gender,
      phone: e.phone,
      email: e.email,
      startdate: formatDate(e.startdate),
      cafe_id: e.cafe_id || "",
    };

    if (routeParams.id && routeParams.id.length > 0) {
      dispatch(updateEmployee(newEmployeeData));
    } else {
      dispatch(createEmployee(newEmployeeData));
    }
  };

  const handleCancel = () => {
    navigate(VIEW_EMPLOYEE_ROUTE);
  };

  const validate = (values: Employee) => {
    const errors = { name: "", email: "", phone: "", gender: "" };

    if (!values.name) {
      errors.name = REQUIRED_MSG;
    }

    if (!values.email) {
      errors.email = REQUIRED_MSG;
    }

    if (!values.phone) {
      errors.phone = REQUIRED_MSG;
    }

    if (!values.gender) {
      errors.gender = REQUIRED_MSG;
    }

    if (
      checkStringMinLength(values.name, MIN_TEXT_LENGHT) ||
      checkStringMaxLength(values.name, MAX_TEXT_LENGHT)
    ) {
      errors.name = MIN_MAX_LENGHT_MSG;
    }

    if (!isValidEmail(values.email)) {
      errors.email = INVALID_EMAIL_MSG;
    }

    if (!isValidSGPhoneNo(values.phone)) {
      errors.phone = INVALID_PHONE_MSG;
    }
   
    //checking if the errors object is equal to error less state
    if(JSON.stringify(errors) === JSON.stringify({ name: "", email: "", phone: "", gender: "" })){
        return undefined;
    }
    return errors;
  };

  const EmployeeDetailsForm = () => (
    <Form
      onSubmit={onSubmit}
      initialValues={selectedEmployee}
      validate={(values) => validate(values)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Stack sx={{ width: "500px" }} spacing={1}>
            <CustomTextField
              name="name"
              label="Employee Name"
              textBoxFullWidth
            />
            <CustomRadioButton
              name="gender"
              label="Gender"
              optionList={[...genderList]}
            />
            <CustomTextField
              name="email"
              label="Email Address"
              textBoxFullWidth
            />
            <CustomTextField name="phone" label="Phone No" textBoxFullWidth />
            <CustomSelectField
              name="cafe_id"
              label="Assigned Cafe"
              textBoxFullWidth
              optionList={[
                { key: "undefined", value: "", label: "Please Select" },
                ...(mappedCafeList || []),
              ]}
            />
            <DateSelector name="startdate" label="Start Date" />
            <Box display="flex" flexDirection="row" sx={{ m: 1 }}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mr: 1 }}
              >
                Save Employee Details
              </Button>
              <Button variant="contained" color="info" onClick={handleCancel}>
                Cancel
              </Button>
            </Box>
          </Stack>
          {/* <label>Name</label>
            <Field
              name="firstName"
              component="input"
              placeholder="First Name"
            /> */}

          {/* <label>Interests</label> */}
          {/* <Field name="interests" component={CustomTextField} /> */}

          {/* <Field
            name="bio"
            render={({ input, meta }) => (
              <div>
                <label>Bio</label>
                <textarea {...input} />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          /> */}
          {/* {JSON.stringify(cafeList)} */}

          {/* <h2>Render Function as Children</h2>
          <Field name="phone">
            {({ input, meta }) => (
              <div>
                <label>Phone</label>
                <input type="text" {...input} placeholder="Phone" />
                {meta.touched && meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field> */}
          {/* {JSON.stringify(mappedCafeList)} */}
        </form>
      )}
    />
  );
  return (
    <>
      
      {alertState.showAlert && (
        <AlertBox
          showAlert={alertState.showAlert}
          message={alertState.message}
          severity={alertState.severity}
        />
      )}
      {<h2>{isEmployeeEdit ? `Edit` : `Create`} Employee</h2>}

      <Box>
        <EmployeeDetailsForm />
      </Box>
    </>
  );
};

export default EditEmployee;
