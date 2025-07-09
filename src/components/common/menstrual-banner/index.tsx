import Avatar from "@/components/common/avatar";
import OrangeBox from "@/components/wrapper/orange-box";

type propTypes = {
  title?: string;
  subtitle?: string;
  description?: string;
  images?: string;
};

const MenstrualBanner: React.FC<propTypes> = ({
  title,
  description,
  subtitle,
  images,
}) => {
  return (
    <OrangeBox>
      <div className="flex flex-wrap gap-4 items-center">
        <Avatar image={images || "/images/menstrual-01.png"} />
        <div className="flex flex-wrap flex-col gap-2">
          <div className="font-heading font-bold text-[16px]">
            {title || "Current Phase"}
          </div>
          <p className="text-[14px]">{subtitle || "Luteal Phase"}</p>
          <p className="text-[14px] italic">
            {description || "*Days Until Next Period: 10 Days"}
          </p>
        </div>
      </div>
    </OrangeBox>
  );
};

export default MenstrualBanner;
