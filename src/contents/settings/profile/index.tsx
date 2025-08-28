import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import { IonImg, IonSpinner } from "@ionic/react";
import { useToastAlert } from "@/hooks/ui/toast-alert";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomSelect from "@/components/common/select-option";
import { useUser } from "@/hooks/data/user";
import { useEffect, useState } from "react";
import { genderOptions } from "@/data/gender";
import axios from "axios";
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
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<inputProps>();

  const fetchCountries = async () => {
    try {
      const res = await axios.get("https://countriesnow.space/api/v0.1/countries/positions");
      const countryList = res.data.data.map((country: any) => country.name);
      setCountries(countryList);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCities = async (country: string) => {
    try {
      const res = await axios.post("https://countriesnow.space/api/v0.1/countries/cities", {
        country,
      });
      const data = Array.isArray(res.data.data) ? res.data.data : [];
      setCities(data);
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

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
    fetchCountries();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (userDetail) {
        setValue("fullname", userDetail.fullname);
        setValue("email", userDetail.email);
        setValue("phoneNumber", userDetail.phoneNumber);
        setValue("dateBirth", userDetail.dateBirth);
        setValue("gender", userDetail.gender);
        setValue("country", userDetail.country);
        setValue("city", userDetail.city);
        setValue("photoUrl", userDetail.photoUrl);

        await fetchCities(userDetail.country);
      }
    };

    loadData();
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
                required: "Please input your full name!",
              })}
              placeholder="Full Name"
              errorMessage={errors.fullname?.message}
          />
          <CustomInput
              {...register("email", {
                required: "Please input your email!",
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
              {...register("dateBirth", {
                required: "Please input your date of birth!",
              })}
              placeholder="Date of Birth"
              type="date"
              errorMessage={errors.dateBirth?.message}
          />
          <CustomSelect
              label="Gender"
              placeholder="Choose your gender"
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
          <CustomSelect
              label="Country"
              placeholder="Choose your country"
              value={watch("country")}
              options={countries.map((country) => ({ label: country, value: country }))}
              onChange={async (val) => {
                setValue("country", val);
                await fetchCities(val);
                setValue("city", "");
              }}
              errorMessage={errors.country?.message}
          />
          <CustomSelect
              label="City"
              placeholder="Choose your city"
              value={watch("city")}
              options={cities.map((city) => ({ label: city, value: city }))}
              onChange={(val) => setValue("city", val)}
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