import { IonSelect, IonSelectOption } from "@ionic/react";

type Option = {
    value: string;
    label: string;
};

type Props = {
    placeholder?: string;
    value?: string;
    options: Option[];
    errorMessage?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
};

const CustomSelect: React.FC<Props> = ({
   placeholder,
   value,
   options,
   errorMessage,
   onChange = () => {},
   disabled = false,
}) => {
    return (
        <div className="w-full relative">
            <IonSelect
                placeholder={placeholder}
                value={value}
                onIonChange={(e) => onChange(e.detail.value)}
                interface="popover"
                disabled={disabled}
                className="w-full bg-white !mb-4 px-4 py-1 rounded-[100px] border-[3px] !border-bg_color_1 font-heading font-bold text-black"
            >
                {options.map((opt) => (
                    <IonSelectOption key={opt.value} value={opt.value}>
                        {opt.label}
                    </IonSelectOption>
                ))}
            </IonSelect>

            {errorMessage && (
                <p className="mt-1 text-red-500 text-[12px] font-paragraph absolute right-4">
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default CustomSelect;
