import { Route } from "react-router-dom";
import PageHome from "@/pages/home";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import PagesAbout from "@/pages/about";

const MainRoute: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={"/"}>
          <PageHome />
        </Route>
        <Route exact path={"/about"}>
          <PagesAbout />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default MainRoute;
