import { ReactNode } from "react";

type propTypes = {
  children: ReactNode;
  withGradient?: boolean;
};

const YellowBox: React.FC<propTypes> = ({ children, withGradient = false }) => {
  return (
    <div
      className={`${
        withGradient
          ? "bg-linear-to-t to-[#FFEDCD] from-[#FFE2AD] shadow-[0px_3px_13px_0px_black/10]"
          : "bg-[#FFEDCD] border border-second_color"
      } rounded-[8px]`}
    >
      {children}
    </div>
  );
};

export default YellowBox;
