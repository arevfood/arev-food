import SignoutLink from "@/components/common/signout-link";
import { IonRouterLink } from "@ionic/react";

const ContentsSettings: React.FC = () => {
  return (
    <>
      <div className="mt-4 flex flex-col gap-6">
        <div className="font-bold font-heading text-[18px] text-black">
          Account Settings
        </div>
        <IonRouterLink routerLink="/setting/profile">
          <div className="font-paragraph text-[16px] text-black">
            Edit Profile
          </div>
        </IonRouterLink>
        <IonRouterLink routerLink="/setting/health-data">
          <div className="font-paragraph text-[16px] text-black">
            Edit Health Data
          </div>
        </IonRouterLink>
        <IonRouterLink routerLink="/setting/menstrual-cycle">
          <div className="font-paragraph text-[16px] text-black">
            Edit Menstrual Cycle
          </div>
        </IonRouterLink>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div className="font-bold font-heading text-[18px] text-black">
          Privacy & Security
        </div>
        <IonRouterLink routerLink="/setting/change-password">
          <div className="font-paragraph text-[16px] text-black">
            Change Password
          </div>
        </IonRouterLink>
        <IonRouterLink routerLink="/setting/delete-account">
          <div className="font-paragraph text-[16px] text-black">
            Delete Account
          </div>
        </IonRouterLink>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div className="font-bold font-heading text-[18px] text-black">
          Support & Legal
        </div>
        <IonRouterLink>
          <div className="font-paragraph text-[16px] text-black">
            Terms & Conditions
          </div>
        </IonRouterLink>
        <IonRouterLink>
          <div className="font-paragraph text-[16px] text-black">
            Contact Us
          </div>
        </IonRouterLink>
      </div>
      <div className="mt-10 flex flex-col gap-6">
        <div className="font-bold font-heading text-[18px] text-black">
          Logout
        </div>
        <SignoutLink />
      </div>
    </>
  );
};

export default ContentsSettings;
