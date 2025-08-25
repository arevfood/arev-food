import { IonIcon } from "@ionic/react";
import {InputHTMLAttributes} from "react";

type props = {
  label?: string;
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  errorMessage?: string;
  icon?: string;
  iconClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const CustomInput: React.FC<props> = ({
  label,
  placeholder,
  errorMessage,
  type,
  icon,
  iconClass,
  onChange = (_e: React.ChangeEvent<HTMLInputElement>) => {},
  onKeyDown = (_e: React.KeyboardEvent<HTMLInputElement>) => {},
  disabled = false,
  ...props
}) => {
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
          placeholder={placeholder || "Enter text"}
          type={type || "text"}
          className="grow outline-[0px]"
          onChange={(e) => onChange(e)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          style={{ outline: "none !important", outlineWidth: "0px !important" }}
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

export default CustomInput;
