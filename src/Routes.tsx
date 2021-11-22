import { Navigate, Route, Routes } from "react-router-dom";
import { useUser } from "./contexts/user";
import HomePage from "./pages/home";
import MessagePage from "./pages/message";
import NotificationPage from "./pages/notification";
import SettingPage from "./pages/setting";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

export default function AppRoutes() {
  const userData = useUser();

  const user = userData ? userData.user : undefined;

  return (
    <Routes>
      <Route path='/' element={user ? <HomePage /> : <LoginPage />} />
      <Route
        path='/message'
        element={user ? <MessagePage /> : <Navigate to='/' />}
      />
      <Route
        path='/notification'
        element={user ? <NotificationPage /> : <Navigate to='/' />}
      />
      <Route
        path='/setting'
        element={user ? <SettingPage /> : <Navigate to='/' />}
      />
      <Route
        path='/register'
        element={!user ? <RegisterPage /> : <Navigate to='/' />}
      />
    </Routes>
  );
}
