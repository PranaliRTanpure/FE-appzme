import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import PatientProfile from "../components/provider-portal/patients/patient-charting/patient-profile";
import AuthLayout from "../layouts/auth-layout";
import MainLayout from "../layouts/main-layout";
import Login from "../pages/auth/login";
import SetPasswordPage from "../pages/auth/set-new-password";
import VerifyEmailPage from "../pages/auth/verify-email";
import VerifyOtpPage from "../pages/auth/verify-otp";
import NotAuthorized from "../pages/errors/not-authorised";
import NotFound from "../pages/errors/not-found";
import ProviderPatientsPage from "../pages/provider-portal/patients/provider-patients-page";
import ProfilePage from "../pages/provider-portal/settings/profile-page";
import ProviderSettingsMaster from "../pages/provider-portal/settings/provider-settings-master";
import ProviderListPage from "../pages/provider-portal/users/provider-list-page";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";
// import PatientsRegistration from "../pages/super-user-portal/patients/patients-registration";
import PatientRegistrationStepper from "../components/super-user/patients/patient-registration-stepper";
import DevicesRegistration from "../pages/super-user-portal/devices/devices";

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
    path: "super-user",
    element: (
      <PrivateRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </PrivateRoute>
    ),
    children: [
      { path: "patient-registration", element: <PatientRegistrationStepper /> },
      { path: "devices", element: <DevicesRegistration /> },
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
