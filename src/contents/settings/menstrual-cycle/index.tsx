import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import {SubmitHandler, useForm} from "react-hook-form";
import CustomSelect from "@/components/common/select-option";
import {useUser} from "@/hooks/data/user";
import {useToastAlert} from "@/hooks/ui/toast-alert";
import {useEffect} from "react";
import {IonSpinner} from "@ionic/react";
import {cyclePatternOptions} from "@/data/cycle-pattern";
import {pmsIntensityOptions} from "@/data/pms-intensity";

type inputProps = {
    menstrual_cycle: {
        last_period_start_date: string;
        average_cycle_length: number;
        cycle_pattern?: string;
        pms_intensity?: string;
    }
};

const ContentsSettingsMenstrualCycle: React.FC = () => {
    const { data: userDetail, onUpdate, loading } = useUser();
    const { showToast } = useToastAlert();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<inputProps>();

    const onSubmit: SubmitHandler<inputProps> = async (data) => {
        const filteredPayload = {
            menstrual_cycle: Object.entries(data.menstrual_cycle).reduce<Record<string, any>>(
                (acc, [key, value]) => {
                    if (value !== "" && value != null) {
                        acc[key] = value;
                    }
                    return acc;
                }, {}
            ),
        };

        const result = await onUpdate({ payload: filteredPayload });

        if (!result) {
            showToast("Setup menstrual cycle failed!", "error");
            return;
        }

        showToast("Setup menstrual cycle successful!", "success");
    };

    useEffect(() => {
        if (userDetail) {
            setValue("menstrual_cycle.last_period_start_date", userDetail.menstrual_cycle?.last_period_start_date);
            setValue("menstrual_cycle.average_cycle_length", userDetail.menstrual_cycle?.average_cycle_length);
            setValue("menstrual_cycle.cycle_pattern", userDetail.menstrual_cycle?.cycle_pattern);
            setValue("menstrual_cycle.pms_intensity", userDetail.menstrual_cycle?.pms_intensity);
        }
    }, [userDetail, setValue]);

  return (
    <div className="mt-4">
        <form className="bg-white py-6 px-4 rounded-[8px] !mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="font-bold font-heading text-[18px] text-black mb-4">
                🩸 Menstrual Details
            </div>
            <div>
                <CustomInput
                    {...register("menstrual_cycle.last_period_start_date", {
                        required: "Please choose last period!"
                    })}
                    placeholder="Last Period Start Date"
                    type="date"
                    errorMessage={errors.menstrual_cycle?.last_period_start_date?.message}
                />
            </div>
            <div>
                <CustomInput
                    {...register("menstrual_cycle.average_cycle_length", {
                        required: "Please enter average cycle!"
                    })}
                    placeholder="Average Cycle Length"
                    type="number"
                    errorMessage={errors.menstrual_cycle?.average_cycle_length?.message}
                />
            </div>
            <div>
                <CustomSelect
                    label="Cycle Pattern (Optional)"
                    placeholder="Choose cycle pattern"
                    value={watch("menstrual_cycle.cycle_pattern")}
                    options={cyclePatternOptions}
                    onChange={(val) => setValue("menstrual_cycle.cycle_pattern", val)}
                    errorMessage={errors.menstrual_cycle?.cycle_pattern?.message}
                />
            </div>
            <div>
                <CustomSelect
                    label="PMS Intensity (Optional)"
                    placeholder="Choose pms intensity"
                    value={watch("menstrual_cycle.pms_intensity")}
                    options={pmsIntensityOptions}
                    onChange={(val) => setValue("menstrual_cycle.pms_intensity", val)}
                    errorMessage={errors.menstrual_cycle?.pms_intensity?.message}
                />
            </div>
            <div className="mt-8">
                <MainButton
                    color="ORANGE"
                    onClick={() => {
                        handleSubmit(onSubmit)();
                    }}
                    isDisabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            Completed...
                            <IonSpinner
                                name="crescent"
                                className="text-white w-[20px] h-[20px] ms-[6px]"
                            />
                        </div>
                    ) : (
                        "Complete Setup"
                    )}
                </MainButton>
            </div>
        </form>
    </div>
  );
};

export default ContentsSettingsMenstrualCycle;
