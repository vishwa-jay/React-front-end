import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "../../../store/reducers/rootReducer";
import { useEffect, useState } from "react";
import { getEmployeeList } from "../../../store/actions/employeeAction";
import { Box, Button, Pagination, Stack } from "@mui/material";
import DataTable from "../../data-table/data-table.component";
import { EDIT_EMPLOYEE_ROUTE } from "../../../constants/routes";
import React from "react";

const ViewEmployee = () => {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const navigate = useNavigate();
  const employeeList = useSelector((state: AppState) => state.employee);
  const [currentPage, setCurrentPage] = useState(1);

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
      <Button variant="contained" color="error" size="small">
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
  ]

  const handlePageChange =(event: React.ChangeEvent<any>, page: number) =>{
    setCurrentPage(page);
  }

  useEffect(() => {
    dispatch(getEmployeeList(currentPage, routeParams.id));
  }, [routeParams.id, currentPage]);

  return (
    <>
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
