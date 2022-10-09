import useAuth from "../custom hooks/useAuth";
import { Navigate } from "react-router-dom";

const Guest = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? <Navigate to="/" /> : children;
};

export default Guest;
