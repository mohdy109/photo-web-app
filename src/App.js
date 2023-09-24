import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

const ProtectedRoute = ({ element }) => {
  const { authUser } = useAuth();

  return authUser ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;