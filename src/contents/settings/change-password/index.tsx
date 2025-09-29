import MainButton from '@/components/common/button'
import CustomInput from '@/components/common/input'
import { useToastAlert } from '@/hooks/ui/toast-alert'
import { useHistory } from 'react-router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IonSpinner } from '@ionic/react'
import { useAuth } from '@/hooks/data/authentication'

type inputProps = {
  password: string
  confirm_password: string
}

const ContentsSettingsChangePassword: React.FC = () => {
  const { onChangePassword, loading } = useAuth()
  const { showToast } = useToastAlert()
  const router = useHistory()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<inputProps>()

  const password = watch('password', '')

  const onSubmit: SubmitHandler<inputProps> = async (data) => {
    try {
      await onChangePassword(data.password)
      showToast({
        header: 'Password Updated',
        message: 'Your password has been changed.',
        type: 'success',
      })
      router.push('/setting')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.code === 'auth/requires-recent-login') {
        showToast({
          header: 'Update Failed',
          message: 'Please log in again to change.',
          type: 'error',
        })
      } else {
        showToast({
          header: 'Update Failed',
          message: 'Unable to change password. Try again.',
          type: 'error',
        })
      }
    } finally {
      setValue('password', '')
      setValue('confirm_password', '')
    }
  }

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="font-bold font-heading text-[22px] text-black">Change Password</div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">New Password</div>
        <CustomInput
          {...register('password', {
            required: 'Please input your password!',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters!',
            },
          })}
          placeholder="Password"
          type="Password"
          errorMessage={errors.password?.message}
        />
        <CustomInput
          {...register('confirm_password', {
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          })}
          type="password"
          placeholder="Confirm Password!"
          errorMessage={errors.confirm_password?.message}
        />
      </div>
      <div className="my-6">
        <MainButton
          color="ORANGE"
          onClick={() => {
            handleSubmit(onSubmit)()
          }}
          isDisabled={loading}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              Changing Password...
              <IonSpinner name="crescent" className="text-white w-[20px] h-[20px] ms-[6px]" />
            </div>
          ) : (
            'Change Password'
          )}
        </MainButton>
      </div>
    </form>
  )
}

export default ContentsSettingsChangePassword
