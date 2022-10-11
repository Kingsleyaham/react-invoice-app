import { useSelector } from "react-redux";
import { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import InvoiceHeader from "../components/InvoiceHeader";
// import { SET_EDIT, SET_MENU_OPEN } from "../store/invoice/invoiceSlice";
import InvoiceCard from "../components/InvoiceCard";

const Wrapper = styled.main`
  padding: 50px 140px 50px 180px;
  height: 100vh;
  width: 100%;

  @media screen and (max-width: 1024px) {
    padding: 80px 120px 20px 120px;
  }

  @media screen and (max-width: 768px) {
    padding: 80px 20px 20px 20px;
  }
`;

const Home = (props) => {
  const invoices = useSelector((state) => state.invoice.invoices);
  const filter = useSelector((state) => state.invoice.filter);
  const [filteredInvoice, setFilteredInvoice] = useState([]);

  useEffect(() => {
    document.title = "React Invoice App";
  }, []);

  useEffect(() => {
    if (filter.length === 0) {
      setFilteredInvoice([...invoices]);
    } else {
      const filtered = invoices.filter((item) =>
        filter.includes(item.status.toLowerCase())
      );
      setFilteredInvoice(filtered);
    }
  }, [filter, invoices]);

  return (
    <Wrapper>
      <InvoiceHeader />
      <Suspense fallback={<div>loading...</div>}>
        {filteredInvoice.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            id={invoice.id}
            due={invoice.invoiceDue}
            name={invoice.clientName}
            price={invoice.totalPrice}
            status={invoice.status}
          />
        ))}
      </Suspense>
    </Wrapper>
  );
};

export default Home;
