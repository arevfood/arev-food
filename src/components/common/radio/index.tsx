import { IonRadioGroup, IonRadio } from "@ionic/react";
import s from "./index.module.scss";

type propsTypes = {
  list: {
    value: string;
    label: string;
  }[];
  onChange?: (value: string) => void;
};

const CustomRadio: React.FC<propsTypes> = ({ list, onChange }) => {
  return (
    <IonRadioGroup
      className={`${s.radio}`}
      onIonChange={(event) => {
        const value = event.detail.value;
        onChange?.(value);
      }}
    >
      {list.map((item) => {
        return (
          <IonRadio value={item.value} labelPlacement="end" key={item.value}>
            {item.label}
          </IonRadio>
        );
      })}
    </IonRadioGroup>
  );
};

export default CustomRadio;
