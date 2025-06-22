import MainButton from "@/components/common/button";
import ContainerMain from "@/container/main";
import React from "react";

const PagesAbout: React.FC = () => {
  return (
    <ContainerMain title="About">
      <div className="w-full h-full flex flex-col items-center justify-start bg-[#FFF]">
        <div className="text-red-500 font-bold">About Us Pages</div>
        <MainButton>About Us</MainButton>
      </div>
    </ContainerMain>
  );
};

export default PagesAbout;
