import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

import FaxPage from "@/pages/super-user-portal/communication/fax-page";
import MessagesPage from "@/pages/super-user-portal/communication/messages-page";
import TasksPage from "@/pages/super-user-portal/communication/tasks-page";
import InterpretationNotePage from "@/pages/super-user-portal/encounter/interpretation-note-page";
import ProviderSettingsPage from "@/pages/super-user-portal/settings/settings-page";

import DeviceInventoryDetails from "../components/super-user/devices/device-inventory/device-inventory-details/device-inventory-details";
import DeviceSchedulling from "../components/super-user/devices/device-scheduling/device-scheduling";
import AuthLayout from "../layouts/auth-layout";
import MainLayout from "../layouts/main-layout";
import Login from "../pages/auth/login";
import SetPasswordPage from "../pages/auth/set-new-password";
import VerifyEmailPage from "../pages/auth/verify-email";
import VerifyOtpPage from "../pages/auth/verify-otp";
import NotAuthorized from "../pages/errors/not-authorised";
import NotFound from "../pages/errors/not-found";
import DeviceManufacturersPage from "../pages/super-user-portal/devices/device-manufacturers-page";
import DevicesRegistration from "../pages/super-user-portal/devices/devices";
import EncounterPage from "../pages/super-user-portal/encounter/encounter-page";
import PatientsRegistration from "../pages/super-user-portal/patients/patients-registration";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";

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
      { path: "patient-registration", element: <PatientsRegistration /> },
      {
        path: "encounter",
        element: <Outlet />,
        children: [
          { path: "", element: <EncounterPage /> },
          { path: "interpretation-note", element: <InterpretationNotePage /> },
        ],
      },
      {
        path: "devices",
        element: <Outlet />,
        children: [
          { path: "inventory", element: <DevicesRegistration /> },
          { path: ":deviceId", element: <DeviceInventoryDetails /> },
          { path: "scheduling", element: <DeviceSchedulling /> },
          { path: "manufacturers", element: <DeviceManufacturersPage /> },
        ],
      },
      {
        path: "communications",
        element: <Outlet />,
        children: [
          { path: "tasks", element: <TasksPage /> },
          { path: "fax", element: <FaxPage /> },
          { path: "messages", element: <MessagesPage /> },
        ],
      },
      { path: "settings", element: <ProviderSettingsPage /> },
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
