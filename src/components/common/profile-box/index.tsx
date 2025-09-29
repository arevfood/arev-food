import OrangeBox from '@/components/wrapper/orange-box'
import Avatar from '@/components/common/avatar'
import MainButton from '@/components/common/button'
import { useHistory } from 'react-router-dom'
import { useUser } from '@/hooks/data/user'

type propTypes = {
  name: string
  image: string | undefined
  age: string
  gender: string
}

const ProfileBox: React.FC<propTypes> = ({ name, image, age }) => {
  const { data: userDetail } = useUser()
  const router = useHistory()

  return (
    <OrangeBox withBackground>
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <Avatar image={image || '/images/user-placeholder.png'} />
        </div>
        <div>
          <div className="font-bold font-heading text-[26px]">{name}</div>
          <div className="text-[14px] font-paragraph">{age}</div>
        </div>
      </div>
      {userDetail?.menstrual_cycle.track_menstrual_cycle === 'yes' && (
        <div className="mt-6">
          <MainButton color="WHITE" onClick={() => router.push('/menstrual')}>
            Menstrual Cycle
          </MainButton>
        </div>
      )}
    </OrangeBox>
  )
}

export default ProfileBox
