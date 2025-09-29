import ContentsWelcomeIntroduction from './introduction'
import { useState } from 'react'
import ContentsWelcomeContent from './content'
import LayoutBlank from '@/layouts/blank'

const ContentsWelcome: React.FC = () => {
  const [stage, setStage] = useState<'initial' | 'content'>('initial')
  return (
    <LayoutBlank fullscreen={true} background="var(--color-bg_color_1)" withBackButton={false}>
      {stage === 'initial' && (
        <ContentsWelcomeIntroduction
          onClick={() => {
            setStage('content')
          }}
        />
      )}
      {stage === 'content' && <ContentsWelcomeContent />}
    </LayoutBlank>
  )
}

export default ContentsWelcome
