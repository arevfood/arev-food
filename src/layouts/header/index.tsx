import {
  IonHeader,
  IonToolbar,
  IonImg,
  useIonRouter,
  IonBackButton,
  IonButtons,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

type propTypes = {
  transparent?: boolean;
};

const MainHeader: React.FC<propTypes> = ({ transparent }) => {
  const router = useHistory();
  const ionRouter = useIonRouter();
    const location = useLocation();
  const [canGoBack, setCanGoBack] = useState(false);

    const isHome = location.pathname === "/";

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
            {isHome ? (
                <div onClick={() => router.replace("/")}>
                    <IonImg src="/arev-logo.png" className="w-[54px]" />
                </div>
            ) : (
                <div className="px-4">
                    <IonBackButton
                        defaultHref="/"
                        icon={
                            !transparent
                                ? "/icons/arrow-left.svg"
                                : "icons/white-background-arrow.svg"
                        }
                        text={""}
                        className="!w-[20px] !h-[20px]"
                    />
                </div>
            )}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default MainHeader;
