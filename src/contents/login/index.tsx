import MainButton from "@/components/common/button";
import { useAuth } from "@/hooks/data/authentication";
import { IonContent, IonImg } from "@ionic/react";
import { SubmitHandler, useForm } from "react-hook-form";

type inputProps = {
  username: string;
  password: string;
};

const ContentLogin: React.FC = () => {
  const { register, handleSubmit } = useForm<inputProps>();
  const { onSignin } = useAuth();

  const onSubmit: SubmitHandler<inputProps> = async (data) => {
    await onSignin({ email: data.username, password: data.password });
  };

  return (
    <IonContent fullscreen style={{ "--background": "#FEF8EC" }}>
      <div className="h-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-center">
          <IonImg src="/arev-logo.png" className="w-[150px]" />
        </div>
        <div className="px-[20px]">
          <h1 className="text-black !font-bold font-heading">
            Login to your account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("username")}
              className="w-full bg-white px-4 py-3 rounded-[100px] !text-black !font-bold !border-none font-heading placeholder:opacity-30 placeholder:font-heading"
              placeholder="Email"
            />
            <input
              {...register("password")}
              className="w-full bg-white px-4 py-3 rounded-[100px] !text-black !font-bold !border-none !mt-4 font-heading placeholder:opacity-30 placeholder:font-heading"
              placeholder="Password"
              type="password"
            />
          </form>
          <div className="mt-4">
            <MainButton
              color="ORANGE"
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              Sign In
            </MainButton>
          </div>
          <div className="w-full text-black_color text-right opacity-30 text-[12px] mt-2">
            Forgot Password?
          </div>
          <div className="mt-[80px]">
            <div className="w-full text-black_color text-center opacity-30 text-[12px] mt-2">
              or continue With
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
              New here?{" "}
            </div>
            <div className="ml-1 font-bold text-primary_color">
              Create an Account
            </div>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default ContentLogin;
