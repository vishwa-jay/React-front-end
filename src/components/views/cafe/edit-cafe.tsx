import { useNavigate, useParams } from "react-router";
import { VIEW_CAFE_ROUTE } from "../../../constants/routes";
import { Box } from "@mui/material";
import CafeDetailsForm from "./cafe-details-form";

const EditCafe = () => {
  const routeParams = useParams();
  const navigate = useNavigate();

  const isCafeEdit = routeParams.id && routeParams.id.length > 0 ? true : false;

  const handleFormSubmission = () => {
    navigate(VIEW_CAFE_ROUTE);
  };

  return (
    <>      
      {<h2>{isCafeEdit ? `Edit` : `Create`} Cafe</h2>}
      <Box>
        <CafeDetailsForm isEdit={isCafeEdit} handleSubmission={handleFormSubmission} />
      </Box>
    </>
  );
};

export default EditCafe;
