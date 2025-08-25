import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import {useUser} from "@/hooks/data/user";
import {useToastAlert} from "@/hooks/ui/toast-alert";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";
import CustomSelect from "@/components/common/select-option";
import {dietaryPreferenceOptions} from "@/data/dietary-preference";
import {lifestyleOptions} from "@/data/lifestyle";
import {IonSpinner} from "@ionic/react";

type inputProps = {
    health: {
        height: number;
        weight: number;
        blood_sugar_level: number;
        blood_pressure: string;
        health_conditions: string;
        dietary_preference: string;
        lifestyle: string;
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
            showToast("Setup menstrual cycle failed!", "error");
            return;
        }

        showToast("Setup menstrual cycle successful!", "success");
    };

    useEffect(() => {
        if (userDetail) {
            setValue("health.height", userDetail.health?.height);
            setValue("health.weight", userDetail.health?.weight);
            setValue("health.blood_sugar_level", userDetail.health?.blood_sugar_level);
            setValue("health.blood_pressure", userDetail.health?.blood_pressure);
            setValue("health.health_conditions", userDetail.health?.health_conditions);
            setValue("health.dietary_preference", userDetail.health?.dietary_preference);
            setValue("health.lifestyle", userDetail.health?.lifestyle);
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
                        label="Diet Type"
                        placeholder="Choose your diet type"
                        value={watch("health.dietary_preference")}
                        options={dietaryPreferenceOptions}
                        onChange={(val) => setValue("health.dietary_preference", val)}
                        errorMessage={errors.health?.dietary_preference?.message}
                    />
                </div>
                <div className="mt-6">
                    <CustomSelect
                        label="Lifestyle"
                        placeholder="Choose your lifestyle"
                        value={watch("health.lifestyle")}
                        options={lifestyleOptions}
                        onChange={(val) => setValue("health.lifestyle", val)}
                        errorMessage={errors.health?.lifestyle?.message}
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