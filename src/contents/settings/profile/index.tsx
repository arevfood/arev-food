import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import { IonImg, IonSpinner } from "@ionic/react";
import { useToastAlert } from "@/hooks/ui/toast-alert";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomSelect from "@/components/common/select-option";
import { useUser } from "@/hooks/data/user";
import { useEffect, useState } from "react";
import { genderOptions } from "@/data/gender";
import CustomInputPhoneNumber from "@/components/common/input-phone-number";

type inputProps = {
  fullname: string;
  email: string;
  phoneNumber: string;
  dateBirth: string;
  gender: string;
  country: string;
  city: string;
  photoUrl?: string;
};

const ContentsSettingsProfile: React.FC = () => {
  const { data: userDetail, onUpdate, loading } = useUser();
  const { showToast } = useToastAlert();
  const [photo, setPhoto] = useState<{
    file: File | null;
    preview: string | null;
  }>({
    file: null,
    preview: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<inputProps>();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPhoto({ file, preview: URL.createObjectURL(file) });
  };

  const onSubmit: SubmitHandler<inputProps> = async (data) => {
    const filteredPayload = Object.entries(data).reduce<{
      [key: string]: string;
    }>((acc, [key, value]) => {
      if (value !== "" && value != null) {
        acc[key] = String(value);
      }
      return acc;
    }, {});

    const result = await onUpdate({
      payload: filteredPayload,
      file: photo.file,
    });

    if (!result) {
      showToast({header: "Update Failed", message: "Couldn’t save your changes. Please try again.", type: "error"});
      return;
    }

    showToast({header: "Profile Updated", message: "Your profile information has been saved.", type: "success"});
    setPhoto({ file: null, preview: null });
  };

  useEffect(() => {
    if (userDetail) {
      setValue("fullname", userDetail.fullname);
      setValue("email", userDetail.email);
      setValue("phoneNumber", userDetail.phoneNumber);
      setValue("dateBirth", userDetail.dateBirth);
      setValue("gender", userDetail.gender);
      setValue("country", userDetail.country);
      setValue("city", userDetail.city);
      setValue("photoUrl", userDetail.photoUrl);
    }
  }, [userDetail, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-bold font-heading text-[22px] text-black">
        Edit Profile
      </div>
      <label className="mx-auto flex items-center justify-center mt-10 w-fit rounded-full overflow-hidden cursor-pointer">
        <IonImg
          src={
            photo.preview ||
            userDetail?.photoUrl ||
            "/images/user-placeholder.png"
          }
          className="w-[100px] h-[100px] rounded-full bg-[#FDEAC5] object-cover"
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </label>
      <div className="mt-10">
        <div className="font-bold font-heading text-[18px] text-black mb-4">
          Personal Information
        </div>
        <CustomInput
          {...register("fullname", {
            required: "Please input your full name",
          })}
          label="Full Name"
          placeholder="Enter your full name"
          errorMessage={errors.fullname?.message}
        />
        <CustomInput
          {...register("email", {
            required: "Please input your email!",
          })}
          label="Email"
          placeholder="Enter your email"
          type="email"
          errorMessage={errors.email?.message}
        />
        <CustomInputPhoneNumber
          {...register("phoneNumber", {
            required: "Please input your phone number!",
          })}
          label="Phone Number"
          errorMessage={errors.phoneNumber?.message}
        />
      </div>
      <div className="mt-4">
        <div className="font-bold font-heading text-[18px] text-black mb-4">
          Basic Details
        </div>
        <CustomInput
          {...register("dateBirth", {
            required: "Please input your date of birth!",
          })}
          label="Date of Birth"
          placeholder="Choose your date of birth"
          type="date"
          errorMessage={errors.dateBirth?.message}
        />
        <CustomSelect
          placeholder="Enter your Gender"
          value={watch("gender")}
          options={genderOptions}
          onChange={(val) => setValue("gender", val)}
          errorMessage={errors.gender?.message}
        />
      </div>
      <div className="mt-4">
        <div className="font-bold font-heading text-[18px] text-black mb-4">
          Location
        </div>
        <CustomInput
          {...register("country", {
            required: "Please input your country!",
          })}
          label="Country"
          placeholder="Enter your country"
          errorMessage={errors.country?.message}
        />
        <CustomInput
          {...register("city", {
            required: "Please input your city!",
          })}
          label="City"
          placeholder="Enter your city"
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
