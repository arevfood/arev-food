import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

const MainHeader: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar style={{ "--background": "#FFF" }}>
        <IonTitle className="pl-4">Arev Food</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default MainHeader;
