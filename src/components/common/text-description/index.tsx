import TextDescriptionSkeleton from "./skeleton";

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
        <div>
          <div
            className={`font-bold font-heading text-black leading-none mb-4 ${
              ellipsisTitle ? "line-clamp-1" : ""
            } ${titleSizeMap[titleSize]} ${titleClassName}`}
          >
            {title}
          </div>
          <div
            className={`font-paragraph text-black/40 text-[14px] ${
              ellipsisDescription ? "line-clamp-2" : ""
            }`}
          >
            {description}
          </div>
        </div>
      )}
    </>
  );
};

export default TextDescription;
