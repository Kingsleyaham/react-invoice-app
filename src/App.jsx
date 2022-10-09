import Header from "./components/Header";
import InvoiceForm from "./components/InvoiceForm";
import { Suspense } from "react";
import Routers from "./routers/Routers";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Header />
        <InvoiceForm />
        <Routers />
      </div>
    </Suspense>
  );
}

export default App;
