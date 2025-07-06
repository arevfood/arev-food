import FooterIcon from "@/components/common/footer-icon";
import { IonFooter, IonToolbar } from "@ionic/react";
import { useLocation } from "react-router";

const MainFooter: React.FC = () => {
  //TODO: Handle Active Menu
  const location = useLocation();
  //TODO: Change Icon

  return (
    <IonFooter className="!shadow-none">
      <IonToolbar
        class="h-[72px] rounded-tl-[20px] rounded-tr-[20px] flex"
        style={{ "--border-width": 0, "--background": "#FFF" }}
      >
        <div className="grid grid-cols-4">
          <FooterIcon
            icon={"/icons/home.svg"}
            active={location.pathname == "/"}
            link="/"
          />
          <FooterIcon
            icon={"/icons/search.svg"}
            active={location.pathname == "/search"}
            link="/search"
          />
          <FooterIcon
            icon={"/icons/heart.svg"}
            active={location.pathname == "/favorite"}
            link="/favorite"
          />
          <FooterIcon
            icon={"/icons/gear.svg"}
            active={location.pathname == "/setting"}
            link="/setting"
          />
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default MainFooter;
