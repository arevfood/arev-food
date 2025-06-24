import { IonContent } from "@ionic/react";
import ContentsWelcomeIntroduction from "./introduction";
import { useState } from "react";
import ContentsWelcomeContent from "./content";

const ContentsWelcome: React.FC = () => {
  const [stage, setStage] = useState<"initial" | "content">("initial");
  return (
    <IonContent fullscreen style={{ "--background": "#f2f3f5" }}>
      {stage === "initial" && (
        <ContentsWelcomeIntroduction
          onClick={() => {
            setStage("content");
          }}
        />
      )}
      {stage === "content" && <ContentsWelcomeContent />}
    </IonContent>
  );
};

export default ContentsWelcome;
