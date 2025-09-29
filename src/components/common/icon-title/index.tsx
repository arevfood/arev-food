import { IonIcon, IonRouterLink } from '@ionic/react'
import MainButton from '@/components/common/button'

type propTypes = {
  title: string
  icon: string
  description?: string
  link?: string
  linkLabel?: string
}

const IconTitle: React.FC<propTypes> = ({ title, icon, description, link, linkLabel }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <div className="flex gap-2">
          <div>
            <div className="w-[32px] h-[32px] rounded-full bg-[#FDEAC5] flex items-center justify-center">
              <IonIcon src={icon} className="w-[18px] h-[18px]" />
            </div>
          </div>
          <div className="font-bold font-heading text-[18px] text-black leading-[120%] mt-1.5">
            {title}
          </div>
        </div>
        {link && (
          <IonRouterLink routerLink={link}>
            <MainButton color="ORANGE">{linkLabel || 'See All'}</MainButton>
          </IonRouterLink>
        )}
      </div>
      {description && (
        <div className="text-[12px] font-paragraph text-black mt-4">{description}</div>
      )}
    </div>
  )
}

export default IconTitle
