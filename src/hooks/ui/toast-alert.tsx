import { useIonToast } from "@ionic/react";

type ToastType = "success" | "error" | "medium";

export function useToastAlert() {
    const [present] = useIonToast();

    const typeColor: Record<ToastType, string> = {
        success: "success",
        error: "danger",
        medium: "medium",
    };

    const showToast = (
        message: string,
        type: ToastType = "medium",
        duration: number = 2000
    ) => {
        present({
            message,
            duration,
            color: typeColor[type],
            position: "bottom",
            buttons: [
                {
                    text: "Close",
                    role: "cancel",
                },
            ],
        });
    };

    return { showToast };
}