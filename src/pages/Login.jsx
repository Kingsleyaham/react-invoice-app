import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";

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
  useEffect(() => {
    document.title = "React Firebase Invoice App - Login";
  }, []);

  return (
    <Container className="login-page">
      <FormWwrapper className="form">
        <Wrapper className="login">
          <div className="login-header">
            <h3>LOGIN</h3>
            <Typography>Please enter your credentials to login.</Typography>
          </div>
        </Wrapper>
        <Form className="login-form">
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
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
