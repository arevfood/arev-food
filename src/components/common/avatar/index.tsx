import { IonImg } from '@ionic/react'
import { useHistory } from 'react-router-dom'

type propTypes = {
  background?: string
  image?: string
}

const Avatar: React.FC<propTypes> = ({ background, image }) => {
  const router = useHistory()

  return (
    <div
      className="flex items-center w-[75px] h-[75px] rounded-full border-white border-[2px] relative"
      style={{ background: background }}
    >
      {image && (
        <IonImg
          src={image}
          className="w-full h-full object-cover relative overflow-hidden rounded-full"
        />
      )}
      <div
        className="w-[30px] h-[30px] aspect-square rounded-full absolute -bottom-[25%] -right-[25%] -translate-1/2 flex items-center justify-center bg-white border border-black_color/[0.12]"
        onClick={() => router.push('/setting/profile')}
      >
        <IonImg src="/icons/pen-primary.svg" className="w-[13px] h-[13px] aspect-square" />
      </div>
    </div>
  )
}

export default Avatar
