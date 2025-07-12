import { IonContent, IonPage } from "@ionic/react";
import { ReactNode } from "react";
import MainHeader from "@/layouts/header";
import MainFooter from "@/layouts/footer";

type propTypes = {
  children: ReactNode;
  transparent?: boolean;
  fullWidth?: boolean;
};

const MainLayouts: React.FC<propTypes> = ({
  children,
  transparent = false,
  fullWidth = false,
}) => {
  return (
    <>
      <IonPage>
        <MainHeader transparent={transparent} />
        <IonContent
          fullscreen
          style={{
            "--background": "var(--color-bg_color_1)",
          }}
        >
          <div className={!fullWidth ? "px-4" : ""}>{children}</div>
        </IonContent>
        <MainFooter />
      </IonPage>
    </>
  );
};

export default MainLayouts;
