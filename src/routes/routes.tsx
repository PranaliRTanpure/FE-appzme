import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/auth-layout";
import MainLayout from "../layouts/main-layout";
import Login from "../pages/auth/login";
import SetPasswordPage from "../pages/auth/set-new-password";
import VerifyEmailPage from "../pages/auth/verify-email";
import VerifyOtpPage from "../pages/auth/verify-otp";
import ProviderPatientsPage from "../pages/provider-portal/patients/provider-patients-page";
import PublicRoute from "./public-route";
import ProviderSettingsMaster from "../pages/provider-portal/settings/provider-settings-master";
import ProfilePage from "../pages/provider-portal/settings/profile-page";
import ProviderListPage from "../pages/provider-portal/users/provider-list-page";
import PatientProfile from "../components/provider-portal/patients/patient-charting/patient-profile";
import NotAuthorized from "../pages/errors/not-authorised";
import NotFound from "../pages/errors/not-found";
import PrivateRoute from "./private-route";

export const router = createBrowserRouter([
  { path: "", element: <Navigate to={"auth/login"} /> },
  {
    path: "auth",
    element: (
      <PublicRoute>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </PublicRoute>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "verify-email", element: <VerifyEmailPage /> },
      { path: "set-password", element: <SetPasswordPage /> },
      { path: "verify-otp", element: <VerifyOtpPage /> },
    ],
  },

  {
    path: "provider",
    element: (
      <PrivateRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "patients",
        element: <Outlet />,
        children: [
          { path: "", element: <ProviderPatientsPage /> },
          { path: ":patientId", element: <PatientProfile /> },
        ],
      },
      { path: "users", element: <ProviderListPage /> },
      { path: "settings", element: <ProviderSettingsMaster /> },
      {
        path: "settings",
        element: <Outlet />,
        children: [
          { path: "", element: <ProviderSettingsMaster /> },
          {
            path: "profile",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
