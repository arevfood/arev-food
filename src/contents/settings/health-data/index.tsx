import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import { useUser } from "@/hooks/data/user";
import { useToastAlert } from "@/hooks/ui/toast-alert";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import CustomSelect from "@/components/common/select-option";
import { dietaryPreferenceOptions } from "@/data/dietary-preference";
import { IonSpinner } from "@ionic/react";

type inputProps = {
  health: {
    height: number;
    weight: number;
    blood_sugar_level: number;
    blood_pressure: string;
    health_conditions: string;
    dietary_preference: string;
    lifestyle: string;
  };
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
      health: Object.entries(data.health).reduce(
          (acc: { [key: string]: string }, [key, value]) => {
            acc[key] = value != null ? `${value}` : "";
            return acc;
          },
          {}
      ),
    };

    const result = await onUpdate({ payload: filteredPayload });

    if (!result) {
      showToast({
        header: "Save Failed",
        message: "Couldn’t save health data. Please try again.",
        type: "error",
      });
      return;
    }

    showToast({
      header: "Data Saved",
      message: "Your health data has been successfully updated.",
      type: "success",
    });
  };

  useEffect(() => {
    if (userDetail) {
      setValue("health.height", userDetail.health?.height);
      setValue("health.weight", userDetail.health?.weight);
      setValue(
        "health.blood_sugar_level",
        userDetail.health?.blood_sugar_level
      );
      setValue("health.blood_pressure", userDetail.health?.blood_pressure);
      setValue(
        "health.health_conditions",
        userDetail.health?.health_conditions
      );
      setValue(
        "health.dietary_preference",
        userDetail.health?.dietary_preference
      );
      setValue("health.lifestyle", userDetail.health?.lifestyle);
    }
  }, [userDetail, setValue]);

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="font-bold font-heading text-[22px] text-black">
        Edit Health Data
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black mb-4">
          Physical Details
        </div>
        <CustomInput
          {...register("health.height", {
            required: "Please enter height!",
          })}
          label="Height (Cm)"
          placeholder="Enter your height"
          type="number"
          errorMessage={errors.health?.height?.message}
        />
        <CustomInput
          {...register("health.weight", {
            required: "Please enter weight!",
          })}
          label="Weight (Kg)"
          placeholder="Enter your weight"
          type="number"
          errorMessage={errors.health?.weight?.message}
        />
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black mb-4">
          Health Information
        </div>
        <CustomInput
          {...register("health.blood_sugar_level", {
            required: "Please enter blood sugar level!",
          })}
          label="Blood Sugar Level (mg/dL)"
          placeholder="e.g. 90"
          type="number"
          errorMessage={errors.health?.blood_sugar_level?.message}
        />
        <CustomInput
          {...register("health.blood_pressure", {
            required: "Please enter blood pressure!",
          })}
          label="Blood Pressure (mmHg)"
          placeholder="e.g. 120/80"
          errorMessage={errors.health?.blood_pressure?.message}
        />
        <CustomInput
          {...register("health.health_conditions")}
          label="Health Conditions (Optional)"
          placeholder="e.g. Diabetes, Hypertension"
          errorMessage={errors.health?.health_conditions?.message}
        />
      </div>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black mb-4">
          Dietary Preference
        </div>
        <CustomSelect
          label="Diet Type"
          placeholder="Choose your diet type"
          value={watch("health.dietary_preference")}
          options={dietaryPreferenceOptions}
          onChange={(val) => setValue("health.dietary_preference", val)}
          errorMessage={errors.health?.dietary_preference?.message}
        />
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
