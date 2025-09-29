import SignoutLink from '@/components/common/signout-link'
import { IonRouterLink } from '@ionic/react'
import { IonImg } from '@ionic/react'
import MenstrualCycleLink from '@/components/common/menstrual-cycle-link'
import DeleteAccountLink from '@/components/common/delete-account-link'

const ContentsSettings: React.FC = () => {
  return (
    <>
      <div className="bg-white py-4 px-2 rounded-[12px] flex flex-col shadow-lg">
        <div className="font-semibold px-2 text-[16px] mb-2 text-black/[0.42]">
          Account Settings
        </div>
        <IonRouterLink routerLink="/setting/profile">
          <div className="text-[16px] px-2 py-2.5 text-black flex items-center gap-[8px] opacity-[0.62] duration-300 rounded-[8px] active:opacity-100 active:bg-black/[0.04]">
            <IonImg src="/icons/setting-edit-profile.svg" className="w-[20px] h-[20px]" />
            Edit Profile
            <IonImg
              src="/icons/chevron-left.svg"
              className="ms-auto w-[14px] h-[14px] rotate-180"
            />
          </div>
        </IonRouterLink>
        <IonRouterLink routerLink="/setting/health-data">
          <div className="text-[16px] px-2 py-2.5 text-black flex items-center gap-[8px] opacity-[0.62] duration-300 rounded-[8px] active:opacity-100 active:bg-black/[0.04]">
            <IonImg src="/icons/setting-edit-health-data.svg" className="w-[20px] h-[20px]" />
            Edit Health Data
            <IonImg
              src="/icons/chevron-left.svg"
              className="ms-auto w-[14px] h-[14px] rotate-180"
            />
          </div>
        </IonRouterLink>
        <MenstrualCycleLink />
      </div>

      <div className="bg-white py-4 px-2 rounded-[12px] flex flex-col shadow-lg">
        <div className="font-semibold px-2 text-[16px] mb-2 text-black/[0.42]">
          Privacy & Security
        </div>
        <IonRouterLink routerLink="/setting/change-password">
          <div className="text-[16px] px-2 py-2.5 text-black flex items-center gap-[8px] opacity-[0.62] duration-300 rounded-[8px] active:opacity-100 active:bg-black/[0.04]">
            <IonImg src="/icons/setting-change-password.svg" className="w-[20px] h-[20px]" />
            Change Password
            <IonImg
              src="/icons/chevron-left.svg"
              className="ms-auto w-[14px] h-[14px] rotate-180"
            />
          </div>
        </IonRouterLink>
        <DeleteAccountLink />
      </div>

      <div className="bg-white py-4 px-2 rounded-[12px] flex flex-col shadow-lg">
        <div className="font-semibold px-2 text-[16px] mb-2 text-black/[0.42]">Support & Legal</div>
        <IonRouterLink>
          <div className="text-[16px] px-2 py-2.5 text-black flex items-center gap-[8px] opacity-[0.62] duration-300 rounded-[8px] active:opacity-100 active:bg-black/[0.04]">
            <IonImg src="/icons/setting-terms-condition.svg" className="w-[20px] h-[20px]" />
            Terms & Conditions
            <IonImg
              src="/icons/chevron-left.svg"
              className="ms-auto w-[14px] h-[14px] rotate-180"
            />
          </div>
        </IonRouterLink>
        <IonRouterLink>
          <div className="text-[16px] px-2 py-2.5 text-black flex items-center gap-[8px] opacity-[0.62] duration-300 rounded-[8px] active:opacity-100 active:bg-black/[0.04]">
            <IonImg src="/icons/setting-contact-us.svg" className="w-[20px] h-[20px]" />
            Contact Us
            <IonImg
              src="/icons/chevron-left.svg"
              className="ms-auto w-[14px] h-[14px] rotate-180"
            />
          </div>
        </IonRouterLink>
      </div>

      <div className="bg-white py-4 px-2 rounded-[12px] flex flex-col shadow-lg mb-4">
        <div className="font-semibold px-2 text-[16px] mb-2 text-black/[0.42]">Logout</div>
        <SignoutLink />
      </div>
    </>
  )
}

export default ContentsSettings
