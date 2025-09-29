import ContentsWelcome from '@/contents/welcome'
import { useAuth } from '@/hooks/data/authentication'
import { Redirect } from 'react-router'

const PagesWelcome: React.FC = () => {
  const { session } = useAuth()

  if (!session) {
    return <ContentsWelcome />
  }

  if (session) {
    return <Redirect to={'/'} />
  }
}

export default PagesWelcome
