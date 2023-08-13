import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import {
  HOME_ROUTE,
  VIEW_CAFE_ROUTE,
  VIEW_EMPLOYEE_ROUTE,
} from "../../constants/routes";

interface LayoutProps {
  children?: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Cafe Manager
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button color="inherit" onClick={() => navigate(HOME_ROUTE)}>
                Home
              </Button>
              <Button color="inherit" onClick={() => navigate(VIEW_CAFE_ROUTE)}>
                View Cafes
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate(VIEW_EMPLOYEE_ROUTE)}
              >
                View Employees
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box p={2}>{props.children}</Box>
    </Box>
  );
};

export default Layout;
