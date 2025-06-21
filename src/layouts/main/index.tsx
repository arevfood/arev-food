import { IonContent, IonPage } from "@ionic/react";
import { ReactNode } from "react";
import MainHeader from "@/layouts/header";
import MainFooter from "@/layouts/footer";

const MainLayouts: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <IonPage>
      <MainHeader />
      <IonContent fullscreen style={{ "--background": "#f2f3f5" }}>
        {children}
      </IonContent>
      <MainFooter />
    </IonPage>
  );
};

export default MainLayouts;
