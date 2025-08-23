import { IonImg } from "@ionic/react";
import Tags from "@/components/common/tags";

type propTypes = {
  title: string;
  value: string | number;
  unit?: string;
  image?: string;
};

const HealthData: React.FC<propTypes> = ({ title, value, unit, image }) => {
  return (
    <div className="rounded-[8px] min-h-[180px] relative overflow-hidden">
      <IonImg
        className="absolute w-full h-full top-0 left-0 object-cover"
        src={image}
      />
      <div className="bg-linear-to-t to-transparent from-[#F9B83F] absolute bottom-0 left-0 h-full w-full" />
      <div className="z-10 absolute bottom-0 w-full px-[10px] pb-[16px]">
        <div className="font-bold font-heading text-[16px] text-white">
          {title}
        </div>
        <div className="font-paragraph font-light text-[32px] text-white ">
          {value}
          <span className="text-[12px] font-normal">{unit}</span>
        </div>
      </div>
      <div className="absolute top-[8px] left-[10px] ">
        <Tags label="Normal" />
      </div>
    </div>
  );
};

export default HealthData;
