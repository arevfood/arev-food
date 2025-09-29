import Card from "@/components/wrapper/card";
import { IonSkeletonText, IonThumbnail } from "@ionic/react";
import TextDescriptionSkeleton from "@/components/common/text-description/skeleton";

type propTypes = {};

const DiseaseCardSkeleton: React.FC<propTypes> = () => {
    return (
        <Card className="cursor-pointer">
            <div className="relative">
                <IonThumbnail slot="start" className="w-full h-[125px] bg-gray-200">
                    <IonSkeletonText animated={true} style={{ width: "100%" }} />
                </IonThumbnail>
            </div>
            <div className="py-4 px-3 text-left">
                <TextDescriptionSkeleton />
            </div>
        </Card>
    );
};

export default DiseaseCardSkeleton;