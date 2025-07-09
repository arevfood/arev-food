import Card from "@/components/wrapper/card";
import { IonIcon, IonImg } from "@ionic/react";
import TextDescription from "@/components/common/text-description";

type propTypes = {
  image: string;
  title: string;
  description: string;
  isFav?: boolean;
};

const FoodCard: React.FC<propTypes> = ({
  image,
  title,
  description,
  isFav = false,
}) => {
  return (
    <Card>
      <div className="relative">
        <IonImg src={image} className="object-cover h-full w-full" />
        <div className="absolute top-[8px] right-[8px]">
          <IonIcon
            src="/icons/heart.svg"
            className={`${
              isFav ? "text-[#FF2323]" : "text-black_color/40"
            } text-[24px]`}
          />
        </div>
      </div>
      <div className="py-4 px-3 text-left">
        <TextDescription
          title={title}
          description={description}
          ellipsisDescription
        />
      </div>
    </Card>
  );
};

export default FoodCard;
