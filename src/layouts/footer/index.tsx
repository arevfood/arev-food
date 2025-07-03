import FooterIcon from "@/components/common/footer-icon";
import { IonFooter, IonToolbar } from "@ionic/react";
import { home, search, cart, person } from "ionicons/icons";

const MainFooter: React.FC = () => {
  //TODO: Handle Active Menu
  //TODO: Change Icon

  return (
    <IonFooter className="!shadow-none">
      <IonToolbar
        class="h-[72px] rounded-tl-[20px] rounded-tr-[20px] flex"
        style={{ "--border-width": 0, "--background": "#FFF" }}
      >
        <div className="grid grid-cols-4">
          <FooterIcon icon={home} />
          <FooterIcon icon={search} />
          <FooterIcon icon={cart} />
          <FooterIcon icon={person} />
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default MainFooter;
