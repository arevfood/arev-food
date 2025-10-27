import Card from '@/components/wrapper/card'
import TextDescription from '@/components/common/text-description'
import YellowBox from '@/components/wrapper/yellow-box'
import { IonImg } from '@ionic/react'
import { useHistory } from 'react-router'

type propTypes = {
  userInfo?: { title: string; value: string }[]
  additionalInfo?: { title: string; value: string }[]
}

const UserInfo: React.FC<propTypes> = ({ userInfo, additionalInfo }) => {
  const router = useHistory()

  return (
    <Card>
      <div className="px-4 py-6">
        {!userInfo && (
          <div className="w-full h-[100px] gap-2 mb-4 flex items-center justify-center bg-black_color/[0.03] rounded-[4px]">
            <p className="text-[0.875rem] text-black_color/[0.6] text-center">
              Add your details to personalize your nutrition journey.
            </p>
          </div>
        )}
        {userInfo && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {userInfo.map((item, index) => {
              return (
                <YellowBox withGradient key={index}>
                  <div
                    className="py-4 flex flex-col items-center justify-center"
                    onClick={() =>
                      router.push(
                        item.title === 'Gender' ? '/setting/profile' : '/setting/health-data',
                      )
                    }
                  >
                    <div className="font-bold text-[16px] font-heading text-primary_color">
                      {item.title}
                    </div>
                    <div className="font-paragraph text-[14px] text-black">{item.value}</div>
                  </div>
                </YellowBox>
              )
            })}
          </div>
        )}
        {additionalInfo && (
          <div className="flex flex-col gap-4" onClick={() => router.push('/setting/health-data')}>
            {additionalInfo.map((item, index) => {
              return (
                <div key={index} className="flex gap-[12px]">
                  <div className="w-[28px] h-[28px] aspect-square flex items-center justify-center rounded-[4px] bg-[#ff6223]/[0.12]">
                    <IonImg
                      src={!index ? '/icons/stethoscope-primary.svg' : '/icons/lemon-primary.svg'}
                      className="w-[14px] h-[14px] aspect-square"
                    />
                  </div>
                  <TextDescription
                    title={item.title}
                    description={item.value}
                    withLinkRedirect={false}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}

export default UserInfo
