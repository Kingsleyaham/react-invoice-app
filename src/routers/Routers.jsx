import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import InvoiceDetails from "../pages/InvoiceDetails";

import NotFound from "../pages/NotFound";

const Routers = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/invoice/:id" element={<InvoiceDetails />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Routers;
