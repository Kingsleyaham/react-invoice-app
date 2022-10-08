import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CREATE_USER, SET_USER_DATA } from "../store/auth/userAuthSlice";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";

// react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const FormWrapper = styled(Box)`
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

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    document.title = "React Firebase Invoice App - Signup";
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, username, password } = data;
    try {
      // create auth user
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // add user to user collection
      const uid = auth.currentUser.uid;
      console.log(response);
      try {
        const docRef = await addDoc(collection(db, "users"), {
          id: uid,
          email: response.user.email,
          username,
        });
        console.log(docRef);

        // update store
        dispatch(CREATE_USER({ user: auth.currentUser.toJSON() }));
        const userData = {
          ...auth.currentUser.toJSON(),
          id: uid,
          email: response.user.email,
          username,
        };
        dispatch(SET_USER_DATA({ userData }));
        toast.success("signup successful");

        // redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    let message = "";
    switch (error.code) {
      case "auth/email-already-in-use":
        message = `Email is already in use.`;
        console.log(message);
        break;
      case "auth/invalid-email":
        message = `Invalid email address`;
        console.log(`Invalid email address`);
        break;
      case "auth/operation-not-allowed":
        message = `Error during sign up`;
        console.log(`Error during sign up`);
        break;
      default:
        console.log(error.message);
        break;
    }

    toast.error(message);
  };

  return (
    <Container className="login-page">
      <FormWrapper className="form">
        <Wrapper className="login">
          <div className="login-header">
            <h3>REGISTER</h3>
            <Typography>Please enter your credentials to signup.</Typography>
          </div>
        </Wrapper>
        <Form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            className={errors.username && "errorborder"}
            {...register("username", {
              required: true,
              pattern: /^(?=[a-z_\d]*[a-z])[a-z_\d]{3,}$/,
            })}
          ></Input>
          <Input
            type="text"
            placeholder="Email"
            name="email"
            className={errors.email && "errorborder"}
            {...register("email", {
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            className={errors.password && "errorborder"}
            {...register("password", { required: true, minLength: 8 })}
          />
          <Button type="submit">Signup</Button>
          <Typography
            className="message"
            style={{ margin: "15px 0 0", color: "#b3b3b3", fontSize: "12px" }}
          >
            Already registered?
            <Link
              to="/login"
              style={{ color: "#4caf50", textDecoration: "none" }}
            >
              Login
            </Link>
            .
          </Typography>
        </Form>
      </FormWrapper>
      <ToastContainer />
    </Container>
  );
};

export default Register;
