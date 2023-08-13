import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import {
  EDIT_CAFE_ROUTE,
  EDIT_EMPLOYEE_ROUTE,
  HOME_ROUTE,
  VIEW_CAFE_ROUTE,
  VIEW_EMPLOYEE_ROUTE,
} from "./constants/routes";
import ViewCafe from "./components/views/cafe/view-cafe";
import ViewEmployee from "./components/views/employee/view-employee";
import EditCafe from "./components/views/cafe/edit-cafe";
import EditEmployee from "./components/views/employee/edit-employee";
import { Suspense } from "react";
import Home from "./components/views/home/home";
import { Alert } from "@mui/material";
import Layout from "./components/views/layout";

const App = () => {
  const ROUTES = [
    {
      component: <Home />,
      path: HOME_ROUTE,
    },
    {
      component: <ViewCafe />,
      path: VIEW_CAFE_ROUTE,
    },
    {
      component: <ViewEmployee />,
      path: `${VIEW_EMPLOYEE_ROUTE}/:id?`,
    },
    {
      component: <EditCafe />,
      path: `${EDIT_CAFE_ROUTE}/:id?`,
    },
    {
      component: <EditEmployee />,
      path: `${EDIT_EMPLOYEE_ROUTE}/:id?`,
    },
  ];

  const FallbackComponent = () => (
    <Alert severity="warning">Something wrong!</Alert>
  );

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // reset the state goes here
      }}
      resetKeys={["someKey"]}
    >
      <Suspense fallback={<h2>Loading...</h2>}>
        <Layout>
          <Routes>
            {ROUTES.map((route, index) => (
              <Route key={index} element={route.component} path={route.path} />
            ))}
          </Routes>
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
