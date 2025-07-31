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
import PagesRecommend from "@/pages/recommend";
import PagesSettingProfile from "@/pages/setting/profile";
import PagesSettingHealthData from "@/pages/setting/health-data";
import PagesSettingChangePassword from "@/pages/setting/change-password";
import PagesSettingDeleteAccount from "@/pages/setting/delete-account";
import PagesSettingMenstrualCycle from "@/pages/setting/menstrual-cycle";

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
          path={"/recommendation"}
          render={() => <PrivateRoute component={<PagesRecommend />} />}
        />
        <Route
          exact
          path={"/setting"}
          render={() => <PrivateRoute component={<PagesSetting />} />}
        />
        <Route
          exact
          path={"/setting/profile"}
          render={() => <PrivateRoute component={<PagesSettingProfile />} />}
        />
        <Route
          exact
          path={"/setting/health-data"}
          render={() => <PrivateRoute component={<PagesSettingHealthData />} />}
        />
        <Route
          exact
          path={"/setting/change-password"}
          render={() => (
            <PrivateRoute component={<PagesSettingChangePassword />} />
          )}
        />
        <Route
          exact
          path={"/setting/delete-account"}
          render={() => (
            <PrivateRoute component={<PagesSettingDeleteAccount />} />
          )}
        />
        <Route
          exact
          path={"/setting/menstrual-cycle"}
          render={() => (
            <PrivateRoute component={<PagesSettingMenstrualCycle />} />
          )}
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
