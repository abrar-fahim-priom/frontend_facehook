import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage";
import PrivateRoutes from "./routes/PrivateRoutes";
import HomePage from "/src/Pages/HomePage";
import LoginPage from "/src/Pages/LoginPage";
import NotFoundPage from "/src/Pages/NotFoundPage";
import RegistrationPage from "/src/Pages/RegistrationPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<ProfilePage />} path="/me" />
      </Route>

      <Route element={<LoginPage />} path="/login" exact />
      <Route element={<RegistrationPage />} path="/register" />
      <Route element={<NotFoundPage />} path="/*" />
    </Routes>
  );
}
