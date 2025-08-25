import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import {useUser} from "@/hooks/data/user";
import {useToastAlert} from "@/hooks/ui/toast-alert";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import CustomSelect from "@/components/common/select-option";
import {dietTypeOptions} from "@/data/diet-type";
import {IonSpinner} from "@ionic/react";

type inputProps = {
    health: {
        height: number;
        weight: number;
        blood_sugar_level: number;
        blood_pressure: string;
        health_conditions: string;
        diet_type: string;
    }
};

const ContentsSettingsHealthData: React.FC = () => {
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
            health: Object.entries(data.health).reduce<Record<string, any>>(
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
            showToast({header: "Save Failed", message: "Couldn’t save health data. Please try again.", type: "error"});
            return;
        }

        showToast({header: "Data Saved", message: "Your health data has been successfully updated.", type: "success"});
    };

    useEffect(() => {
        if (userDetail) {
            setValue("health.height", userDetail.health?.height);
            setValue("health.weight", userDetail.health?.weight);
            setValue("health.blood_sugar_level", userDetail.health?.blood_sugar_level);
            setValue("health.blood_pressure", userDetail.health?.blood_pressure);
            setValue("health.health_conditions", userDetail.health?.health_conditions);
            setValue("health.diet_type", userDetail.health?.diet_type);
        }
    }, [userDetail, setValue]);

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="font-bold font-heading text-[22px] text-black">
        Edit Health Data
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">
          Physical Details
        </div>
        <div className="mt-6">
            <CustomInput
                {...register("health.height", {
                    required: "Please enter height!"
                })}
                placeholder="Height"
                type="number"
                errorMessage={errors.health?.height?.message}
            />
        </div>
        <div className="mt-6">
            <CustomInput
                {...register("health.weight", {
                    required: "Please enter weight!"
                })}
                placeholder="Weight"
                type="number"
                errorMessage={errors.health?.weight?.message}
            />
        </div>
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">
          Health Information
        </div>
        <div className="mt-6">
            <CustomInput
                {...register("health.blood_sugar_level", {
                    required: "Please enter blood sugar level!"
                })}
                placeholder="Blood Sugar Level"
                type="number"
                errorMessage={errors.health?.blood_sugar_level?.message}
            />
        </div>
        <div className="mt-6">
            <CustomInput
                {...register("health.blood_pressure", {
                    required: "Please enter blood pressure!"
                })}
                placeholder="Blood Pressure"
                errorMessage={errors.health?.blood_pressure?.message}
            />
        </div>
        <div className="mt-6">
            <CustomInput
                {...register("health.health_conditions", {
                    required: "Please enter health conditions!"
                })}
                placeholder="Health Conditions"
                errorMessage={errors.health?.health_conditions?.message}
            />
        </div>
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black">
          Dietary Preference
        </div>
        <div className="mt-6">
            <CustomSelect
                placeholder="Diet Type"
                value={watch("health.diet_type")}
                options={dietTypeOptions}
                onChange={(val) => setValue("health.diet_type", val)}
                errorMessage={errors.health?.diet_type?.message}
            />
        </div>
      </div>
      <div className="my-6">
          <MainButton
              color="ORANGE"
              onClick={() => {
                  handleSubmit(onSubmit)();
              }}
              isDisabled={loading}
          >
              {loading ? (
                  <div className="flex items-center gap-2">
                      Saving Changes...
                      <IonSpinner
                          name="crescent"
                          className="text-white w-[20px] h-[20px] ms-[6px]"
                      />
                  </div>
              ) : (
                  "Save Changes"
              )}
          </MainButton>
      </div>
    </form>
  );
};

export default ContentsSettingsHealthData;
