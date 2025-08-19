import { useEffect, useRef, useState } from "react";
import {IonModal, IonContent, IonImg} from "@ionic/react";
import MainButton from "@/components/common/button";
import {useHistory} from "react-router";

const MenstrualCycleLink: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const router = useHistory();

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  return (
    <>
      <div id="menstrual-cycle-modal" className="text-[16px] px-2 py-2.5 text-black flex items-center gap-[8px] opacity-[0.62] duration-300 rounded-[8px] active:opacity-100 active:bg-black/[0.04]">
        <IonImg src="/icons/setting-edit-menstrual-cycle.svg" className="w-[20px] h-[20px]"/>
        Edit Menstrual Cycle
        <IonImg src="/icons/chevron-left.svg" className="ms-auto w-[14px] h-[14px] rotate-180"/>
      </div>
      <IonModal
        ref={modal}
        trigger="menstrual-cycle-modal"
        presentingElement={presentingElement!}
        className="px-[20px] bg-black/80"
        style={{
          "--height": "350px",
          "--border-radius": "24px",
        }}
        showBackdrop={true}
        mode="md"
      >
        <IonContent className="px-[20px]">
          <div className="px-5 py-8 w-full h-full flex items-center justify-center flex-col bg-white">
            <div>
              <div className="font-bold font-heading text-[18px] leading-[120%] text-black mb-4">
                Do You Want to Track Your <br /> Menstrual Cycle?
              </div>
              <div className="font-paragraph text-[16px] text-black/40">
                This helps us give personalized food, health, and cycle recommendations.
              </div>
              <div className="mt-8">
                <MainButton color="ORANGE" onClick={() => router.replace("/setting/menstrual-cycle")}>Yes</MainButton>
              </div>
              <div className="mt-4">
                <MainButton color="ORANGE_OUTLINE" onClick={dismiss}>No</MainButton>
              </div>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};

export default MenstrualCycleLink;
