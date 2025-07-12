type propTypes = {
  title: string;
  titleClassName?: string;
  description?: string;
  titleSize?: "normal" | "large";
  ellipsisDescription?: boolean;
};

const TextDescription: React.FC<propTypes> = ({
  title,
  description,
  ellipsisDescription = false,
  titleSize = "normal",
  titleClassName,
}) => {
  const titleSizeMap = {
    normal: "text-[16px]",
    large: "text-[26px]",
  };

  return (
    <div>
      <div
        className={`font-bold font-heading text-black ${titleSizeMap[titleSize]} ${titleClassName}`}
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
  );
};

export default TextDescription;
