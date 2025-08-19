import { useHistory } from "react-router";
import { useEffect, useRef, useState } from "react";
import {IonModal, IonContent, IonSpinner} from "@ionic/react";
import {useAuth} from "@/hooks/data/authentication";
import {useToastAlert} from "@/hooks/ui/toast-alert";
import MainButton from "@/components/common/button";

const SignoutLink: React.FC = () => {
  const { showToast } = useToastAlert();
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const router = useHistory();

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  const { onSignOut, loading } = useAuth();

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  const onSubmit = async () => {
    await onSignOut(undefined, {
      onSuccess: () => {
        showToast("Logout successful!", "success");
      },
      onError: () => {
        showToast("Logout failed!", "error");
      }
    });
  };

  return (
    <>
      <div id="signout-modal" className="font-paragraph text-[16px] text-black">
        Sign Out
      </div>
      <IonModal
        ref={modal}
        trigger="signout-modal"
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
              <div className="font-bold font-heading text-[22px] text-black mb-6">
                Logout
              </div>
              <div className="font-bold font-heading text-[18px] text-black">
                Are you sure you want to sign out?
              </div>
              <div className="font-paragraph text-[16px] text-black/40">
                We’ll log you out of your account. Any unsaved changes will be
                lost, so make sure everything is saved before proceeding.
              </div>
              <div className="mt-8">
                <MainButton
                  color="ORANGE"
                  onClick={onSubmit}
                  isDisabled={loading}
                >
                  {loading ? (
                      <div className="flex items-center gap-2">
                        Logging out...
                        <IonSpinner
                            name="crescent"
                            className="text-white w-[20px] h-[20px] ms-[6px]"
                        />
                      </div>
                  ) : (
                      "Logout"
                  )}
                </MainButton>
              </div>
              <div className="mt-4">
                <MainButton color="ORANGE_OUTLINE" onClick={dismiss}>
                  Cancel
                </MainButton>
              </div>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
};

export default SignoutLink;
