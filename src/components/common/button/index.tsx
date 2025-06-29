import { IonButton } from "@ionic/react";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
  onClick?: () => void;
  color?: "WHITE" | "ORANGE";
};

const MainButton: React.FC<props> = ({
  onClick,
  children,
  color = "WHITE",
}) => {
  const colorSchema = {
    WHITE: {
      color: "var(--color-primary_color)",
      "--background": "var(--color-white_color)",
      "--background-focused": "var(--color-white_color)",
      "--background-activated": "var(--color-white_color)",
      "--background-hover": "var(--color-white_color)",
      "--border-radius": "999px",
    },
    ORANGE: {
      color: "var(--color-white_color)",
      "--background": "var(--color-primary_color)",
      "--background-focused": "var(--colors-white_color)",
      "--background-activated": "var(--colors-white_color)",
      "--background-hover": "var(--colors-white_color)",
      "--border-radius": "999px",
    },
  };

  return (
    <IonButton
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      className={`w-full !font-heading font-bold min-h-[42px] rounded-full capitalize text-[14px]`}
      style={colorSchema[color]}
    >
      {children}
    </IonButton>
  );
};

export default MainButton;
