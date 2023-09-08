import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Profile from "./components/Profile";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivetRoute from "./components/PrivetRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  const authCheck = useAuthCheck();

  return !authCheck ? (
    <div>AuthChecking</div>
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivetRoute>
              <Profile />
            </PrivetRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
