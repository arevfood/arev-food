import { IonSpinner } from '@ionic/react'

const CardLoading: React.FC = () => {
  return (
    <div className="w-full h-[160px] flex flex-col items-center justify-center text-center">
      <IonSpinner
        name="crescent"
        style={
          {
            '--color': 'var(--color-black_color)',
            opacity: 0.62,
            width: '32px',
            height: '32px',
          } as React.CSSProperties
        }
      />
      <p className="text-black/40 font-paragraph text-[14px] mt-4">Loading...</p>
    </div>
  )
}

export default CardLoading
