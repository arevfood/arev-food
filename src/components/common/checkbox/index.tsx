import { IonCheckbox } from "@ionic/react";
import s from "./index.module.scss";

type propTypes = {
  label: string;
  onChange?: () => void;
};

const CustomCheckbox: React.FC<propTypes> = ({ label, onChange }) => {
  return (
    <div className={`${s.checkbox} w-fit`}>
      <IonCheckbox labelPlacement="end" onChange={onChange}>
        {label}
      </IonCheckbox>
    </div>
  );
};

export default CustomCheckbox;
