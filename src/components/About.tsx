import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <figure className="about-profile">
        <div className="about-profile-glow" aria-hidden="true" />
        <img
          src="/images/Profile.jpg"
          alt="Horn Vanhong profile portrait"
          className="about-profile-img"
          loading="lazy"
        />
      </figure>
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          I am a Computer Science & Cyber Security student at the Royal University of Phnom Penh (RUPP) and ANT Center. I build secure networks and user-centric web/mobile interfaces using React Native, Flutter, and Next.js.
        </p>
      </div>
    </div>
  );
};

export default About;
