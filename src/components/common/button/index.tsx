import { IonButton } from '@ionic/react'
import { ReactNode } from 'react'

type props = {
  children: ReactNode
  onClick?: () => void
  color?: 'WHITE' | 'ORANGE' | 'ORANGE_OUTLINE'
  isDisabled?: boolean
}

const MainButton: React.FC<props> = ({
  onClick,
  children,
  color = 'WHITE',
  isDisabled = false,
}) => {
  const colorSchema = {
    WHITE: {
      color: 'var(--color-primary_color)',
      '--background': 'var(--color-white_color)',
      '--background-focused': 'var(--color-white_color)',
      '--background-activated': 'var(--color-white_color)',
      '--background-hover': 'var(--color-white_color)',
      '--border-radius': '999px',
    },
    ORANGE: {
      color: 'var(--color-white_color)',
      '--background': 'var(--color-primary_color)',
      '--background-focused': 'var(--colors-white_color)',
      '--background-activated': 'var(--colors-white_color)',
      '--background-hover': 'var(--colors-white_color)',
      '--border-radius': '999px',
    },
    ORANGE_OUTLINE: {
      color: 'var(--color-primary_color)',
      '--background': 'transparent',
      '--background-focused': 'transparent',
      '--background-activated': 'transparent',
      '--background-hover': 'transparent',
      '--border-radius': '999px',
      '--border-color': 'var(--color-primary_color)',
      '--border-style': 'solid',
      '--border-width': '2px',
    },
  }

  return (
    <IonButton
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      className={`w-full !font-heading font-bold min-h-[42px] rounded-full capitalize text-[14px] ${isDisabled ? '!opacity-100' : ''}`}
      style={colorSchema[color]}
      disabled={isDisabled}
    >
      {children}
    </IonButton>
  )
}

export default MainButton
