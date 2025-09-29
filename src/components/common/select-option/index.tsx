import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import '@/styles/select-option.scss'

type Option = {
  value: string
  label: string
}

type Props = {
  label?: string
  placeholder?: string
  value?: string
  options: Option[]
  errorMessage?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

const CustomSelect: React.FC<Props> = ({
  label,
  placeholder,
  value,
  options,
  errorMessage,
  onChange = () => {},
  disabled = false,
}) => {
  return (
    <div className="w-full relative flex flex-col gap-[6px] mb-[16px]">
      <p className="text-black_color text-[0.913rem] font-heading font-semibold">{label}</p>
      <IonList className="custom-list">
        <IonItem>
          <IonSelect
            placeholder={placeholder}
            value={value}
            onIonChange={(e) => onChange(e.detail.value)}
            interface="popover"
            disabled={disabled}
            interfaceOptions={{ cssClass: 'custom-select-popover' }}
            className="w-full bg-white px-4 py-1 rounded-[100px] !text-black !font-semibold font-heading flex border-[3px] !border-bg_color_1"
          >
            {options.map((opt) => (
              <IonSelectOption key={opt.value} value={opt.value}>
                {opt.label}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
      </IonList>
      {errorMessage && <p className="text-red-500 text-[12px] font-paragraph">{errorMessage}</p>}
    </div>
  )
}

export default CustomSelect
