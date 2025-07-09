import { ReactNode } from "react";

type propTypes = {
  children: ReactNode;
};

const Card: React.FC<propTypes> = ({ children }) => {
  return (
    <div className="shadow-[0px_3px_13px_0px_black/10] bg-white rounded-[8px] overflow-hidden">
      {children}
    </div>
  );
};

export default Card;
