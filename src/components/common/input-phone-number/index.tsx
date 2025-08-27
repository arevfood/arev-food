import { IonIcon } from "@ionic/react";

type props = {
    label?: string;
    errorMessage?: string;
    icon?: string;
    iconClass?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled?: boolean;
};

const CustomInputPhoneNumber: React.FC<props> = ({
    label,
    errorMessage,
    icon,
    iconClass,
    onChange = (_e: React.ChangeEvent<HTMLInputElement>) => {},
    onKeyDown = (_e: React.KeyboardEvent<HTMLInputElement>) => {},
    disabled = false,
    ...props
}) => {
    const formatPhoneNumber = (value: string) => {
        let cleaned = value.replace(/\D/g, "");
        if (!value.startsWith("+")) cleaned = "1" + cleaned;
        cleaned = cleaned.substring(0, 15);

        const match = cleaned.match(/^(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,4})$/);
        if (!match) return "+" + cleaned;

        return (
            "+" +
            [match[1], match[2], match[3], match[4], match[5]]
                .filter(Boolean)
                .join(" ")
        );
    };

    return (
        <div className="w-full relative flex flex-col gap-[6px] mb-[16px]">
            <p className="text-black_color text-[0.913rem] font-heading font-semibold">
                {label}
            </p>
            <div className="w-full bg-white px-4 py-3 rounded-[100px] !text-black !font-semibold font-heading placeholder:opacity-30 placeholder:font-heading flex border-[3px] !border-bg_color_1">
                {icon && (
                    <div>
                        <IonIcon src={icon} className={iconClass} />
                    </div>
                )}
                <input
                    {...props}
                    type="tel"
                    placeholder="e.g. +1 202 555 0173"
                    maxLength={20}
                    onChange={(e) => {
                        e.target.value = formatPhoneNumber(e.target.value);
                        onChange?.(e);
                    }}
                    className="grow outline-none"
                    onKeyDown={onKeyDown}
                    disabled={disabled}
                />
            </div>
            {errorMessage && (
                <p className="text-red-500 text-[12px] font-paragraph">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default CustomInputPhoneNumber;