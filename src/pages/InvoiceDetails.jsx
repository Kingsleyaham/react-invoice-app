import { useSelector, useDispatch } from "react-redux";
import {
  SET_MENU_OPEN,
  SET_EDIT,
  MARK_PAID,
  DELETE_INVOICE,
  saveInvoiceToLocalStorage,
} from "../store/invoice/invoiceSlice";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PrevButton from "../components/PrevButton";
import NotFound from "./NotFound";

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px 150px 50px 220px;
  color: white;
  @media screen and (max-width: 1024px) {
    padding: 100px 120px 20px 120px;
  }
  @media screen and (max-width: 750px) {
    padding: 100px 20px 20px 20px;
  }
`;

const Card = styled.div`
  border-radius: 8px;
  padding: 20px 25px;
  background-color: #1e2238;
`;

const StatusCard = styled(Card)`
  display: flex;
  align-items: center;
`;

const StatusTitle = styled.p`
  font-weight: 600;
  color: hsl(231, 75%, 93%);
  flex-basis: 60px;
`;

const StatusBody = styled.p`
  width: 105px;
  padding: 13px 0 13px 40px;
  border-radius: 6px;
  font-weight: 700;
  display: flex;
  align-items: center;
  position: relative;
  background-color: ${(props) => props.bgColor || "rgb(255, 145, 0)"};
  color: ${(props) => props.textColor || "rgb(255, 145, 0)"};

  & .status-circle {
    font-size: 40px;
    position: absolute;
    left: 15px;
    top: -14px;
  }
`;

const ButtonWrapper = styled.div`
  margin-left: auto;
`;

const Button = styled.button`
  padding: 16px 24px;
  border: none;
  border-radius: 24px;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;

const EditButton = styled(Button)`
  background-color: #252946;
  margin-left: auto;

  &:hover {
    background-color: #1b1d32;
  }
`;
const DeleteButton = styled(Button)`
  background-color: #ec5555;
  margin-left: 10px;
  &:hover {
    background-color: #fb999a;
  }
`;
const MarkButton = styled(Button)`
  background-color: #7b5cfa;
  margin-left: 10px;
  &:hover {
    background-color: #9175ff;
  }
`;

const Grid = styled.div`
  padding: 20px 30px;
  display: grid;
  background-color: #1e2238;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  border-radius: 8px;
`;

const GridItem = styled.div`
  grid-column-start: ${(props) => props.start || 1};
  grid-column-end: ${(props) => props.end || 2};
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.direction || "column"};
  align-items: ${(props) => props.align || "flex-start"};
  gap: ${(props) => props.gap || "10px"};
`;

const Typography = styled.p`
  font-size: ${(props) => props.fontSize || "0.85rem"};
  font-weight: ${(props) => props.fontWeight || 400};
`;

const itemContStyles = {
  gridRowStart: 4,
  gridRowEnd: 5,
  padding: "20px",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  backgroundColor: "#252946",
  gridTemplateColumns: "2fr repeat(3, 1fr)",
  rowGap: "20px",
};

const amountStyles = {
  justifyContent: "space-between",
  gridRowStart: 5,
  gridRowEnd: 6,
  padding: "20px 70px 20px 20px",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
  backgroundColor: "#0d0e17",
  marginTop: "-20px",
};

