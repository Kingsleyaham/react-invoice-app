import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import Routers from "./routers/Routers";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchInvoicesFromLocalStorage } from "./store/invoice/invoiceSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoicesFromLocalStorage());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <Header />
      <InvoiceForm />
      <Routers />
    </div>
  );
}

export default App;
