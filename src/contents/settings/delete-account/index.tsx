import MainButton from '@/components/common/button'

const ContentsSettingDeleteAccount: React.FC = () => {
  return (
    <div className="mt-4">
      <div className="font-bold font-heading text-[22px] text-black">Delete Account</div>
      <div className="mt-4">
        <div className="font-bold font-heading text-[18px] text-black">
          Are you sure you want to delete your account?
        </div>
        <div className="font-normal font-paragraph text-[12px] text-black/40">
          This action is permanent and cannot be undone. All your data, including saved foods and
          health information, will be deleted.
        </div>
      </div>
      <div className="my-6">
        <MainButton color="ORANGE">Delete My Account</MainButton>
      </div>
    </div>
  )
}

export default ContentsSettingDeleteAccount
