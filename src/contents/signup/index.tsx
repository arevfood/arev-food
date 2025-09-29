import MainButton from '@/components/common/button'
import CustomInput from '@/components/common/input'
import LayoutBlank from '@/layouts/blank'
import { useAuth } from '@/hooks/data/authentication'
import { IonImg, IonSpinner } from '@ionic/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useToastAlert } from '@/hooks/ui/toast-alert'

type inputProps = {
  fullname: string
  email: string
  password: string
  confirm_password: string
}

const ContentSignup: React.FC = () => {
  const { showToast } = useToastAlert()
  const router = useHistory()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<inputProps>()

  const { onSignup, loading } = useAuth()

  const onSubmit: SubmitHandler<inputProps> = async (data) => {
    const result = await onSignup(data)
    if (!result) {
      showToast({
        header: 'Registration Failed',
        message: 'Something went wrong. Please check your details.',
        type: 'error',
      })
      setValue('password', '')
      setValue('confirm_password', '')
      return
    }
    showToast({
      header: 'Account Created',
      message: 'Your account has been successfully registered.',
      type: 'success',
    })
    router.replace('/')
  }

  const password = watch('password', '')

  return (
    <LayoutBlank fullscreen={true} background="var(--color-bg_color_2)">
      <div className="h-full w-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-center">
          <IonImg src="/arev-logo.png" className="w-[150px]" />
        </div>
        <div className="px-[20px] w-full">
          <h1 className="text-black !font-bold font-heading">Create Your Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              {...register('fullname', {
                required: 'Please input your full name!',
              })}
              label="Full Name"
              placeholder="Enter your full name"
              errorMessage={errors.fullname?.message}
            />
            <CustomInput
              {...register('email', { required: 'Please input your email!' })}
              label="Email"
              placeholder="Enter your email"
              type="email"
              errorMessage={errors.email?.message}
            />
            <CustomInput
              {...register('password', {
                required: 'Please input your password!',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters!',
                },
              })}
              label="Password"
              placeholder="Enter your password"
              type="Password"
              errorMessage={errors.password?.message}
            />
            <CustomInput
              {...register('confirm_password', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              type="password"
              label="Confirm Password!"
              placeholder="Confirm your password"
              errorMessage={errors.confirm_password?.message}
            />
          </form>
          <div className="mt-4">
            <MainButton
              color="ORANGE"
              onClick={() => {
                handleSubmit(onSubmit)()
              }}
              isDisabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  Signing Up...
                  <IonSpinner name="crescent" className="text-white w-[20px] h-[20px] ms-[6px]" />
                </div>
              ) : (
                'Sign Up'
              )}
            </MainButton>
          </div>
          <div className="mt-[80px]">
            <div className="w-full text-black_color text-center opacity-30 text-[12px] mt-2">
              or sign up with
            </div>
            <div className="flex flex-wrap gap-2 justify-center items-center mt-6">
              <div className="w-[58px] h-[58px] rounded-full bg-white_color flex items-center justify-center text-black_color">
                <IonImg src="/icons/facebook.png" className="w-auto h-[24px]" />
              </div>
              <div className="w-[58px] h-[58px] rounded-full bg-white_color flex items-center justify-center text-black_color">
                <IonImg src="/icons/google.png" className="w-auto h-[24px]" />
              </div>
              <div className="w-[58px] h-[58px] rounded-full bg-white_color flex items-center justify-center text-black_color">
                <IonImg src="/icons/apple.png" className="w-auto h-[24px]" />
              </div>
            </div>
          </div>
          <div className="mt-[80px] flex flex-wrap items-center justify-center">
            <div className="text-center opacity-30 text-[12px] text-black_color">
              Already have an account?{' '}
            </div>
            <div
              className="ml-1 font-bold text-primary_color"
              onClick={() => {
                router.replace('/login')
              }}
            >
              Login here
            </div>
          </div>
        </div>
      </div>
    </LayoutBlank>
  )
}

export default ContentSignup
