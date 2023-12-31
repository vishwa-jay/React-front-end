import { Box, Button, Stack } from "@mui/material";
import { Form } from "react-final-form";
import CustomTextField from "../../custom-text-field/custome-text-field";
import { Cafe } from "../../../store/states/cafeState";
import { useParams } from "react-router";
import { AppState } from "../../../store/reducers/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  checkStringMaxLength,
  checkStringMinLength,
} from "../../../utils/validations";
import {
  MAX_TEXTAREA_LENGHT,
  MAX_TEXTAREA_LENGHT_MSG,
  MAX_TEXT_LENGHT,
  MIN_MAX_LENGHT_MSG,
  MIN_TEXT_LENGHT,
  REQUIRED_MSG,
  defaultAlertValue,
} from "../../../constants/common";
import {
  createCafe,
  findCafe,
  updateCafe,
} from "../../../store/actions/cafeAction";
import { useEffect, useState } from "react";
import AlertBox, { AlertBoxProps } from "../../alert/alert-box";

interface CafeDetailsFormProps {
    isEdit: boolean;
    handleSubmission: (isSubmissionSuccessfull?: boolean) => void;
}

const CafeDetailsForm = (props: CafeDetailsFormProps) => {
    const {isEdit, handleSubmission} = props;

  const routeParams = useParams();
  const dispatch = useDispatch();
  const cafeState = useSelector((state: AppState) => state.cafe);
  const [alertState, setAlertState] =
    useState<AlertBoxProps>(defaultAlertValue);

  const selectedCafe =
    cafeState.response && isEdit ? cafeState.response.data[0] : undefined;

  const onSubmit = (e: Cafe) => {
    console.log(e);
    const newCafeData: Cafe = {
      id: routeParams.id || "",
      name: e.name,
      description: e.description,
      logo: e.logo || "",
      location: e.location,
    };

    setAlertState({ ...alertState, showAlert: true });
    if (routeParams.id && routeParams.id.length > 0) {
      dispatch(updateCafe(newCafeData));
    } else {
      dispatch(createCafe(newCafeData));
    }
  };

  const validate = (values: Cafe) => {
    const errors = { name: "", description: "", logo: "", location: "" };

    if (!values.name) {
      errors.name = REQUIRED_MSG;
    }

    if (!values.description) {
      errors.description = REQUIRED_MSG;
    }

    //commented to implement later
    // if (!values.logo) {
    //   errors.logo = REQUIRED_MSG;
    // }

    if (!values.location) {
      errors.location = REQUIRED_MSG;
    }

    if (
      checkStringMinLength(values.name, MIN_TEXT_LENGHT) ||
      checkStringMaxLength(values.name, MAX_TEXT_LENGHT)
    ) {
      errors.name = MIN_MAX_LENGHT_MSG;
    }

    if (checkStringMaxLength(values.description, MAX_TEXTAREA_LENGHT)) {
      errors.description = MAX_TEXTAREA_LENGHT_MSG;
    }

    //checking if the errors object is equal to error less state
    if (
      JSON.stringify(errors) ===
      JSON.stringify({ name: "", description: "", logo: "", location: "" })
    ) {
      return undefined;
    }
    return errors;
  };

  const handleCancel = () => {
    handleSubmission(false);
  };

  useEffect(() => {
    routeParams.id && dispatch(findCafe(routeParams.id));
  }, [routeParams.id]);

  useEffect(() => {
    if (cafeState.loading) {
      return;
    }

    //Success and error message settings for alert
    if (cafeState.response && !cafeState.errors) {
      setAlertState({
        ...alertState,
        message: cafeState.response.message,
        severity: "success",
      });
    } else if (cafeState.errors) {
      setAlertState({
        message: cafeState.errors,
        severity: "error",
        showAlert: true,
      });
    }
  }, [cafeState]);

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
        initialValues={selectedCafe}
        validate={(values) => validate(values)}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack sx={{ width: "500px" }} spacing={1}>
              <CustomTextField name="name" label="Cafe Name" textBoxFullWidth />

              <CustomTextField
                name="location"
                label="Location"
                textBoxFullWidth
              />

              <CustomTextField
                name="description"
                label="Description"
                textBoxFullWidth
                isMultiline
                rows={3}
              />

              <Box display="flex" flexDirection="row" sx={{ m: 1 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  sx={{ mr: 1 }}
                >
                  Save Cafe Details
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

export default CafeDetailsForm;
