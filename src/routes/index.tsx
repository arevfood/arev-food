import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import PagesAbout from "@/pages/about";
import PagesHome from "@/pages/home";

const MainRoute: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={"/"} component={PagesHome} />
        <Route exact path={"/about"} component={PagesAbout} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default MainRoute;
