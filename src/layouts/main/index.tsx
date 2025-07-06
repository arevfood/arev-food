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
    <>
      <IonPage>
        <MainHeader />
        <IonContent
          fullscreen
          style={{ "--background": "var(--color-bg_color_1)" }}
        >
          <div className="px-4">{children}</div>
        </IonContent>
        <MainFooter />
      </IonPage>
    </>
  );
};

export default MainLayouts;
