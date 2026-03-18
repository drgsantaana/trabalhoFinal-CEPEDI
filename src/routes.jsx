import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Calculator from "./pages/calculator";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Perfil from "./pages/perfil";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Calculator />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "perfil/:id",
        element: (
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
