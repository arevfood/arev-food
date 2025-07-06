import MainLayouts from "@/layouts/main";
import { IonRouterLink } from "@ionic/react";

const PagesHome: React.FC = () => {
  return (
    <MainLayouts>
      <IonRouterLink routerLink="/about">About</IonRouterLink>
    </MainLayouts>
  );
};

export default PagesHome;
