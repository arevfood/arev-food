import { IonCheckbox } from "@ionic/react";
import s from "./index.module.scss";

type propTypes = {
  label: string;
  checked?: boolean;
  onChange?: () => void;
};

const CustomCheckbox: React.FC<propTypes> = ({
  label,
  checked = false,
  onChange,
}) => {
  return (
    <div className={`${s.checkbox} w-fit`}>
      <IonCheckbox
        labelPlacement="end"
        onIonChange={() => {
          onChange?.();
        }}
        checked={checked}
      >
        {label}
      </IonCheckbox>
    </div>
  );
};

export default CustomCheckbox;
