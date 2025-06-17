import MainButton from "@/components/button";
import ContainerMain from "@/container/main";
import React from "react";
import { useHistory } from "react-router";

const PagesAbout: React.FC = () => {
  const router = useHistory();
  return (
    <ContainerMain title="About">
      <div className="w-full h-full flex flex-col items-center justify-start bg-[#FFF]">
        <div className="text-red-500 font-bold">About Us Pages</div>
        <MainButton
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
    </ContainerMain>
  );
};

export default PagesAbout;
