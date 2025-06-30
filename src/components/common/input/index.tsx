import { InputHTMLAttributes } from "react";

type props = {
  placeholder?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  errorMessage?: string;
};

const CustomInput: React.FC<props> = ({
  placeholder,
  errorMessage,
  type,
  ...props
}) => {
  return (
    <div className="w-full relative">
      <input
        {...props}
        className="w-full bg-white !mb-4 px-4 py-3 rounded-[100px] !text-black !font-bold !border-none font-heading placeholder:opacity-30 placeholder:font-heading"
        placeholder={placeholder || "Enter text"}
        type={type || "text"}
      />
      {errorMessage && (
        <p className="mt-0 absolute bottom-[20px] right-[20px] text-red-500 text-[12px] font-paragraph">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default CustomInput;
