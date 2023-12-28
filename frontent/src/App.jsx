import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import UserPage from "./pages/UsersPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateRol from "./pages/UpdateRol";
import ProtectedRoutes from "../ProtectedRoutes";
import { TasksProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
        <Navbar />
        <main className="container mx-auto px-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/users/*"
              element={<ProtectedRoutes roles={["Admin"]} />}
            >
              <Route index element={<UserPage />} />
            </Route>

            <Route
              path="/profile/*"
              element={<ProtectedRoutes roles={["Pro", "Admin", "Lite"]} />}
            >
              <Route index element={<ProfilePage />} />
            </Route>

            <Route
              path="/tasks/*"
              element={<ProtectedRoutes roles={["Pro", "Admin"]} />}
            >
              <Route index element={<TasksPage />} />
            </Route>

            <Route
              path="/add-task/*"
              element={<ProtectedRoutes roles={["Pro", "Admin"]} />}
            >
              <Route index element={<TaskFormPage />} />
            </Route>

            <Route
              path="/tasks/:id"
              element={<ProtectedRoutes roles={["Pro", "admin"]} />}
            >
              <Route index element={<TaskFormPage />} />
            </Route>

            <Route
              path="/upgrade"
              element={<ProtectedRoutes roles={["Lite"]} />}
            >
              <Route index element={<UpdateRol />} />
            </Route>
          </Routes>
          </main>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  );
}

export default App;
