import MainButton from '@/components/common/button'
import CustomInput from '@/components/common/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomSelect from '@/components/common/select-option'
import { useUser } from '@/hooks/data/user'
import { useToastAlert } from '@/hooks/ui/toast-alert'
import { useEffect } from 'react'
import { IonSpinner } from '@ionic/react'
import { cyclePatternOptions } from '@/data/cycle-pattern'
import CustomInputDate from '@/components/common/input-date'
import { pmsIntensityOptions } from '@/data/pms-intensity'
import { trackMenstrualCycleOptions } from '@/data/track-menstrual-cycle'
import { useHistory } from 'react-router'

type inputProps = {
  menstrual_cycle: {
    last_period_start_date: string
    average_cycle_length: number
    cycle_pattern?: string
    pms_intensity?: string
    track_menstrual_cycle?: string
  }
}

const ContentsSettingsMenstrualCycle: React.FC = () => {
  const { data: userDetail, onUpdate, loading } = useUser()
  const { showToast } = useToastAlert()
  const router = useHistory()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<inputProps>()

  const onSubmit: SubmitHandler<inputProps> = async (data) => {
    const filteredPayload = {
      menstrual_cycle: Object.entries(data.menstrual_cycle).reduce(
        (acc: { [key: string]: string }, [key, value]) => {
          acc[key] = value != null ? String(value) : ''
          return acc
        },
        {},
      ),
    }

    const result = await onUpdate({ payload: filteredPayload })

    if (!result) {
      showToast({
        header: 'Save Failed',
        message: 'Couldn’t update cycle data. Please try again.',
        type: 'error',
      })
      return
    }

    showToast({
      header: 'Cycle Saved',
      message: 'Your menstrual cycle data has been updated.',
      type: 'success',
    })
    router.push('/setting')
  }

  useEffect(() => {
    if (userDetail) {
      setValue(
        'menstrual_cycle.last_period_start_date',
        userDetail.menstrual_cycle?.last_period_start_date,
      )
      setValue(
        'menstrual_cycle.average_cycle_length',
        userDetail.menstrual_cycle?.average_cycle_length,
      )
      setValue('menstrual_cycle.cycle_pattern', userDetail.menstrual_cycle?.cycle_pattern)
      setValue('menstrual_cycle.pms_intensity', userDetail.menstrual_cycle?.pms_intensity)
      setValue(
        'menstrual_cycle.track_menstrual_cycle',
        userDetail.menstrual_cycle?.track_menstrual_cycle ?? 'yes',
      )
    }
  }, [userDetail, setValue])

  return (
    <div className="mt-4">
      <form className="bg-white py-6 px-4 rounded-[8px] !mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="font-bold font-heading text-[18px] text-black mb-4">
          🩸 Menstrual Details
        </div>
        <div>
          <CustomInputDate
            {...register('menstrual_cycle.last_period_start_date', {
              required: 'Please choose last period!',
            })}
            value={watch('menstrual_cycle.last_period_start_date')}
            label="Last Period Start Date"
            errorMessage={errors.menstrual_cycle?.last_period_start_date?.message}
          />
        </div>
        <div>
          <CustomInput
            {...register('menstrual_cycle.average_cycle_length', {
              required: 'Please enter average cycle!',
              min: {
                value: 1,
                message: 'Cycle length must be at least 1 day',
              },
              max: {
                value: 99,
                message: 'Cycle length cannot be more than 99 days',
              },
              valueAsNumber: true,
            })}
            label="Average Cycle Length"
            placeholder="days, e.g. 30"
            type="number"
            inputProps={{ min: 1, max: 99 }}
            errorMessage={errors.menstrual_cycle?.average_cycle_length?.message}
          />
        </div>
        <div>
          <CustomSelect
            label="Cycle Pattern (Optional)"
            placeholder="Choose your Cycle Pattern (Optional)"
            value={watch('menstrual_cycle.cycle_pattern')}
            options={cyclePatternOptions}
            onChange={(val) => setValue('menstrual_cycle.cycle_pattern', val)}
            errorMessage={errors.menstrual_cycle?.cycle_pattern?.message}
          />
        </div>
        <div>
          <CustomSelect
            label="PMS Intensity (Optional)"
            placeholder="Choose your PMS Intensity (Optional)"
            value={watch('menstrual_cycle.pms_intensity')}
            options={pmsIntensityOptions}
            onChange={(val) => setValue('menstrual_cycle.pms_intensity', val)}
            errorMessage={errors.menstrual_cycle?.pms_intensity?.message}
          />
        </div>
        <div>
          <CustomSelect
            label="Track Menstrual Cycle"
            placeholder="Do you want to track your menstrual cycle?"
            value={watch('menstrual_cycle.track_menstrual_cycle')}
            options={trackMenstrualCycleOptions}
            onChange={(val) => setValue('menstrual_cycle.track_menstrual_cycle', val)}
            errorMessage={errors.menstrual_cycle?.track_menstrual_cycle?.message}
          />
        </div>
        <div className="mt-8">
          <MainButton
            color="ORANGE"
            onClick={() => {
              handleSubmit(onSubmit)()
            }}
            isDisabled={loading}
          >
            {loading && (
              <div className="flex items-center gap-2">
                Completed...
                <IonSpinner name="crescent" className="text-white w-[20px] h-[20px] ms-[6px]" />
              </div>
            )}
            {!loading && 'Complete Setup'}
          </MainButton>
        </div>
      </form>
    </div>
  )
}

export default ContentsSettingsMenstrualCycle
