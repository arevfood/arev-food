import { useEffect, useRef, useState } from 'react'
import { IonModal, IonContent, IonSpinner } from '@ionic/react'
import { useAuth } from '@/hooks/data/authentication'
import { useToastAlert } from '@/hooks/ui/toast-alert'
import MainButton from '@/components/common/button'
import CustomInput from '../input'
import { SubmitHandler, useForm } from 'react-hook-form'

const ResetPassword: React.FC = () => {
  const { showToast } = useToastAlert()
  const modal = useRef<HTMLIonModalElement>(null)
  const page = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ email: string }>()

  const [presentingElement, setPresentingElement] = useState<HTMLElement | null>(null)

  const { onResetPassword, loading } = useAuth()

  useEffect(() => {
    setPresentingElement(page.current)
  }, [])

  function dismiss() {
    modal.current?.dismiss()
  }

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    await onResetPassword(
      { email: data.email },
      {
        onSuccess: () => {
          showToast({
            header: 'Reset Password Successful',
            message: 'Please check your email for the reset password link.',
            type: 'success',
          })
          setValue('email', '')
          dismiss()
        },
        onError: () => {
          showToast({
            header: 'Reset Password Failed',
            message: 'Unable to reset password. Please try again.',
            type: 'error',
          })
        },
      },
    )
  }

  return (
    <>
      <div className="w-full flex items-end justify-end">
        <div
          id="reset-password-modal"
          className="w-fit text-black_color text-right opacity-30 text-[12px] mt-2 cursor-pointer"
        >
          Forgot Password?
        </div>
      </div>
      <IonModal
        ref={modal}
        trigger="reset-password-modal"
        presentingElement={presentingElement!}
        className="px-[20px] bg-black/80"
        style={{
          '--width': '100%',
          '--height': '350px',
          '--border-radius': '24px',
        }}
        showBackdrop={true}
        mode="md"
      >
        <IonContent className="px-[20px]">
          <div className="px-5 py-8 w-full h-full flex items-center justify-center flex-col bg-white">
            <div className="w-full">
              <div className="font-bold font-heading text-[22px] text-black mb-6 text-center">
                Reset Password
              </div>
              <CustomInput
                {...register('email', {
                  required: 'Please input your email!',
                })}
                label=""
                placeholder="Enter your email"
                type="email"
                errorMessage={errors.email?.message}
              />
              <div className="mt-8">
                <MainButton color="ORANGE" onClick={handleSubmit(onSubmit)} isDisabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      Resetting Password...
                      <IonSpinner
                        name="crescent"
                        className="text-white w-[20px] h-[20px] ms-[6px]"
                      />
                    </div>
                  ) : (
                    'Reset Password'
                  )}
                </MainButton>
              </div>
              <div className="mt-4">
                <MainButton color="ORANGE_OUTLINE" onClick={dismiss}>
                  Cancel
                </MainButton>
              </div>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </>
  )
}

export default ResetPassword
