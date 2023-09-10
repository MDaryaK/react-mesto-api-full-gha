import {Redirect} from "react-router-dom";

export default function ProtectedRouter({ isAuth, children }) {
  if (!isAuth) {
    return <Redirect to="/sign-in" />;
  }

  return children;
}