import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthListener } from "./store/auth/userAuthSlice";
import Home from "./pages/Home";
import InvoiceDetails from "./pages/InvoiceDetails";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import InvoiceForm from "./components/InvoiceForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Suspense } from "react";

function App() {
  const dispatch = useDispatch();
  // (async () => await dispatch(setAuthListener()))();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Header />
        <InvoiceForm />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route path="/invoice/:id" element={<InvoiceDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
