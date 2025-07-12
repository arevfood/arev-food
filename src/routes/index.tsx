import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import PagesAbout from "@/pages/about";
import PagesHome from "@/pages/home";
import PagesWelcome from "@/pages/welcome";
import PrivateRoute from "@/container/private";
import PagesLogin from "@/pages/login";
import PagesSignup from "@/pages/signup";
import PagesSearch from "@/pages/search";
import PagesFavorite from "@/pages/favorite";
import PagesSetting from "@/pages/setting";
import PageFoodDetails from "@/pages/food-details";

const MainRoute: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path={"/welcome"} component={PagesWelcome} />
        <Route exact path={"/login"} component={PagesLogin} />
        <Route exact path={"/signup"} component={PagesSignup} />
        <Route
          exact
          path={"/"}
          render={() => <PrivateRoute component={<PagesHome />} />}
        />
        <Route
          exact
          path={"/search"}
          render={() => <PrivateRoute component={<PagesSearch />} />}
        />
        <Route
          exact
          path={"/favorite"}
          render={() => <PrivateRoute component={<PagesFavorite />} />}
        />
        <Route
          exact
          path={"/setting"}
          render={() => <PrivateRoute component={<PagesSetting />} />}
        />
        <Route
          exact
          path={"/food/:id"}
          render={() => <PrivateRoute component={<PageFoodDetails />} />}
        />
        <Route exact path={"/about"} component={PagesAbout} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default MainRoute;
