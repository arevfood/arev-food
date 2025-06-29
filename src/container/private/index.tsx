import { useAuth } from "@/hooks/data/authentication";
import { ReactNode } from "react";
import { Redirect } from "react-router";

const PrivateRoute = ({ component }: { component: ReactNode }) => {
  const { session } = useAuth();

  if (session) {
    return component;
  }

  if (!session) {
    return <Redirect to={"/welcome"} />;
  }
};

export default PrivateRoute;
