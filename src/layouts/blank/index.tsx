import { IonBackButton, IonButtons, IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react'
import { ReactNode } from 'react'

type propTypes = {
  children: ReactNode
  fullscreen?: boolean
  background?: string
  withBackButton?: boolean
}

const LayoutBlank: React.FC<propTypes> = ({
  children,
  fullscreen,
  background,
  withBackButton = true,
}) => {
  return (
    <IonPage>
      {withBackButton && (
        <IonHeader className="!shadow-none">
          <IonToolbar style={{ '--background': 'transparent', '--border-width': '0' }}>
            <IonButtons slot="start" className="px-5">
              <IonBackButton text={''} icon={'/icons/back-arrow.svg'}></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent
        fullscreen={fullscreen}
        style={{ '--background': background || 'var(--color-bg_color_1)' }}
      >
        {children}
      </IonContent>
    </IonPage>
  )
}

export default LayoutBlank
