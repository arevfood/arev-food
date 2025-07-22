import { IonIcon } from "@ionic/react";
import { InputHTMLAttributes } from "react";

type props = {
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  errorMessage?: string;
  icon?: string;
  iconClass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const CustomInput: React.FC<props> = ({
  placeholder,
  errorMessage,
  type,
  icon,
  iconClass,
  onChange = (_e: React.ChangeEvent<HTMLInputElement>) => {},
  onKeyDown = (_e: React.KeyboardEvent<HTMLInputElement>) => {},
  ...props
}) => {
  return (
    <div className="w-full relative">
      <div className="w-full bg-white !mb-4 px-4 py-3 rounded-[100px] !text-black !font-bold !border-none font-heading placeholder:opacity-30 placeholder:font-heading flex">
        {icon && (
          <div>
            <IonIcon src={icon} className={iconClass} />
          </div>
        )}
        <input
          {...props}
          placeholder={placeholder || "Enter text"}
          type={type || "text"}
          className="grow"
          onChange={onChange}
          onKeyDown={onKeyDown}
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
