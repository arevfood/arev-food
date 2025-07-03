import { IonButton, IonIcon } from "@ionic/react";

type propTypes = {
  active?: boolean;
  icon?: string;
  link?: string;
};

const FooterIcon: React.FC<propTypes> = ({ active = false, icon, link }) => {
  return (
    <IonButton
      routerLink={link}
      className=""
      style={{ "--ion-toolbar-color": "transparent" }}
    >
      <IonIcon
        icon={icon}
        className={`${
          active ? "text-primary_color" : "text-black_color/60"
        } text-[28px]`}
      />
    </IonButton>
  );
};

export default FooterIcon;
