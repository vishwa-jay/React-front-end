import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "../../../store/reducers/rootReducer";
import { useEffect, useState } from "react";
import { deleteEmployee, getEmployeeList } from "../../../store/actions/employeeAction";
import { Box, Button, Pagination, Stack } from "@mui/material";
import DataTable from "../../data-table/data-table.component";
import { EDIT_EMPLOYEE_ROUTE } from "../../../constants/routes";
import React from "react";
import ConfirmModal from "../../modal/confirm-modal";
import AlertBox, { AlertBoxProps } from "../../alert/alert-box";
import { defaultAlertValue } from "../../../constants/common";

const ViewEmployee = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const navigate = useNavigate();
  const employeeList = useSelector((state: AppState) => state.employee);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState({open: false, id: ""});
  const [currentPage, setCurrentPage] = useState(1);
  const [alertState, setAlertState] = useState<AlertBoxProps>(defaultAlertValue);

  const GoToEditEmployees = React.memo((value: any) => {
    return (
      <Button
        variant="contained"
        color="warning"
        size="small"
        onClick={() => navigate(`${EDIT_EMPLOYEE_ROUTE}/${value.data.id}`)}
      >
        Edit
      </Button>
    );
  });

  const DeleteEmployees = React.memo((value: any) => {
    return (
      <Button variant="contained" color="error" size="small" onClick={() => setOpenDeleteConfirmation({open: true, id: value.data.id})}>
        Delete
      </Button>
    );
  });

  const columns = [
    //{field: "logo"},
    { field: "id", width: 200 },
    { field: "name" },
    { field: "email" },
    { field: "phone",width: 120,  },
    { field: "gender",width: 100, },
    { field: "cafename", headerName: "Cafe", width: 120},
    { field: "workeddays", headerName: "Days Worked", width: 150},
    {
      field: "",
      width: 130,
      headerName: "Edit Employee",
      cellRenderer: GoToEditEmployees,
    },
    {
      field: "",
      width: 150,
      headerName: "Delete Employee",
      cellRenderer: DeleteEmployees,
    },
  ];

  useEffect(() => {
    if (employeeList.loading) {
      return;
    }

    //Success and error message settings for alert
    if (employeeList.response && !employeeList.errors) {
      setAlertState({
        ...alertState,
        message: employeeList.response.message,
        severity: "success",
      });
    } else if (employeeList.errors) {
      setAlertState({
        message: employeeList.errors,
        severity: "error",
        showAlert: true,
      });
    }
  }, [employeeList]);


  const handlePageChange =(event: React.ChangeEvent<any>, page: number) =>{
    setCurrentPage(page);
  }

  const handleConfirm = (confirmation: boolean) =>{  
    if(confirmation === true){
      setAlertState({...alertState, showAlert: true});
      dispatch(deleteEmployee(openDeleteConfirmation.id));
    }
    setOpenDeleteConfirmation({...openDeleteConfirmation, open: false, id: ""});
  }

  useEffect(() => {
    dispatch(getEmployeeList(currentPage, routeParams.id));
  }, [routeParams.id, currentPage]);

  return (
    <>
    <ConfirmModal open={openDeleteConfirmation.open} onConfirm={handleConfirm}/>
    {alertState.showAlert===true && (
        <AlertBox 
          showAlert={alertState.showAlert}
          message={alertState.message}
          severity={alertState.severity}
        />        
      )}
      <h2>View Employee</h2>
      <Box mb={1}>
        <Button
          onClick={() => navigate(EDIT_EMPLOYEE_ROUTE)}
          variant="contained"
          color="success"
        >
          Add New Employee
        </Button>
      </Box>
      <Box>
        <DataTable
          cols={columns}
          rows={employeeList.response?.data}
          tableHeight={450}
          tableWidth={1400}
        />
      </Box>
      <Box mt={2}>
        <Stack spacing={2}>
          <Pagination onChange={handlePageChange} count={10} variant="outlined" color="primary" />
        </Stack>
      </Box>
    </>
  );
};

export default ViewEmployee;
