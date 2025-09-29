import IconTitle from "@/components/common/icon-title";
import TextDescription from "@/components/common/text-description";
import Card from "@/components/wrapper/card";
import {IonIcon} from "@ionic/react";
import {DiseaseDetailsModel} from "@/models/disease-details";

type propTypes = {
    data: DiseaseDetailsModel;
};

const ContentsDiseaseDetails: React.FC<propTypes> = ({ data }) => {
    const ContentFoodInsight = ({ title, value, icon }: { title: string; value: string | string[]; icon: string; }) => {
        return (
            <>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-[32px] h-[32px] rounded-full bg-[#FF6223]/[0.12] flex items-center justify-center">
                            <IonIcon
                                icon={icon}
                                className="text-[16px]"
                            />
                        </div>
                        <h6 className="!font-bold !font-heading text-black !m-0">{title}</h6>
                    </div>
                    {Array.isArray(value) ? (
                        <ul className="!mt-0 list-disc ml-[16px]">
                            {value.map((item, index) => (
                                <li key={index} className="font-paragraph text-black/40 text-[14px] capitalize">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="font-paragraph text-black/40 text-[14px] !mt-0">{value}</p>
                    )}
                </div>
            </>
        );
    };

  return (
    <>
      <div className="px-4 py-4">
        <div className="relative">
          <TextDescription
            title={data.name.replace('_', ' ')}
            description={data.description}
            titleSize="large"
            withLinkRedirect={false}
          />
        </div>
          <div className="mt-6 py-[12px] px-[20px] bg-white rounded-[8px]">
              <div className="py-2 flex flex-col gap-4">
                  <ContentFoodInsight
                      title="Cause of Disease"
                      value={data.indicator}
                      icon="/icons/coution-icon.svg"
                  />
              </div>
          </div>
          <div className="mt-6">
              <IconTitle icon="/icons/meat.svg" title="Recommendation Food" />
              <div className="mt-4">
                  <Card>
                      <div className="py-4 px-4">
                          {data.recommendation_food.map((item, index) => {
                              return (
                                  <div key={index} className="text-black mb-3 last:mb-0 capitalize flex gap-3 items-start">
                                      <div>✔</div> <div className="self-center capitalize">{item}</div>
                                  </div>
                              );
                          })}
                      </div>
                  </Card>
              </div>
          </div>
          <div className="mt-6">
              <IconTitle icon="/icons/pin.svg" title="Recommendation Nutritional" />
              <div className="mt-4">
                  <Card>
                      <div className="py-4 px-4">
                          {data.recommendation_nutrient.map((item, index) => {
                              return (
                                  <div key={index} className="text-black mb-3 last:mb-0 capitalize flex gap-3 items-start">
                                      <div>✔</div> <div className="self-center capitalize">{item}</div>
                                  </div>
                              );
                          })}
                      </div>
                  </Card>
              </div>
          </div>
      </div>
    </>
  );
};

export default ContentsDiseaseDetails;
