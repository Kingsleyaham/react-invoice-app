import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvoiceDetails from "./pages/InvoiceDetails";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import InvoiceForm from "./components/InvoiceForm";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Header />
      <InvoiceForm />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/invoice/:id" element={<InvoiceDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
