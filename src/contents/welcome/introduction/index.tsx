import MainButton from "@/components/common/button";
import { IonImg } from "@ionic/react";

const ContentsWelcomeIntroduction: React.FC<{ onClick?: () => void }> = ({
  onClick,
}) => {
  return (
    <div className="h-full relative">
      <IonImg src="/introduction.jpg" className="h-full object-cover" />
      <div className="absolute top-0 w-full h-full bg-linear-to-b from-primary_color/0 to-primary_color" />
      <div className="absolute bottom-[75px] p-4">
        <h1 className="mb-6 !font-bold">Feel Better, Eat Smarter</h1>
        <p className="mb-6">
          Discover foods that fit your body and help you feel your best, every
          day.
        </p>
        <MainButton onClick={onClick}>Get Started</MainButton>
      </div>
    </div>
  );
};

export default ContentsWelcomeIntroduction;
