import { IonImg } from '@ionic/react'

type propTypes = {
  background?: string
  image?: string
}

const Avatar: React.FC<propTypes> = ({ background, image }) => {
  return (
    <div
      className="flex items-center w-[75px] h-[75px] rounded-full border-white border-[2px] relative overflow-hidden"
      style={{ background: background }}
    >
      {image && <IonImg src={image} className="w-full h-full object-cover" />}
    </div>
  )
}

export default Avatar
