import {
  IonHeader,
  IonToolbar,
  IonImg,
  useIonRouter,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const MainHeader: React.FC = () => {
  const router = useHistory();
  const ionRouter = useIonRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(ionRouter.canGoBack());
  }, [ionRouter]);

  return (
    <IonHeader className="!shadow-none">
      <IonToolbar
        style={{
          "--background": "var(--color-bg_color_1)",
          "--border-width": "0",
        }}
        className="h-[54px] flex"
      >
        <IonButtons slot="start">
          {canGoBack ? (
            <div className="px-4">
              <IonBackButton
                defaultHref="/"
                icon={"/icons/back-arrow.svg"}
                text={""}
              />
            </div>
          ) : (
            <div
              onClick={() => {
                router.replace("/");
              }}
            >
              <IonImg src="/arev-logo.png" className="w-[54px]" />
            </div>
          )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default MainHeader;
