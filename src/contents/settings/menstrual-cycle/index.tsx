import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import {SubmitHandler, useForm} from "react-hook-form";
import CustomSelect from "@/components/common/select-option";
import {cyclePatternOptions} from "@/data/cycle-pattern";

type inputProps = {
    last_period_start_date: string;
    average_cycle_length: number;
    cycle_pattern?: string;
    pms_intensity?: number;
};

const ContentsSettingsMenstrualCycle: React.FC = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<inputProps>();

    const onSubmit: SubmitHandler<inputProps> = async (data) => {
        console.log(data)
    };

  return (
    <div className="mt-4">
        <form className="bg-white py-6 px-4 rounded-[8px] !mb-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="font-bold font-heading text-[18px] text-black mb-4">
                🩸 Menstrual Details
            </div>
            <div>
                <CustomInput
                    {...register("last_period_start_date", {
                        required: "Please choose last period!"
                    })}
                    placeholder="Last Period Start Date"
                    type="date"
                    errorMessage={errors.last_period_start_date?.message}
                />
            </div>
            <div>
                <CustomInput
                    {...register("average_cycle_length", {
                        required: "Please enter average cycle!"
                    })}
                    placeholder="Average Cycle Length"
                    type="number"
                    errorMessage={errors.average_cycle_length?.message}
                />
            </div>
            <div>
                <CustomSelect
                    placeholder="Cycle Pattern (Optional)"
                    value={watch("cycle_pattern")}
                    options={cyclePatternOptions}
                    onChange={(val) => setValue("cycle_pattern", val)}
                    errorMessage={errors.cycle_pattern?.message}
                />
            </div>
            <div>
                <CustomInput
                    {...register("pms_intensity")}
                    placeholder="PMS Intensity (Optional)"
                    type="number"
                    errorMessage={errors.pms_intensity?.message}
                />
            </div>
            <div className="mt-8">
                <MainButton color="ORANGE" onClick={() => handleSubmit(onSubmit)()}>Complete Setup</MainButton>
            </div>
        </form>
    </div>
  );
};

export default ContentsSettingsMenstrualCycle;
