import { IonSkeletonText } from "@ionic/react";

type propTypes = {};

const TextDescriptionSkeleton: React.FC<propTypes> = () => {
  return (
    <div>
      <div className={`font-bold font-heading text-black bg-gray-200`}>
        <IonSkeletonText animated style={{ width: "100%" }} />
      </div>
      <div
        className={`font-paragraph text-black/40 text-[14px] bg-gray-200 mt-2 w-[80%]`}
      >
        <IonSkeletonText animated style={{ width: "80%" }} />
      </div>
    </div>
  );
};

export default TextDescriptionSkeleton;
