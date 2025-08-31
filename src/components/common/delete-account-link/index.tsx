import { useEffect, useRef, useState } from "react";
import { IonModal, IonContent, IonSpinner, IonImg } from "@ionic/react";
import { useAuth } from "@/hooks/data/authentication";
import { useToastAlert } from "@/hooks/ui/toast-alert";
import MainButton from "@/components/common/button";
import { FirebaseError } from "firebase/app";

const DeleteAccountLink: React.FC = () => {
  const { showToast } = useToastAlert();
  const modal = useRef<HTMLIonModalElement>(null);
  const page = useRef(null);
  const { onDeleteAccount, loading } = useAuth();

  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    setPresentingElement(page.current);
  }, []);

  function dismiss() {
    modal.current?.dismiss();
  }

  const onSubmit = async () => {
    try {
      await onDeleteAccount();
      window.location.reload();
      showToast({
        header: "Account Deleted",
        message: "Your account has been removed.",
        type: "success",
      });
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === "auth/requires-recent-login"
      ) {
        showToast({
          header: "Delete Failed",
          message: "Please log in again to delete account.",
          type: "error",
        });
      } else {
        showToast({
          header: "Delete Failed",
          message: "Unable to delete account.",
          type: "error",
        });
      }
    } finally {
      dismiss();
    }
  };

  return (
    <>
      <div
        id="delete-account-modal"
        className="cursor-pointer text-[16px] px-2 py-2.5 text-black flex items-center gap-[8px] opacity-[0.62] duration-300 rounded-[8px] active:opacity-100 active:bg-black/[0.04]"
      >
        <IonImg
          src="/icons/setting-delete-account.svg"
          className="w-[20px] h-[20px]"
        />
        Delete Account
        <IonImg
          src="/icons/chevron-left.svg"
          className="ms-auto w-[14px] h-[14px] rotate-180"
        />
      </div>
      <IonModal
        ref={modal}
        trigger="delete-account-modal"
        presentingElement={presentingElement!}
        className="px-[20px] bg-black/80"
        style={{
          "--height": "400px",
          "--border-radius": "24px",
        }}
        showBackdrop={true}
        mode="md"
      >
        <IonContent className="px-[20px]">
          <div className="px-5 py-8 w-full h-full flex items-center justify-center flex-col bg-white">
            <div>
              <div className="font-bold font-heading text-[22px] text-black mb-6">
                Delete Account
              </div>
              <div className="font-bold font-heading text-[18px] text-black">
                Are you sure you want to delete your account?
              </div>
              <div className="font-paragraph text-[16px] text-black/40">
                This action is permanent and cannot be undone. All your data,
                including saved foods and health information, will be deleted.
              </div>
              <div className="mt-8">
                <MainButton
                  color="ORANGE"
                  onClick={onSubmit}
                  isDisabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      Deleted...
                      <IonSpinner
                        name="crescent"
                        className="text-white w-[20px] h-[20px] ms-[6px]"
                      />
                    </div>
                  ) : (
                    "Delete My Account"
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

export default DeleteAccountLink;
