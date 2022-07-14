import ReactLoading from "react-loading";
import "./Loader.scss";

const Loader = () => {
  return (
    <ReactLoading
      type="spinningBubbles"
      color="#2f3ab2"
      className="loader"
    />
  );
};

export default Loader;
