import TextDescriptionSkeleton from "./skeleton";
import {IonImg} from "@ionic/react";

type propTypes = {
  title: string;
  titleClassName?: string;
  description?: string;
  titleSize?: "normal" | "large";
  ellipsisDescription?: boolean;
  ellipsisTitle?: boolean;
  loading?: boolean;
};

const TextDescription: React.FC<propTypes> = ({
  title,
  description,
  ellipsisTitle = false,
  ellipsisDescription = false,
  titleSize = "normal",
  titleClassName,
  loading = false,
}) => {
  const titleSizeMap = {
    normal: "text-[16px]",
    large: "text-[26px]",
  };

  return (
    <>
      {loading && <TextDescriptionSkeleton />}
      {!loading && (
        <div className="h-full flex flex-col">
          <div
            className={`font-bold font-heading text-black leading-none mb-[4px] ${
              ellipsisTitle ? "line-clamp-2" : ""
            } ${titleSizeMap[titleSize]} ${titleClassName}`}
          >
            {title}
          </div>
          <div
            className={`font-paragraph text-black/40 text-[14px] leading-[128%] mb-[8px] ${
              ellipsisDescription ? "line-clamp-1" : ""
            }`}
          >
            {description}
          </div>
          <div className="font-paragraph text-primary_color text-[13px] leading-[128%] flex items-center gap-[8px] mt-auto">
            See Detail
            <IonImg src="/icons/arrow-right-primary.svg" className="w-[20px]"/>
          </div>
        </div>
      )}
    </>
  );
};

export default TextDescription;
