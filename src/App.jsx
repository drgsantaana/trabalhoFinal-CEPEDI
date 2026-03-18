import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <main className={user ? "pt-14" : ""}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
