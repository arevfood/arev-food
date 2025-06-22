import { IonContent } from "@ionic/react";
import ContentsWelcomeIntroduction from "./introduction";

const ContentsWelcome: React.FC = () => {
  return (
    <IonContent fullscreen style={{ "--background": "#f2f3f5" }}>
      <ContentsWelcomeIntroduction />
    </IonContent>
  );
};

export default ContentsWelcome;
