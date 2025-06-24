import { Link } from "react-router-dom";
import s from "./index.module.scss";

const ExploreContainer = () => {
  return (
    <div className={s.container}>
      <strong>Arev Food - Applications</strong>
      <p>
        here to see more details: <Link to="/about">About Us Halo</Link>
      </p>
      <p className="!font-paragraph !text-primary_color">
        ENV Test: {import.meta.env.VITE_COMPANY_NAME}
      </p>
    </div>
  );
};

export default ExploreContainer;
