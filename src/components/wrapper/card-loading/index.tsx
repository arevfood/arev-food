import { IonSpinner } from '@ionic/react'

const CardLoading: React.FC = () => {
  return (
    <div className="w-full h-[160px] flex items-center justify-center text-center">
      <IonSpinner
        name="crescent"
        style={
          {
            '--color': 'var(--color-black_color)',
            opacity: 0.62,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

export default CardLoading
