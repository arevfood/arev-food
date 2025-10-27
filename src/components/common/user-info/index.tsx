import Card from '@/components/wrapper/card'
import TextDescription from '@/components/common/text-description'
import YellowBox from '@/components/wrapper/yellow-box'

type propTypes = {
  userInfo?: { title: string; value: string }[]
  additionalInfo?: { title: string; value: string }[]
}

const UserInfo: React.FC<propTypes> = ({ userInfo, additionalInfo }) => {
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
                  <div className="py-4 flex flex-col items-center justify-center">
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
          <div className="flex flex-col gap-4">
            {additionalInfo.map((item, index) => {
              return (
                <div key={index}>
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
