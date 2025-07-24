import "./App.css";
import { BrowserRouter, useRoutes } from "react-router-dom";
import Login from "./auth/Login";
import { AuthProvider } from "./contexts/authContext";
import Header from "./header";
import Register from "./auth/Register";
import Home from "./pages/Home";
import InVoice from "./pages/invoice";
import AddInvoice from "./pages/invoice/AddInvoice";
import Products from "./pages/product";
import Customer from "./pages/customer";
import { Toaster } from "react-hot-toast";

function AppRoutes() {
  const routesArray = [
    { path: "*", element: <Login /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/home", element: <Home /> },
    { path: "/invoice", element: <InVoice /> },
    { path: "/invoice/create", element: <AddInvoice /> },
    // 🔄 Add new ones below
    { path: "/customers", element: <Customer /> },
    { path: "/products", element: <Products /> },
  ];
  return useRoutes(routesArray);
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Toaster position="top-right" />
        <div className="pt-14 px-4">
          {" "}
          <AppRoutes />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
