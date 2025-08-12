import { useIonToast } from "@ionic/react";

type ToastType = "success" | "error" | "medium";

export function useToastAlert() {
    const [present] = useIonToast();

    const showToast = (
        message: string,
        type: ToastType = "medium",
        duration: number = 2000
    ) => {
        let color: string;

        switch (type) {
            case "success":
                color = "success";
                break;
            case "error":
                color = "danger";
                break;
            default:
                color = "medium";
        }

        present({
            message,
            duration,
            color,
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