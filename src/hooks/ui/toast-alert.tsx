import { useIonToast } from "@ionic/react";
import "@/styles/toast.scss";

type ToastType = "success" | "error";

export function useToastAlert() {
    const [present] = useIonToast();

    const showToast = (
        {header, message, type} :
        {header: string, message: string, type: ToastType}
    ) => {
        present({
            header,
            message,
            duration: 2000,
            position: "top",
            layout: "stacked",
            icon: type === 'success' ? "/icons/icon-toast-success.svg" : "/icons/icon-toast-error.svg",
            cssClass: `custom-toast ${type}-toast`,
        });
    };

    return { showToast };
}