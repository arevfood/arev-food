import Card from "@/components/wrapper/card";
import { IonRouterLink } from "@ionic/react";
import TextDescription from "@/components/common/text-description";
import DiseaseCardSkeleton from "./skeleton";

type propTypes = {
    title: string;
    description: string;
    slug: string;
    loading?: boolean;
};

const DiseaseCard: React.FC<propTypes> = ({
    title,
    description,
    loading = false,
    slug,
}) => {
    return (
        <>
            {loading && <DiseaseCardSkeleton />}
            {!loading && (
                <div className="relative w-full h-full">
                    <IonRouterLink routerLink={`/disease/${slug}`}>
                        <Card className="cursor-pointer h-full">
                            <div className="p-3.5 text-left h-[112px]">
                                <TextDescription
                                    title={title}
                                    description={description}
                                    ellipsisDescription
                                    ellipsisTitle
                                />
                            </div>
                        </Card>
                    </IonRouterLink>
                </div>
            )}
        </>
    );
};

export default DiseaseCard;