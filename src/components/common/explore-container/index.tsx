import { Link } from 'react-router-dom'
import s from './index.module.scss'
import MainButton from '@/components/common/button'
import { useAuth } from '@/hooks/data/authentication'

const ExploreContainer = () => {
  const { onSignOut } = useAuth()
  return (
    <div className={s.container}>
      <strong>Arev Food - Applications</strong>
      <p>
        here to see more details: <Link to="/about">About Us Halo</Link>
      </p>
      <p className="!font-paragraph !text-primary_color">
        ENV Test: {import.meta.env.VITE_COMPANY_NAME}
      </p>
      <MainButton
        color="ORANGE"
        onClick={() => {
          onSignOut()
        }}
      >
        Sign Out
      </MainButton>
    </div>
  )
}

export default ExploreContainer
