import "./App.scss";
import { ReactLocation, Router } from "react-location";
import HomePage from "./pages/home";
import MessagePage from "./pages/message";
import NotificationPage from "./pages/notification";
import SettingPage from "./pages/setting";

const location = new ReactLocation();

function App() {
  return (
    <Router
      location={location}
      routes={[
        { path: "/", element: <HomePage /> },
        { path: "/message", element: <MessagePage /> },
        { path: "/notification", element: <NotificationPage /> },
        { path: "/setting", element: <SettingPage /> },
      ]}
    />
  );
}

export default App;
