import { useEffect } from "react";
import { useUrlContext } from "../../context/UrlContext";
import "./About.css";

function About () {
  const {setTitle} = useUrlContext();

  useEffect(() => {
    setTitle("About");
  });
  
  return (
    <div className="container_about">
      <section className="subcontainer_about_text">
        <h2>SAVE SPACE</h2>
        <p>Welcome to <span>SAVE SPACE</span>, where every character counts! </p>

        <p>Our URL shortener doesn't just save space—it ensures transparency and confidence in every link you share. Instead of redirecting users immediately, our shortened URLs lead to an intermediary page, providing you with a preview of the destination's title.</p>

        <p>No more guesswork or uncertain clicks. With <span>SAVE SPACE</span>, you'll always know exactly where each shortened link will take you. Share links confidently, save space effortlessly, and streamline your online experience with us today.</p>

        <p>Try <span>SAVE SPACE</span> now and navigate the web with clarity and ease.</p>
      </section>
    </div>
  );
};

export default About;