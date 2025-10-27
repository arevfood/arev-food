import { IonImg } from '@ionic/react'
import { ReactNode } from 'react'

type propTypes = {
  children: ReactNode
  withBackground?: boolean
}

const OrangeBox: React.FC<propTypes> = ({ children, withBackground = false }) => {
  return (
    <div className="bg-linear-to-t to-[#FF6223] from-[#E44201] p-4 shadow-[0px_6px_14px_-3px_black/30] rounded-[8px] relative overflow-hidden">
      {withBackground && (
        <div className="absolute bottom-0 left-0">
          <IonImg
            src="/images/background-vegetable.jpg"
            className="object-cover w-full h-full opacity-[0.24]"
          />
        </div>
      )}
      {children}
    </div>
  )
}

export default OrangeBox
