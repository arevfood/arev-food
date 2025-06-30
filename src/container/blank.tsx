import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { ReactNode } from "react";

type propTypes = {
  children: ReactNode;
  fullscreen?: boolean;
  background?: string;
  withBackButton?: boolean;
};

export default function ContainerBlank({
  children,
  fullscreen,
  background,
  withBackButton = true,
}: propTypes) {
  return (
    <IonPage>
      {withBackButton && (
        <IonHeader>
          <IonToolbar
            style={{ "--background": "transparent", "--border-width": "0" }}
          >
            <IonButtons slot="start" className="px-5">
              <IonBackButton
                text={""}
                icon={"/icons/back-arrow.svg"}
              ></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent
        fullscreen={fullscreen}
        style={{ "--background": background || "#f2f3f5" }}
      >
        {children}
      </IonContent>
    </IonPage>
  );
}
