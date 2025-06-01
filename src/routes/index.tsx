import Home from "@/pages/home";
import { IonRouterOutlet } from "@ionic/react";
import { Route } from "react-router-dom";

export default function MainRoute() {
  return (
    <IonRouterOutlet>
      <Route exact path={"/"}>
        <Home />
      </Route>
    </IonRouterOutlet>
  );
}
