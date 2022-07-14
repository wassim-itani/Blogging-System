import useDocumentTitle from "../../hooks/useDocumentTitle";
import BloggingImg from "../../assets/blogging.jpg";
import { FaHeart } from "react-icons/fa";

import "./About.scss";

const About = () => {

  useDocumentTitle("About BLOGR - BLOGR");
  return (
    <section className="about">
      <img src={BloggingImg} alt="Blogging" className="about-img" />
      <h1 className="about-title">About BLOGR</h1>
      <p className="about-text">
        BLOGR is a community of software developers getting together to help one
        another out. The software industry relies on collaboration and networked
        learning. We provide a place for that to happen.
      </p>
      <p className="about-text">
        We’re an open platform where readers come to find insightful and dynamic
        thinking. Here, expert and undiscovered voices alike dive into the heart
        of any topic and bring new ideas to the surface. Our purpose is to
        spread these ideas and deepen understanding of the tech world.{" "}
      </p>

      <p className="about-text">
        We believe in transparency and adding value to the ecosystem. We hope
        you enjoy poking around and participating!
      </p>
      <p className="about-text">Happy blogging {<FaHeart color="red" />}</p>
    </section>
  );
};

export default About;
