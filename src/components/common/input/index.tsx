import { IonIcon } from "@ionic/react";
import {InputHTMLAttributes, useState} from "react";

type props = {
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
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div className="w-full relative">
      <div className="w-full bg-white !mb-4 px-4 py-3 rounded-[100px] !text-black !font-bold font-heading placeholder:opacity-30 placeholder:font-heading flex border-[3px] !border-bg_color_1">
        {icon && (
          <div>
            <IonIcon src={icon} className={iconClass} />
          </div>
        )}
        {type === 'date' && !value && (
            <span className="opacity-50 font-heading">{placeholder}</span>
        )}
        <input
          {...props}
          placeholder={placeholder || "Enter text"}
          type={type || "text"}
          className="grow outline-[0px]"
          onChange={handleChange}
          onKeyDown={onKeyDown}
          disabled={disabled}
          style={{ outline: "none !important", outlineWidth: "0px !important" }}
        />
      </div>
      {errorMessage && (
        <p className="mt-0 absolute bottom-[20px] right-[20px] text-red-500 text-[12px] font-paragraph">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
