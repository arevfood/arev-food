import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import takePhoto from "@/utils/take-photo";
import {IonImg, IonSpinner} from "@ionic/react";
import {useToastAlert} from "@/hooks/ui/toast-alert";
import {SubmitHandler, useForm} from "react-hook-form";
import CustomSelect from "@/components/common/select-option";
import {useUser} from "@/hooks/data/user";
import {useEffect} from "react";
import {genderOptions} from "@/data/gender";

type inputProps = {
    fullname: string;
    email: string;
    phoneNumber: string;
    dateBirth: string;
    gender: string;
    country: string;
    city: string;
};

const ContentsSettingsProfile: React.FC = () => {
    const { data: userDetail, onUpdate, loading } = useUser();
    const { showToast } = useToastAlert();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<inputProps>();

    const onSubmit: SubmitHandler<inputProps> = async (data) => {
        const filteredPayload = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== "" && value != null)
        );
        const result = await onUpdate({ payload: filteredPayload });
        if (!result) {
            showToast("Edit profile failed!", "error");
            return;
        }
        showToast("Edit profile successful!", "success");
    };

    useEffect(() => {
        if (userDetail) {
            setValue('fullname', userDetail.fullname)
            setValue('email', userDetail.email)
            setValue('phoneNumber', userDetail.phoneNumber)
            setValue('dateBirth', userDetail.dateBirth)
            setValue('gender', userDetail.gender)
            setValue('country', userDetail.country)
            setValue('city', userDetail.city)
        }
    }, [userDetail, setValue])

return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="font-bold font-heading text-[22px] text-black">
                Edit Profile
            </div>
            <div className="mx-auto flex items-center justify-center mt-10">
                <div
                    onClick={() => {
                        takePhoto();
                    }}
                    className="relative w-fit rounded-full overflow-hidden"
                >
                    <IonImg
                        src="/images/user-placeholder.png"
                        className="w-[100px] h-[100px] rounded-full bg-[#FDEAC5] flex items-center justify-center relative"
                        style={{ borderRadius: "100%" }}
                    />
                </div>
            </div>
            <div className="mt-10">
                <div className="font-bold font-heading text-[18px] text-black mb-4">
                    Personal Information
                </div>
                <CustomInput
                    {...register("fullname", {
                        required: "Please input your full name!",
                    })}
                    placeholder="Full Name"
                    errorMessage={errors.fullname?.message}
                />
                <CustomInput
                    {...register("email",{
                        required: "Please input your email!"
                    })}
                    placeholder="Email"
                    type="email"
                    errorMessage={errors.email?.message}
                />
                <CustomInput
                    {...register("phoneNumber", {
                        required: "Please input your phone number!",
                    })}
                    placeholder="Phone Number"
                    errorMessage={errors.phoneNumber?.message}
                />
            </div>
            <div className="mt-4">
                <div className="font-bold font-heading text-[18px] text-black mb-4">
                    Basic Details
                </div>
                <CustomInput
                    {...register("dateBirth",{
                        required: "Please input your date of birth!"
                    })}
                    placeholder="Date of Birth"
                    type="date"
                    errorMessage={errors.dateBirth?.message}
                />
                <CustomSelect
                    placeholder="Gender"
                    value={watch("gender")}
                    options={genderOptions}
                    onChange={(val) => setValue("gender", val)}
                    errorMessage={errors.gender?.message}
                />
            </div>
            <div className="mt-4">
                <div className="font-bold font-heading text-[18px] text-black">
                    Location
                </div>
                <CustomInput
                    {...register("country", {
                        required: "Please input your country!",
                    })}
                    placeholder="Country"
                    errorMessage={errors.country?.message}
                />
                <CustomInput
                    {...register("city", {
                        required: "Please input your city!",
                    })}
                    placeholder="City"
                    errorMessage={errors.city?.message}
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

export default ContentsSettingsProfile;