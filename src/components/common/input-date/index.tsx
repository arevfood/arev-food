import { IonDatetime, IonDatetimeButton, IonModal } from "@ionic/react";
import React from "react";
import { InputHTMLAttributes } from "react";
import "@/styles/input-date.scss";

type Props = {
  label?: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: (e?: any) => void;
  name?: string;
  value?: string;
  disabled?: boolean;
};

const CustomInputDate: React.FC<Props> = ({
  label,
  errorMessage,
  onChange,
  onBlur,
  name,
  value,
  disabled = false,
}) => {
  return (
    <div className="w-full relative flex flex-col gap-[6px] mb-[16px]">
      {label && (
        <p className="text-black_color text-[0.913rem] font-heading font-semibold">
          {label}
        </p>
      )}
      <IonDatetimeButton datetime={name} className="custom-input-date" />
      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id={name}
          presentation="date"
          value={value}
          disabled={disabled}
          onIonChange={(e) => {
            const isoVal = e.detail.value as string;
            if (isoVal) {
              const dateOnly = isoVal.split("T")[0];
              if (onChange) {
                onChange({
                  target: { name, value: dateOnly },
                } as React.ChangeEvent<HTMLInputElement>);
              }
            }
          }}
          onIonBlur={onBlur}
        ></IonDatetime>
      </IonModal>
      {errorMessage && (
        <p className="text-red-500 text-[12px] font-paragraph">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CustomInputDate;
