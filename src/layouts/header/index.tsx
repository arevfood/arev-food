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

type propTypes = {
  transparent?: boolean;
};

const MainHeader: React.FC<propTypes> = ({ transparent }) => {
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
          "--background": !transparent
            ? "var(--color-bg_color_1)"
            : "transparent",
          "--border-width": "0",
        }}
        className="h-[54px] flex"
      >
        <IonButtons slot="start">
          {canGoBack ? (
            <div className={`px-4`}>
              <IonBackButton
                defaultHref="/"
                icon={
                  !transparent
                    ? "/icons/back-arrow.svg"
                    : "icons/white-background-arrow.svg"
                }
                text={""}
                className="text-[24px]"
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
