import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import PagesAbout from "@/pages/about";
import PagesHome from "@/pages/home";
import PagesWelcome from "@/pages/welcome";
import PrivateRoute from "@/container/private";
import PagesLogin from "@/pages/login";

const MainRoute: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={"/welcome"} component={PagesWelcome} />
        <Route exact path={"/login"} component={PagesLogin} />
        <Route
          exact
          path={"/"}
          render={() => <PrivateRoute component={<PagesHome />} />}
        />
        <Route exact path={"/about"} component={PagesAbout} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default MainRoute;