const InvoiceDetails = (props) => {
  let params = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.invoice.edit);
  const invoices = useSelector((state) => state.invoice.invoices);
  const invoice = invoices.filter((elem) => elem.id === params.id)[0] ?? null;
  const invoiceIndex = invoices.findIndex((elem) => elem.id === params.id);

  useEffect(() => {
    document.title = `React Firebase Invoice App - ${invoice?.id}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleEditInvoiceForm = () => {
    dispatch(SET_MENU_OPEN());
    dispatch(SET_EDIT({ ...edit, status: true, id: invoice.id }));
  };
  const deleteInvoice = () => {
    dispatch(DELETE_INVOICE(invoiceIndex));
    dispatch(saveInvoiceToLocalStorage());
    navigate("/");
  };

  const markInvoicePaid = () => {
    dispatch(MARK_PAID(invoiceIndex));
    dispatch(saveInvoiceToLocalStorage());
  };

  const capitalize = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  return (
    <Wrapper className="invoice-details">
      {invoice ? (
        <>
          <PrevButton text="Go Back" />
          <StatusCard>
            <StatusTitle>Status</StatusTitle>

            <StatusBody
              bgColor={
                invoice?.status.toLowerCase() === "draft"
                  ? "#292c45"
                  : invoice.status.toLowerCase() === "paid"
                  ? "rgba(51, 215, 160, 0.06)"
                  : "rgba(255, 145, 0, 0.06)"
              }
              textColor={
                invoice?.status.toLowerCase() === "draft"
                  ? "rgb(224, 228, 251)"
                  : invoice?.status.toLowerCase() === "paid"
                  ? "rgb(51, 215, 160)"
                  : "rgb(255, 145, 0)"
              }
            >
              <span className="status-circle">. </span>
              {capitalize(invoice?.status)}
            </StatusBody>
            <ButtonWrapper>
              {(invoice?.status.toLowerCase() === "draft" ||
                invoice?.status.toLowerCase() === "pending") && (
                <EditButton onClick={toggleEditInvoiceForm}>Edit</EditButton>
              )}
              <DeleteButton onClick={deleteInvoice}>Delete</DeleteButton>
              {invoice?.status.toLowerCase() === "pending" && (
                <MarkButton onClick={markInvoicePaid}>Mark as Paid</MarkButton>
              )}
            </ButtonWrapper>
          </StatusCard>
          <Grid className="details">
            <GridItem className="project-info">
              <Typography
                className="project-id"
                fontSize="16px"
                fontWeight={700}
              >
                #{invoice?.id}
              </Typography>
              <Typography className="project-desc">
                {invoice?.projectDesc}
              </Typography>
            </GridItem>
            <GridItem
              className="address"
              start={3}
              end={4}
              align="flex-end"
              gap="0px"
              style={{ justifyContent: "flex-end" }}
            >
              <Typography className="address-street">
                {invoice?.adress}
              </Typography>
              <Typography className="address-city">{invoice?.city}</Typography>
              <Typography className="address-postcode">
                {invoice?.postCode}
              </Typography>
              <Typography className="address-country">
                {invoice?.country}
              </Typography>
            </GridItem>

            <GridItem className="date">
              <Typography className="date-label">Invoice Date</Typography>
              <Typography
                className="date-body"
                fontSize="15px"
                fontWeight={700}
              >
                {invoice?.invoiceDate}
              </Typography>
            </GridItem>

            <GridItem start={2} end={3} className="name">
              <Typography className="name-label">Bill to:</Typography>
              <Typography
                className="name-body"
                fontSize="15px"
                fontWeight={700}
              >
                {invoice?.clientName}
              </Typography>
            </GridItem>

            <GridItem start={3} end={4} className="mail">
              <Typography className="mail-label">Sent to:</Typography>
              <Typography
                className="mail-body"
                fontSize="15px"
                fontWeight={700}
              >
                {invoice?.clientEmail}
              </Typography>
            </GridItem>

            <GridItem style={{ justifyContent: "flex-end" }} className="due">
              <Typography className="due-label">Invoice Due</Typography>
              <Typography className="due-body" fontSize="15px" fontWeight={700}>
                {invoice?.invoiceDue}
              </Typography>
            </GridItem>

            <GridItem start={2} end={3} gap="0px" className="client-address">
              <Typography className="client-street">
                {invoice?.clientaddress}
              </Typography>
              <Typography className="client-city">
                {invoice?.clientCity}
              </Typography>
              <Typography className="client-postcode">
                {invoice?.clientPostCode}
              </Typography>
              <Typography className="client-country">
                {invoice?.clientCountry}
              </Typography>
            </GridItem>

            <GridItem
              end={4}
              display="grid"
              style={itemContStyles}
              className="item-container"
            >
              <Typography>Item Name</Typography>
              <Typography>QTY.</Typography>
              <Typography>Price</Typography>
              <Typography>Total</Typography>
              {invoice?.projects.map((item, index) => (
                <GridItem
                  display="grid"
                  end={5}
                  style={{ gridTemplateColumns: "2fr repeat(3, 1fr)" }}
                  className="project-item"
                  key={index}
                >
                  <Typography className="prj-text" fontWeight={700}>
                    {item.name}
                  </Typography>
                  <Typography fontWeight={700} className="prj-text">
                    {item.quantity}
                  </Typography>
                  <Typography fontWeight={700} className="prj-text">
                    &#36; {item.price.toLocaleString("en-US")}
                  </Typography>
                  <Typography fontWeight={700} className="prj-text">
                    &#36; {item.total.toLocaleString("en-US")}
                  </Typography>
                </GridItem>
              ))}
            </GridItem>
            <GridItem
              end={4}
              direction="row"
              className="amount"
              style={amountStyles}
            >
              <Typography fontWeight={600} className="amount-text">
                Total Amount
              </Typography>
              <Typography
                fontSize="20px"
                fontWeight={700}
                className="amount-number"
              >
                &#36; {invoice?.totalPrice.toLocaleString("en-US")}
              </Typography>
            </GridItem>
          </Grid>
        </>
      ) : (
        <NotFound />
      )}
    </Wrapper>
  );
};

export default InvoiceDetails;
