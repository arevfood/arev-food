import ContentsWelcomeIntroduction from "./introduction";
import { useState } from "react";
import ContentsWelcomeContent from "./content";
import ContainerBlank from "@/container/blank";

const ContentsWelcome: React.FC = () => {
  const [stage, setStage] = useState<"initial" | "content">("initial");
  return (
    <ContainerBlank
      fullscreen={true}
      background="#f2f3f5"
      withBackButton={false}
    >
      {stage === "initial" && (
        <ContentsWelcomeIntroduction
          onClick={() => {
            setStage("content");
          }}
        />
      )}
      {stage === "content" && <ContentsWelcomeContent />}
    </ContainerBlank>
  );
};

export default ContentsWelcome;
