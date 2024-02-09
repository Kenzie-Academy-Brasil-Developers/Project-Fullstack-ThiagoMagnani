import { ProtectedRoutes } from "./protectedRoutes/protectedRoutes";
import { RegisterClientPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";
import { DashBoard } from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";

export const RoutesMain = () => {
  return (
    <Routes class>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterClientPage />} />
      <Route path="/dashboard" element={<ProtectedRoutes />}>
        <Route index element={<DashBoard />} />
      </Route>
    </Routes>
  );
};
