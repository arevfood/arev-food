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
      style={{ "--ion-toolbar-color": "transparent", "--box-shadow": "none" }}
      onClick={() => {
        if (link) router.replace(link);
      }}
    >
      <IonIcon
        icon={icon}
        className={`${
          active ? "text-primary_color" : "text-black_color/40"
        } text-[28px] ${s.icon} footer-icon`}
      />
    </IonButton>
  );
};

export default FooterIcon;
