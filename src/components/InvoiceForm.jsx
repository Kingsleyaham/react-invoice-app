import styled from "styled-components";
import { Suspense } from "react";
import DeleteIcon from "./DeleteIcon";
import { useSelector, useDispatch } from "react-redux";
// import { Formik } from "formik";
import {
  SET_MENU_OPEN,
  NEW_INVOICE,
  UPDATE_INVOICE,
  saveInvoiceToLocalStorage,
} from "../store/invoice/invoiceSlice";
import { useEffect, useState, useRef } from "react";
import countries from "./../data/countries";
import { nanoid } from "nanoid";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 750px;
  height: 100vh;
  padding: 56px 32px 2rem 129px;
  display: flex;
  flex-direction: column;
  background-color: #141624;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  color: white;
  z-index: 2;
  transition: all 0.5s ease-in-out;

  @media screen and (max-width: 1024px) {
    top: 80px;
    width: 100vw;
    height: 100vh;
    padding: 20px 20px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  } ;
`;

const Box = styled.div``;

const Title = styled.h2`
  font-size: ${(props) => props.fontSize || "1.5rem"};
  font-weight: ${(props) => props.fontWeight || 700};
  margin-bottom: ${(props) => props.marginBottom || "1.5rem"};

  @media screen and (max-width: 1024px) {
    font-size: ${(props) => props.fontSize || "1.3rem"};
    margin-bottom: ${(props) => props.marginBottom || "0.75rem"};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 24px 10px 10px;
  gap: 24px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;

  @media screen and (max-width: 1024px) {
    padding: 0 10px 10px 10px;
    gap: 16px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > ${InputWrapper} {
    width: ${(props) => props.width || "30%"};
  }
`;

const InputText = styled.input`
  padding: 16px 13px 16px 20px;
  border-radius: 4px;
  border: 1px solid hsl(233, 30%, 21%);
  outline: none;
  background-color: hsl(233, 31%, 17%);
  font-weight: 700;
  color: white;

  @media screen and (max-width: 1024px) {
    padding: 10px 8px 10px 8px;
  }
`;

const Select = styled(InputText)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 12px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 6px;
  }
`;

const ButtonWrapper = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  padding-right: 40px;
  padding-left: 10px;

  @media screen and (max-width: 1024px) {
    padding-top: 2rem;
    padding-right: 20px;
    padding-left: 5px;
  }
`;

const Button = styled.button`
  border: none;
  border-radius: 24px;
  cursor: pointer;
  padding: 17px 24px;
  color: white;
  font-weight: 700;
  background: ${(props) => props.bgColor || "#252946"};

  @media screen and (max-width: 1024px) {
    padding: 8px 12px;
  }
`;

const AddButton = styled(Button)`
  width: 100%;
  background-color: #252946;
  margin-top: 20px;

  @media screen and (max-width: 1024px) {
    margin-top: 10px;
  }
`;

const AddedProject = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 10px;
  } ;
`;

const CustomBox = styled(Box)`
  display: flex;
  align-items: center;
  padding: 14px 13px 14px 20px;
  border-radius: 4px;
  border: 1px solid hsl(233, 30%, 21%);
  background-color: hsl(233, 31%, 17%);
  font-weight: 700;
  flex-basis: ${(props) => props.flexBasis || "20%"};

  @media screen and (max-width: 1024px) {
    padding: 8px 6px 8px 6px;
  }
`;

const CustomLabel = styled(Label)`
  flex-basis: ${(props) => props.flexBasis || "20%"};
`;

const TotalBox = styled(Box)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 700;
  color: white;
  font-size: 1rem;

  @media screen and (max-width: 1024px) {
    font-size: 0.85rem;
  }

  > .price-symbol {
    margin-right: 5px;
  }
`;

InputText.defaultProps = {
  type: "text",
};

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const menuIsOpen = useSelector((state) => state.invoice.menuIsOpen);
  const editMode = useSelector((state) => state.invoice.edit);
  const invoices = useSelector((state) => state.invoice.invoices);
  const invoice = editMode.status
    ? invoices.filter((item) => item.id === editMode.id)[0]
    : null;
  const invoiceIndex = invoices.findIndex((elem) => elem.id === invoice?.id);
  const [invoiceForm, setInvoiceForm] = useState({
    id: "",
    adress: "",
    city: "",
    postCode: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientAdress: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    invoiceDate: new Date(Date.now()).toISOString().slice(0, 10),
    invoiceDue: null,
    paymentTerm: 7,
    projectDesc: "",
    projects: [],
    totalPrice: "",
    status: "pending",
  });

  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({
    adress: "",
    city: "",
    postCode: "",
    country: "",
    clientName: "",
    clientEmail: "",
    clientAdress: "",
    clientCity: "",
    clientPostCode: "",
    clientCountry: "",
    invoiceDate: "",
    projectDesc: "",
  });

  const [projectTotalPrice, setProjectTotalPrice] = useState(0);
  const projectNameval = useRef(null);
  const projectPriceVal = useRef(null);
  const projectQtyVal = useRef(null);

  useEffect(() => {
    if (editMode.status) {
      setInvoiceForm((prev) => ({ ...prev, ...invoice }));
      resetError();
    } else {
      resetForm();
      resetError();
    }
  }, [editMode, invoice]);

  const reCalculateTotal = () => {
    setProjectTotalPrice(
      projectQtyVal.current.value * projectPriceVal.current.value || 0
    );
  };

  const addNewProject = (e) => {
    e.preventDefault();
    const quantity = projectQtyVal.current.value;
    const price = projectPriceVal.current.value;
    const name = projectNameval.current.value;

    if (!quantity || !price || price <= 0 || !name) {
      setError(true);
      return;
    }

    const newProject = { name, quantity, price, total: projectTotalPrice };

    setInvoiceForm((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));

    projectQtyVal.current.value = 1;
    projectPriceVal.current.value = 0;
    projectNameval.current.value = "";
    setProjectTotalPrice(0);
  };

  const deleteProject = (position) => {
    const filteredProjects = invoiceForm.projects.filter(
      (proj, index) => index !== position
    );

    setInvoiceForm((prev) => ({
      ...prev,
      projects: filteredProjects,
    }));
  };

  const handleChange = (e) => {
    setInvoiceForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));

    if (e.target.value === "") {
      setErrors((prev) => ({ ...prev, [e.target.name]: "required" }));
    }

    if (e.target.name === "clientEmail" && !isValidEmail(e.target.value)) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "required" }));
    }
  };

  const saveInvoice = (type) => {
    if (!isValidForm()) return;

    if (invoiceForm.projects.length <= 0) {
      setError(true);
      return;
    }

    setError(false);

    const totalPrice = invoiceForm.projects.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);

    const status = type === "draft" ? "draft" : "pending";

    const formData = {
      ...invoiceForm,
      invoiceDue: calculateDueDate(
        invoiceForm.invoiceDate,
        invoiceForm.paymentTerm
      ),
      totalPrice,
      status,
    };

    if (!editMode.status) {
      formData.id = nanoid().slice(0, 6).toUpperCase();
      dispatch(NEW_INVOICE(formData));
    } else {
      dispatch(UPDATE_INVOICE({ index: invoiceIndex, newInvoice: formData }));
    }

    dispatch(saveInvoiceToLocalStorage());
    dispatch(SET_MENU_OPEN());
    resetForm();
  };

  const calculateDueDate = (date, days) => {
    date = new Date(date);
    date.setDate(date.getDate() + parseInt(days));
    const dueDate = date.toISOString().substring(0, 10);
    return dueDate;
  };

  const isValidForm = () => {
    let errorCount = 0;
    for (const key in errors) {
      if (!invoiceForm[key]) {
        setErrors((prev) => ({ ...prev, [key]: "required" }));
        errorCount++;
      } else {
        setErrors((prev) => ({ ...prev, [key]: "" }));
      }
    }

    if (!isValidEmail(invoiceForm.clientEmail)) {
      setErrors((prev) => ({ ...prev, clientEmail: "required" }));
      errorCount++;
    }

    return errorCount ? false : true;
  };

  const isValidEmail = (email) => {
    let regexp =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regexp.test(email);
  };

  const resetForm = () => {
    setInvoiceForm({
      id: "",
      adress: "",
      city: "",
      postCode: "",
      country: "",
      clientName: "",
      clientEmail: "",
      clientAdress: "",
      clientCity: "",
      clientPostCode: "",
      clientCountry: "",
      invoiceDate: new Date(Date.now()).toISOString().slice(0, 10),
      invoiceDue: null,
      paymentTerm: 7,
      projectDesc: "",
      projects: [],
      totalPrice: "",
      status: "pending",
    });
  };

  const resetError = () => {
    setErrors({
      adress: "",
      city: "",
      postCode: "",
      country: "",
      clientName: "",
      clientEmail: "",
      clientAdress: "",
      clientCity: "",
      clientPostCode: "",
      clientCountry: "",
      invoiceDate: "",
      projectDesc: "",
    });
  };

  return (
    <Suspense fallback={<div>You are yet to create an invoice</div>}>
      <Container
        style={{
          transform: menuIsOpen ? "translateX(0px)" : "translateX(-750px)",
        }}
      >
        <Title>New Invoice</Title>

        <Form>
          <Title
            as="h3"
            fontSize=".85rem"
            marginBottom="0.2rem"
            style={{ color: "rgb(123, 92, 250)" }}
          >
            Bill From
          </Title>
          <InputWrapper>
            <Label htmlFor="street" className={errors.adress && "error"}>
              Street Address
            </Label>
            <InputText
              name="adress"
              className={errors.adress && "errorborder"}
              onChange={handleChange}
              value={invoiceForm.adress}
            ></InputText>
          </InputWrapper>

          <InputGroup>
            <InputWrapper>
              <Label htmlFor="city" className={errors.city && "error"}>
                City
              </Label>
              <InputText
                name="city"
                className={errors.city && "errorborder"}
                onChange={handleChange}
                value={invoiceForm.city}
              ></InputText>
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="postcode" className={errors.postCode && "error"}>
                Post Code
              </Label>
              <InputText
                name="postCode"
                className={errors.postCode && "errorborder"}
                onChange={handleChange}
                value={invoiceForm.postCode}
              ></InputText>
            </InputWrapper>
            <InputWrapper>
              <Label htmlFor="country" className={errors.country && "error"}>
                Country
              </Label>
              <InputText
                as="select"
                name="country"
                className={errors.country && "errorborder"}
                onChange={handleChange}
                value={invoiceForm.country.toLowerCase()}
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option value={country.toLowerCase()} key={index}>
                    {country}
                  </option>
                ))}
              </InputText>
            </InputWrapper>
          </InputGroup>

          <Title
            as="h3"
            fontSize=".85rem"
            marginBottom="0.2rem"
            style={{ color: "rgb(123, 92, 250)" }}
          >
            Bill To
          </Title>
          <InputWrapper>
            <Label
              htmlFor="clientName"
              className={errors.clientName && "error"}
            >
              Client's Name
            </Label>
            <InputText
              name="clientName"
              className={errors.clientName && "errorborder"}
              onChange={handleChange}
              value={invoiceForm.clientName}
            ></InputText>
          </InputWrapper>
          <InputWrapper>
            <Label
              htmlFor="clientEmail"
              className={errors.clientEmail && "error"}
            >
              Client's Email
            </Label>
            <InputText
              name="clientEmail"
              className={errors.clientEmail && "errorborder"}
              onChange={handleChange}
              value={invoiceForm.clientEmail}
              // onBlur={validateEmail}
            ></InputText>
          </InputWrapper>
          <InputWrapper>
            <Label
              htmlFor="clientAddress"
              className={errors.clientAdress && "error"}
            >
              Client's Address
            </Label>
            <InputText
              name="clientAdress"
              className={errors.clientAdress && "errorborder"}
              onChange={handleChange}
              value={invoiceForm.clientAdress}
            ></InputText>
          </InputWrapper>

          <InputGroup>
            <InputWrapper>
              <Label
                htmlFor="clientCity"
                className={errors.clientCity && "error"}
              >
                City
              </Label>
              <InputText
                name="clientCity"
                className={errors.clientCity && "errorborder"}
                onChange={handleChange}
                value={invoiceForm.clientCity}
              ></InputText>
            </InputWrapper>
            <InputWrapper>
              <Label
                htmlFor="clientPostCode"
                className={errors.clientPostCode && "error"}
              >
                Post Code
              </Label>
              <InputText
                name="clientPostCode"
                className={errors.clientPostCode && "errorborder"}
                onChange={handleChange}
                value={invoiceForm.clientPostCode}
              ></InputText>
            </InputWrapper>
            <InputWrapper>
              <Label
                htmlFor="clientCountry"
                className={errors.clientCountry && "error"}
              >
                Country
              </Label>
              <InputText
                as="select"
                name="clientCountry"
                className={errors.clientCountry && "errorborder"}
                onChange={handleChange}
                value={invoiceForm.clientCountry.toLowerCase()}
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option value={country.toLowerCase()} key={index}>
                    {country}
                  </option>
                ))}
              </InputText>
            </InputWrapper>
          </InputGroup>

          <InputGroup width="47%">
            <InputWrapper>
              <Label
                htmlFor="invoiceDate"
                className={errors.invoiceDate && "error"}
              >
                Invoice Date
              </Label>
              <InputText
                type="date"
                className={errors.invoiceDate && "errorborder"}
                name="invoiceDate"
                value={invoiceForm.invoiceDate}
                onChange={(e) =>
                  setInvoiceForm((prev) => ({
                    ...prev,
                    invoiceDate: new Date(e.target.value)
                      .toISOString()
                      .substring(0, 10),
                  }))
                }
              ></InputText>
            </InputWrapper>
            <InputWrapper>
              <Label
                htmlFor="paymentTerm"
                className={errors.paymentTerm && "error"}
              >
                Payment Term
              </Label>
              <Select
                as="select"
                className={errors.paymentTerm && "errorborder"}
                name="paymentTerm"
                value={invoiceForm.paymentTerm}
                onChange={(e) =>
                  setInvoiceForm((prev) => ({
                    ...prev,
                    paymentTerm: e.target.value,
                  }))
                }
              >
                <option value="1">Next 1 Day</option>
                <option value="7">Next 7 Days</option>
                <option value="14">Next 14 Days</option>
                <option value="30">Next 30 Days</option>
              </Select>
            </InputWrapper>
          </InputGroup>

          <InputWrapper>
            <Label
              htmlFor="projectDesc"
              className={errors.projectDesc && "error"}
            >
              Project Description
            </Label>
            <InputText
              name="projectDesc"
              className={errors.projectDesc && "errorborder"}
              onChange={handleChange}
              value={invoiceForm.projectDesc}
            ></InputText>
          </InputWrapper>

          <Box>
            <Title>Item List</Title>
            <AddedProject className="added-projects">
              {invoiceForm.projects.length > 0 && (
                <Box>
                  <Box
                    style={{ display: "flex", gap: "15px" }}
                    className="project-labels"
                  >
                    <CustomLabel id="label-name" flexBasis="40%">
                      Item Name
                    </CustomLabel>
                    <CustomLabel id="label-qty" flexBasis="10%">
                      Qty.
                    </CustomLabel>
                    <CustomLabel id="label-price">Price</CustomLabel>
                    <CustomLabel id="label-total">Total</CustomLabel>
                  </Box>
                  {invoiceForm.projects.map((project, index) => (
                    <Box
                      style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "10px",
                      }}
                      className="added-projects-info"
                      key={index}
                    >
                      <CustomBox flexBasis="40%" className="added-project-name">
                        {project.name}
                      </CustomBox>
                      <CustomBox flexBasis="10%" className="added-project-qty">
                        {project.quantity}
                      </CustomBox>
                      <CustomBox className="added-project-price">
                        {project.price}
                      </CustomBox>
                      <CustomBox className="added-project-total">
                        <span className="price-symbol">&#36;</span>
                        {project.total}
                      </CustomBox>
                      <div className="" onClick={() => deleteProject(index)}>
                        <DeleteIcon />
                      </div>
                    </Box>
                  ))}
                </Box>
              )}
            </AddedProject>

            <InputGroup
              style={{ gap: "16px" }}
              className="input-group"
              id="project"
            >
              <InputWrapper
                style={{ width: "50%" }}
                className="input-item"
                id="project-name"
              >
                <Label htmlFor="item-name" className={error && "error"}>
                  Item Name
                </Label>
                <InputText
                  name="itemName"
                  placeholder="Enter Product Name..."
                  className={
                    error
                      ? !projectNameval.current.value
                        ? "errorborder"
                        : ""
                      : ""
                  }
                  ref={projectNameval}
                  onChange={() => setError(false)}
                />
              </InputWrapper>
              <InputWrapper
                style={{ width: "10%" }}
                className="input-item"
                id="project-qty"
              >
                <Label htmlFor="quantity"> Qty. </Label>
                <InputText
                  type="number"
                  name="quantity"
                  id="quantity"
                  defaultValue={1}
                  ref={projectQtyVal}
                  onChange={(e) =>
                    reCalculateTotal(
                      e.target.value,
                      projectPriceVal.current.value
                    )
                  }
                />
              </InputWrapper>
              <InputWrapper
                style={{ width: "20%" }}
                className="input-item"
                id="project-price"
              >
                <Label htmlFor="price">Price</Label>
                <InputText
                  type="number"
                  name="price"
                  id="price"
                  className={
                    error
                      ? projectPriceVal.current.value <= 0
                        ? "errorborder"
                        : ""
                      : ""
                  }
                  defaultValue={0}
                  ref={projectPriceVal}
                  onChange={(e) => {
                    setError(false);
                    reCalculateTotal(
                      e.target.value,
                      projectQtyVal.current.value
                    );
                  }}
                />
              </InputWrapper>
              <InputWrapper
                style={{ width: "20%" }}
                className="input-item"
                id="project-total"
              >
                <Label htmlFor="total"> Total </Label>
                <TotalBox id="total">
                  <span className="price-symbol">&#36;</span>
                  {parseFloat(projectTotalPrice).toFixed(2)}
                </TotalBox>
              </InputWrapper>
            </InputGroup>

            <AddButton onClick={addNewProject}>Add New Item</AddButton>
          </Box>
        </Form>

        <ButtonWrapper>
          <Button bgColor="#252946" onClick={() => dispatch(SET_MENU_OPEN())}>
            Discard
          </Button>
          <div>
            {editMode.status ? (
              <Button
                type="submit"
                bgColor="#7b5cfa"
                onClick={() => saveInvoice("update")}
              >
                Save Changes
              </Button>
            ) : (
              <>
                <Button bgColor="#373b53" onClick={() => saveInvoice("draft")}>
                  Save as Draft
                </Button>
                &nbsp;&nbsp;
                <Button bgColor="#7b5cfa" onClick={() => saveInvoice("new")}>
                  Save &amp; Send
                </Button>
                &nbsp;&nbsp;
              </>
            )}
          </div>
        </ButtonWrapper>
      </Container>
    </Suspense>
  );
};

export default InvoiceForm;
