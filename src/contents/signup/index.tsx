import MainButton from "@/components/common/button";
import CustomInput from "@/components/common/input";
import ContainerBlank from "@/container/blank";
import { useAuth } from "@/hooks/data/authentication";
import { IonImg } from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router";

type inputProps = {
  fullname: string;
  email: string;
  password: string;
  confirm_password: string;
};

const ContentSignup: React.FC = () => {
  const router = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<inputProps>();

  const { onSignup } = useAuth();

  const onSubmit: SubmitHandler<inputProps> = async (data) => {
    await onSignup(data);
    router.replace("/");
  };

  const password = watch("password", "");

  return (
    <ContainerBlank fullscreen={true} background="#F2F3F5">
      <div className="h-full w-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-center">
          <IonImg src="/arev-logo.png" className="w-[150px]" />
        </div>
        <div className="px-[20px] w-full">
          <h1 className="text-black !font-bold font-heading">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              {...register("fullname", {
                required: "Please input your full name!",
              })}
              placeholder="Full Name"
              errorMessage={errors.fullname?.message}
            />
            <CustomInput
              {...register("email", { required: "Please input your email!" })}
              placeholder="Email"
              type="email"
              errorMessage={errors.email?.message}
            />
            <CustomInput
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters!",
                },
              })}
              placeholder="Password"
              type="Password"
              errorMessage={errors.password?.message}
            />
            <CustomInput
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type="password"
              placeholder="Confirm Password!"
              errorMessage={errors.confirm_password?.message}
            />
          </form>
          <div className="mt-4">
            <MainButton
              color="ORANGE"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Sign Up
            </MainButton>
          </div>
          <div className="mt-[80px]">
            <div className="w-full text-black_color text-center opacity-30 text-[12px] mt-2">
              or sign up with
            </div>
            <div className="flex flex-wrap gap-2 justify-center items-center mt-6">
              <div className="w-[58px] h-[58px] rounded-full bg-white_color flex items-center justify-center text-black_color">
                <IonImg src="/icons/facebook.png" className="w-auto h-[24px]" />
              </div>
              <div className="w-[58px] h-[58px] rounded-full bg-white_color flex items-center justify-center text-black_color">
                <IonImg src="/icons/google.png" className="w-auto h-[24px]" />
              </div>
              <div className="w-[58px] h-[58px] rounded-full bg-white_color flex items-center justify-center text-black_color">
                <IonImg src="/icons/apple.png" className="w-auto h-[24px]" />
              </div>
            </div>
          </div>
          <div className="mt-[80px] flex flex-wrap items-center justify-center">
            <div className="text-center opacity-30 text-[12px] text-black_color">
              Already have an account?{" "}
            </div>
            <div
              className="ml-1 font-bold text-primary_color"
              onClick={() => {
                router.replace("/login");
              }}
            >
              Login here
            </div>
          </div>
        </div>
      </div>
    </ContainerBlank>
  );
};

export default ContentSignup;
