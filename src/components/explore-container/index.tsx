import { Link } from "react-router-dom";
import s from "./index.module.scss";

const ExploreContainer = () => {
  return (
    <div className={s.container}>
      <strong>Arev Food - Applications</strong>
      <p>
        here to see more details: <Link to="/about">About Us</Link>
      </p>
    </div>
  );
};

export default ExploreContainer;
