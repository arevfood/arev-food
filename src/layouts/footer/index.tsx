import { IonFooter, IonNav, IonToolbar } from "@ionic/react";

const MainFooter: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar
        class="h-[72px] rounded-tl-[20px] rounded-tr-[20px]"
        style={{ "--border-width": 0, "--background": "#FFF" }}
      >
        <IonNav>Home</IonNav>
      </IonToolbar>
    </IonFooter>
  );
};

export default MainFooter;
