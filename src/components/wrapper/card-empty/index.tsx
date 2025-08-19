type propTypes = {
    title: string;
};

const CardEmpty: React.FC<propTypes> = ({ title }) => {
    return (
        <div className="w-full h-[160px] flex items-center justify-center text-center">
            <h6 className="!font-normal w-fit text-[0.875rem] text-black_color/[0.62]">{title}</h6>
        </div>
    );
};

export default CardEmpty;
