import { Box, Button, Stack } from "@mui/material";
import { Form } from "react-final-form";
import CustomTextField from "../../custom-text-field/custome-text-field";
import CustomRadioButton from "../../custom-radio-button/custom-radio-button";
import CustomSelectField from "../../custom-select-field/custom-select-field";
import DateSelector from "../../date-selector/date-selector";
import { Employee } from "../../../store/states/employeeState";
import {
  INVALID_EMAIL_MSG,
  INVALID_PHONE_MSG,
  MAX_TEXT_LENGHT,
  MIN_MAX_LENGHT_MSG,
  MIN_TEXT_LENGHT,
  REQUIRED_MSG,
  defaultAlertValue,
  genderList,
} from "../../../constants/common";
import {
  checkStringMaxLength,
  checkStringMinLength,
  isValidEmail,
  isValidSGPhoneNo,
} from "../../../utils/validations";
import { formatDate } from "../../../utils/common";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  createEmployee,
  findEmployee,
  updateEmployee,
} from "../../../store/actions/employeeAction";
import { useEffect, useMemo, useState } from "react";
import { AppState } from "../../../store/reducers/rootReducer";
import AlertBox, { AlertBoxProps } from "../../alert/alert-box";
import { getCafeAllList } from "../../../store/actions/cafeAction";
import UseCafeListMap from "../../../hooks/useCafeListMap";

interface EmployeeDetailsFormProps {
  isEdit: boolean;
  handleSubmission: (isSubmissionSuccessfull?: boolean) => void;
}

const EmployeeDetailsForm = (props: EmployeeDetailsFormProps) => {
  const { isEdit, handleSubmission } = props;

  const routeParams = useParams();
  const dispatch = useDispatch();

  const employeeState = useSelector((state: AppState) => state.employee);
  const [alertState, setAlertState] =
    useState<AlertBoxProps>(defaultAlertValue);

  const selectedEmployee =
    employeeState.response && isEdit
      ? employeeState.response.data[0]
      : undefined;

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

    setAlertState({ ...alertState, showAlert: true });
    if (routeParams.id && routeParams.id.length > 0) {
      dispatch(updateEmployee(newEmployeeData));
    } else {
      dispatch(createEmployee(newEmployeeData));
    }
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
    if (
      JSON.stringify(errors) ===
      JSON.stringify({ name: "", email: "", phone: "", gender: "" })
    ) {
      return undefined;
    }
    return errors;
  };

  const handleCancel = () => {
    handleSubmission();
  };

  useMemo(() => {
    dispatch(getCafeAllList());
  }, []);

  const mappedCafeList = UseCafeListMap();

  useEffect(() => {
    routeParams.id && dispatch(findEmployee(routeParams.id));
  }, [routeParams.id]);

  useEffect(() => {
    if (employeeState.loading) {
      return;
    }

    //Success and error message settings for alert
    if (employeeState.response && !employeeState.errors) {
      setAlertState({
        ...alertState,
        message: employeeState.response.message,
        severity: "success",
      });
    } else if (employeeState.errors) {
      setAlertState({
        message: employeeState.errors,
        severity: "error",
        showAlert: true,
      });
    }
  }, [employeeState]);

  return (
    <>
      {alertState.showAlert && (
        <AlertBox
          showAlert={alertState.showAlert}
          message={alertState.message}
          severity={alertState.severity}
        />
      )}
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
          </form>
        )}
      />
    </>
  );
};

export default EmployeeDetailsForm;