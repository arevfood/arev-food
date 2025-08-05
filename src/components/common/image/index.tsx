import { IonImg, IonSkeletonText, IonThumbnail } from "@ionic/react";
import { useEffect, useState } from "react";

type propTypes = {
  image: string;
};

const CustomImage: React.FC<propTypes> = ({ image }) => {
  const [loading, setLoading] = useState(true);
  const [displayImage, setDisplayImage] = useState(image);

  useEffect(() => {
    setDisplayImage(image);
  }, [image]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <IonThumbnail className="absolute top-0 left-0 w-full h-full bg-gray-200 z-10">
          <IonSkeletonText
            animated={true}
            style={{ width: "100%", height: "100%" }}
          />
        </IonThumbnail>
      )}
      <IonImg
        src={displayImage}
        className={`object-cover w-full h-full ${
          loading ? "invisible" : "visible"
        }`}
        onIonImgDidLoad={() => {
          setLoading(false);
        }}
        onIonError={() => {
          setDisplayImage("/images/placeholder.png");
          setLoading(false);
        }}
      />
    </div>
  );
};

export default CustomImage;
