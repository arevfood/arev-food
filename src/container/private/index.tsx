import { ReactNode } from "react";
import { Redirect } from "react-router";

const PrivateRoute = ({ component }: { component: ReactNode }) => {
  const isLogin = false;

  if (isLogin) {
    return component;
  }

  if (!isLogin) {
    return <Redirect to={"/welcome"} />;
  }
};

export default PrivateRoute;
