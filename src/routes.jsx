import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Calculator from "./components/Calculator/Calculator";
import { useAuth } from "./context/AuthContext";

// Protected Route Component
const PrivateRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    // Redirect to their respective home if they try to access the other
    return (
      <Navigate
        to={user.role === "dashboard" ? "/dashboard" : "/jogo-do-bicho"}
        replace
      />
    );
  }

  return children;
};

// Placeholder components for routes
const LoginPlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
    <h1 className="text-3xl font-bold mb-4">Login Page (Under Construction)</h1>
    <p>This is a placeholder for the login route.</p>
  </div>
);

const DashboardPlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
    <h1 className="text-3xl font-bold mb-4">Dashboard (Under Construction)</h1>
    <p>Welcome to the dashboard area.</p>
  </div>
);

const JogoPlaceholder = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-white p-4">
    <h1 className="text-3xl font-bold mb-4">
      Jogo do Bicho (Under Construction)
    </h1>
    <p>Welcome to the Jogo do Bicho area.</p>
  </div>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App now works as a layout
    children: [
      {
        index: true,
        element: <Calculator />,
      },
      /*{
        path: "login",
        element: <LoginPlaceholder />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute allowedRole="dashboard">
            <DashboardPlaceholder />
          </PrivateRoute>
        ),
      },
      {
        path: "jogo-do-bicho",
        element: (
          <PrivateRoute allowedRole="jogo-do-bicho">
            <Jogo />
          </PrivateRoute>
        ),
      },*/
    ],
  },
]);
