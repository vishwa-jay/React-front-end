import { Box } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { VIEW_EMPLOYEE_ROUTE } from "../../../constants/routes";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeDetailsForm from "./employee-details-form";

const EditEmployee = () => {
  const routeParams = useParams();
  const navigate = useNavigate();

  const isEmployeeEdit =
    routeParams.id && routeParams.id.length > 0 ? true : false;

  const handleFormSubmission = () => {
    navigate(VIEW_EMPLOYEE_ROUTE);
  };
  
  return (
    <> 
      {<h2>{isEmployeeEdit ? `Edit` : `Create`} Employee</h2>}
      <Box>
        <EmployeeDetailsForm isEdit={isEmployeeEdit} handleSubmission={handleFormSubmission} />
      </Box>
    </>
  );
};

export default EditEmployee;
