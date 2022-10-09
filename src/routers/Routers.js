import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import InvoiceDetails from "../pages/InvoiceDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import RequireAuth from "./RequireAuth";
import Guest from "./Guest";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        exact
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/invoice/:id"
        element={
          <RequireAuth>
            <InvoiceDetails />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
