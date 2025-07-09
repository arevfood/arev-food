type propTypes = {
  title: string;
  description?: string;
  ellipsisDescription?: boolean;
};

const TextDescription: React.FC<propTypes> = ({
  title,
  description,
  ellipsisDescription = false,
}) => {
  return (
    <div>
      <div className="font-bold font-heading text-black text-[16px]">
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
