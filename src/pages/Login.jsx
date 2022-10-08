import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Box = styled.div``;

const Container = styled(Box)`
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
`;

const Wrapper = styled(Box)`
  margin-top: -31px;
  margin-bottom: 26px;
`;

const FormWwrapper = styled(Box)`
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`;

const Form = styled.form``;

const Input = styled.input`
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

const Button = styled.button`
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background-color: #1e2139;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
`;

const Typography = styled.p`
  font-size: ${(props) => props.fontSize || "0.85rem"};
  font-weight: ${(props) => props.fontWeight || 400};
`;

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const password = useRef(null);
  const email = useRef(null);

  useEffect(() => {
    document.title = "React Firebase Invoice App - Login";
  }, []);

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidForm(email.current, password.current)) return;

    console.log(email.current.value, password.current.value);
  };

  const handleChange = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));

    if (e.target.value === "") {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: "required",
      }));
    }

    if (e.target.name === "email" && !isValidEmail(e.target.value)) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "required" }));
    }
  };

  const isValidForm = (email, password) => {
    if (!email.value) {
      setErrors((prev) => ({
        ...prev,
        email: "required",
        password: "",
      }));
      return;
    }

    if (!isValidEmail(email.value)) {
      setErrors((prev) => ({
        ...prev,
        email: "required",
        password: "",
      }));
      return;
    }

    if (!password.value) {
      setErrors((prev) => ({
        ...prev,
        email: "",
        password: "required",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, email: "", password: "" }));

    return true;
  };

  const isValidEmail = (email) => {
    let regexp =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regexp.test(email);
  };

  return (
    <Container className="login-page">
      <FormWwrapper className="form">
        <Wrapper className="login">
          <div className="login-header">
            <h3>LOGIN</h3>
            <Typography>Please enter your credentials to login.</Typography>
          </div>
        </Wrapper>
        <Form className="login-form" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="email"
            name="email"
            ref={email}
            className={errors.email && "errorborder"}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            ref={password}
            className={errors.password && "errorborder"}
            onChange={handleChange}
          />
          <Button>login</Button>
          <Typography
            className="message"
            style={{ margin: "15px 0 0", color: "#b3b3b3", fontSize: "12px" }}
          >
            Not registered?
            <Link
              to="/register"
              style={{ color: "#4caf50", textDecoration: "none" }}
            >
              Create an account
            </Link>
            .
          </Typography>
        </Form>
      </FormWwrapper>
    </Container>
  );
};

export default Login;
