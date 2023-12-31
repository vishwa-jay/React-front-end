import { useDispatch, useSelector } from "react-redux";
import { deleteCafe, getCafeList } from "../../../store/actions/cafeAction";
import { useEffect, useState } from "react";
import { AppState } from "../../../store/reducers/rootReducer";
import DataTable from "../../data-table/data-table.component";
import { Box, Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import {
  EDIT_CAFE_ROUTE,
  VIEW_EMPLOYEE_ROUTE,
} from "../../../constants/routes";
import FilterSection, { FilterProps } from "./filter-section";
import Pagination from "@mui/material/Pagination";
import ConfirmModal from "../../modal/confirm-modal";
import AlertBox, { AlertBoxProps } from "../../alert/alert-box";
import { defaultAlertValue } from "../../../constants/common";

const ViewCafe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cafeList = useSelector((state: AppState) => state.cafe);

  const [cafeParams, setCafeParams] = useState({ location: "", page: 1 });
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState({open: false, id: ""});
  const [alertState, setAlertState] = useState<AlertBoxProps>(defaultAlertValue);

  const GoToEmployees = React.memo((value: any) => {
    return (
      <Button
        size="small"
        color="primary"
        onClick={() => navigate(`${VIEW_EMPLOYEE_ROUTE}/${value.data.id}`)}
      >
        {value.data.employeecount} {`${value.data.employeecount === 1 ? "Employee": "Employees"}`}
      </Button>
    );
  });

  const GoToEditCafe = React.memo((value: any) => {
    return (
      <Button
        variant="contained"
        color="warning"
        size="small"
        onClick={() => navigate(`${EDIT_CAFE_ROUTE}/${value.data.id}`)}
      >
        Edit
      </Button>
    );
  });

  const DeleteCafe = React.memo((value: any) => {
    return (
      <Button variant="contained" color="error" size="small" 
      onClick={() => setOpenDeleteConfirmation({open: true, id: value.data.id})}>
        Delete
      </Button>
    );
  });

  const columns = [
    //{field: "logo"},
    { field: "id", width: 300 },
    { field: "name" },
    { field: "description", width: 350 },
    { field: "location" },
    { field: "employeecount", headerName: "Employees", cellRenderer: GoToEmployees },
    {
      field: "",
      width: 100,
      headerName: "Edit Cafe",
      cellRenderer: GoToEditCafe,
    },
    {
      field: "",
      width: 120,
      headerName: "Delete Cafe",
      cellRenderer: DeleteCafe,
    },
  ];

  const handleFilter = (filter: FilterProps) => {
    setCafeParams({ ...cafeParams, location: filter.location || "", page: 1 });
  };

  const handlePageChange =(event: React.ChangeEvent<any>, page: number) =>{
    setCafeParams({ ...cafeParams, page: page });
  }

  const handleConfirm = (confirmation: boolean) =>{console.log(confirmation);   
    if(confirmation === true){
      setAlertState({...alertState, showAlert: true});
      dispatch(deleteCafe(openDeleteConfirmation.id));
    }
    setOpenDeleteConfirmation({...openDeleteConfirmation, open: false, id: ""});
  }

  useEffect(() => {
    if (cafeList.loading) {
      return;
    }

    //Success and error message settings for alert
    if (cafeList.response && !cafeList.errors) {
      setAlertState({
        ...alertState,
        message: cafeList.response.message,
        severity: "success",
      });
    } else if (cafeList.errors) {
      setAlertState({
        message: cafeList.errors,
        severity: "error",
        showAlert: true,
      });
    }
  }, [cafeList]);

  useEffect(() => {
    dispatch(getCafeList(cafeParams));
  }, [cafeParams]);
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
      <h2>View Cafe</h2>
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
        mb={1}
      >
        <Button
          onClick={() => navigate(EDIT_CAFE_ROUTE)}
          variant="contained"
          color="success"
          sx={{ height: "40px" }}
        >
          Add New Cafe
        </Button>
        <FilterSection onSubmit={handleFilter} />
      </Box>
      <Box>
        <DataTable
          cols={columns}
          rows={cafeList.response?.data}
          tableHeight={400}
          tableWidth={1500}
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

export default ViewCafe;
