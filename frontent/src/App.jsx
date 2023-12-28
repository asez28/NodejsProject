import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import UserPage from "./pages/UsersPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "../ProtectedRoutes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rutas protegidas para el rol 'admin' */}
          <Route path="/admin/*" element={<ProtectedRoutes roles={['admin']} />}>
            <Route path="users" element={<UserPage />} />
          </Route>

          {/* Rutas protegidas para roles 'Pro', 'admin', 'Lite' */}
          <Route path="/all/*" element={<ProtectedRoutes roles={['Pro', 'admin', 'Lite']} />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Rutas protegidas para roles 'Pro', 'admin' */}
          <Route path="/pro/*" element={<ProtectedRoutes roles={['Pro', 'admin']} />}>
            <Route path="tasks" element={<TasksPage />} />
            <Route path="add-task" element={<TaskFormPage />} />
            <Route path="tasks/:id" element={<TaskFormPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
