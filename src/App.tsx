import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user";
import AppRoutes from "./Routes";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
