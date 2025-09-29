import { IonImg } from '@ionic/react'
import Tags from '@/components/common/tags'

type StatusColor = 'NORMAL' | 'DANGER' | 'SUCCESS' | 'WARNING'

type Status = {
  type: string
  color: StatusColor
}

type propTypes = {
  title: string
  value: string | number
  unit?: string
  image?: string
}

const HealthData: React.FC<propTypes> = ({ title, value, unit, image }) => {
  let status: Status = {
    type: 'Normal',
    color: 'NORMAL',
  }

  const getBloodSugarStatus = (value: string): Status => {
    const valueParse = parseInt(value, 10)

    switch (true) {
      case valueParse < 70:
        return { type: 'Not Good', color: 'DANGER' }
      case valueParse >= 70 && valueParse <= 99:
        return { type: 'Good', color: 'SUCCESS' }
      case valueParse >= 100 && valueParse <= 125:
        return { type: 'Normal', color: 'NORMAL' }
      default:
        return { type: 'Not Good', color: 'DANGER' }
    }
  }

  const getBloodPressureStatus = (value: string): Status => {
    const [systolicStr, diastolicStr] = value.toString().split('/')
    const systolic = parseInt(systolicStr, 10)
    const diastolic = parseInt(diastolicStr, 10)

    switch (true) {
      case systolic < 90 || diastolic < 60:
        return { type: 'Not Good', color: 'DANGER' }
      case systolic <= 120 && diastolic <= 80:
        return { type: 'Good', color: 'SUCCESS' }
      case systolic <= 139 || diastolic <= 89:
        return { type: 'Normal', color: 'NORMAL' }
      default:
        return { type: 'Not Good', color: 'DANGER' }
    }
  }

  if (title.includes('Blood Sugar Level') && typeof value === 'string') {
    status = getBloodSugarStatus(value)
  } else if (title.includes('Blood Pressure') && typeof value === 'string') {
    status = getBloodPressureStatus(value)
  }

  return (
    <div className="rounded-[8px] min-h-[180px] relative overflow-hidden">
      <IonImg className="absolute w-full h-full top-0 left-0 object-cover" src={image} />
      <div className="bg-linear-to-t to-transparent from-[#F9B83F] absolute bottom-0 left-0 h-full w-full" />
      <div className="z-10 absolute bottom-0 w-full px-[12px] pb-[6px]">
        <div className="font-bold font-heading text-[16px] text-white">{title}</div>
        <div className="font-heading font-medium text-[26px] text-white">
          {value}
          <span className="text-[12px] font-paragraph font-normal">{unit}</span>
        </div>
      </div>
      <div className="absolute top-[12px] left-[12px]">
        <Tags label={status.type} status={status.color} />
      </div>
    </div>
  )
}

export default HealthData
