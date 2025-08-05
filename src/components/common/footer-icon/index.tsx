import { IonButton, IonIcon } from "@ionic/react";
import s from "./index.module.scss";
import { useHistory } from "react-router";

type propTypes = {
  active?: boolean;
  icon?: string;
  link?: string;
};

const FooterIcon: React.FC<propTypes> = ({ active = false, icon, link }) => {
  const router = useHistory();
  return (
    <IonButton
      className=""
      style={{
        "--ion-toolbar-color": "transparent",
        "--box-shadow": "none",
        "--background": "transparent",
        "--background-hover": "transparent",
        "--background-focused": "transparent",
        "--background-activated": "transparent",
      }}
      onClick={() => {
        if (link) router.replace(link);
      }}
    >
      <IonIcon
        icon={icon}
        className={`${
          active ? "text-primary_color" : "text-black_color/40"
        } text-[24px] ${s.icon} footer-icon`}
      />
    </IonButton>
  );
};

export default FooterIcon;
