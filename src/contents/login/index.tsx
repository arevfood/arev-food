import MainButton from '@/components/common/button'
import CustomInput from '@/components/common/input'
import LayoutBlank from '@/layouts/blank'
import { useAuth } from '@/hooks/data/authentication'
import { IonImg, IonSpinner } from '@ionic/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import { useToastAlert } from '@/hooks/ui/toast-alert'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { firebaseDb } from '@/utils/connections/firebase'
import ResetPassword from '@/components/common/reset-password'

type inputProps = {
  email: string
  password: string
}

const ContentLogin: React.FC = () => {
  const { showToast } = useToastAlert()
  const router = useHistory()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<inputProps>()

  const { onSignin, loading, loginWithGoogle, loginWithFacebook, loginWithApple } = useAuth()

  const onSubmitApple = async () => {
    try {
      const user = await loginWithApple()

      if (user) {
        const userRef = doc(firebaseDb, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            fullname: user.displayName || '',
            email: user.email,
            photoURL: user.photoURL || null,
            createdAt: new Date(),
          })
          showToast({
            header: 'Account Created',
            message: 'Welcome! Your account has been set up.',
            type: 'success',
          })
        } else {
          showToast({
            header: 'Login Successful',
            message: `Welcome back, ${user.displayName || 'User'}!`,
            type: 'success',
          })
        }

        router.replace('/')
      }
    } catch (_error) {
      showToast({
        header: 'Login Failed',
        message: 'Something went wrong while signing in with Apple.',
        type: 'error',
      })
    }
  }

  const onSubmit: SubmitHandler<inputProps> = async (data) => {
    await onSignin(data, {
      onSuccess: () => {
        showToast({
          header: 'Login Successful',
          message: 'Welcome back, you’re now signed in.',
          type: 'success',
        })
        router.replace('/')
      },
      onError: () => {
        showToast({
          header: 'Login Failed',
          message: 'Invalid email or password. Please try again.',
          type: 'error',
        })
        setValue('password', '')
      },
    })
  }

  const onSubmitGoogle = async () => {
    try {
      const user = await loginWithGoogle()

      if (user) {
        const userRef = doc(firebaseDb, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            fullname: user.displayName || '',
            email: user.email,
            photoURL: user.photoURL || null,
            createdAt: new Date(),
          })
          showToast({
            header: 'Account Created',
            message: 'Welcome! Your account has been set up.',
            type: 'success',
          })
        } else {
          showToast({
            header: 'Login Successful',
            message: `Welcome back, ${user.displayName || 'User'}!`,
            type: 'success',
          })
        }

        router.replace('/')
      }
    } catch (_error) {
      showToast({
        header: 'Login Failed',
        message: 'Something went wrong while signing in with Google.',
        type: 'error',
      })
    }
  }

  const onSubmitFacebook = async () => {
    try {
      const user = await loginWithFacebook()

      if (user) {
        const userRef = doc(firebaseDb, 'users', user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            fullname: user.displayName || '',
            email: user.email,
            photoURL: user.photoURL || null,
            createdAt: new Date(),
          })
          showToast({
            header: 'Account Created',
            message: 'Welcome! Your account has been set up.',
            type: 'success',
          })
        } else {
          showToast({
            header: 'Login Successful',
            message: `Welcome back, ${user.displayName || 'User'}!`,
            type: 'success',
          })
        }

        router.replace('/')
      }
    } catch (_error) {
      showToast({
        header: 'Login Failed',
        message: 'Something went wrong while signing in with Facebook.',
        type: 'error',
      })
    }
  }

  return (
    <LayoutBlank fullscreen={true} background="var(--color-bg_color_2)">
      <div className="h-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-center">
          <IonImg src="/arev-logo.png" className="w-[150px]" />
        </div>
        <div className="px-[20px] w-full">
          <h1 className="text-black !font-bold font-heading">Login to your account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              {...register('email', {
                required: 'Please input your email!',
              })}
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
              type="password"
              errorMessage={errors.password?.message}
            />
          </form>
          <div>
            <MainButton
              color="ORANGE"
              onClick={() => {
                handleSubmit(onSubmit)()
              }}
              isDisabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  Logging In...
                  <IonSpinner name="crescent" className="text-white w-[20px] h-[20px] ms-[6px]" />
                </div>
              ) : (
                'Sign In'
              )}
            </MainButton>
          </div>
          <ResetPassword />
          <div className="mt-[80px]">
            <div className="w-full text-black_color text-center opacity-30 text-[12px] mt-2">
              or continue With
            </div>
            <div className="flex flex-wrap gap-2 justify-center items-center mt-6">
              <button
                type="button"
                className="w-[58px] h-[58px] !rounded-full bg-white_color flex items-center justify-center text-black_color"
                onClick={onSubmitFacebook}
              >
                <IonImg src="/icons/facebook.png" className="w-auto h-[24px]" />
              </button>
              <button
                type="button"
                className="w-[58px] h-[58px] !rounded-full bg-white_color flex items-center justify-center text-black_color"
                onClick={onSubmitGoogle}
              >
                <IonImg src="/icons/google.png" className="w-auto h-[24px]" />
              </button>
              <button
                type="button"
                className="w-[58px] h-[58px] !rounded-full bg-white_color flex items-center justify-center text-black_color opacity-50"
                onClick={onSubmitApple}
              >
                <IonImg src="/icons/apple.png" className="w-auto h-[24px]" />
              </button>
            </div>
          </div>
          <div className="mt-[20px] mb-[40px] flex flex-wrap items-center justify-center">
            <div className="text-center opacity-30 text-[12px] text-black_color">New here? </div>
            <div
              className="ml-1 font-bold text-primary_color"
              onClick={() => {
                router.replace('/signup')
              }}
            >
              Create an Account
            </div>
          </div>
        </div>
      </div>
    </LayoutBlank>
  )
}

export default ContentLogin
