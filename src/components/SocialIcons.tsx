import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTelegram,
} from "react-icons/fa6";
// import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import gsap from "gsap";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const cleanups: Array<() => void> = [];

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      // Set initial variables for centering
      gsap.set(link, { "--siLeft": "20px", "--siTop": "20px" });

      const xTo = gsap.quickTo(link, "--siLeft", { duration: 0.2, ease: "power2.out" }) as any;
      const yTo = gsap.quickTo(link, "--siTop", { duration: 0.2, ease: "power2.out" }) as any;

      const onMouseMove = (e: MouseEvent) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          xTo(`${x}px`);
          yTo(`${y}px`);
        } else {
          xTo(`${rect.width / 2}px`);
          yTo(`${rect.height / 2}px`);
        }
      };

      const onMouseLeave = () => {
        const rect = elem.getBoundingClientRect();
        xTo(`${rect.width / 2}px`);
        yTo(`${rect.height / 2}px`);
      };

      elem.addEventListener("mousemove", onMouseMove);
      elem.addEventListener("mouseleave", onMouseLeave);

      cleanups.push(() => {
        elem.removeEventListener("mousemove", onMouseMove);
        elem.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href="https://github.com/HornVanhong" target="_blank">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href="https://www.linkedin.com/in/horn-vanhong-45366324a/" target="_blank">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href="https://t.me/vanhongVH" target="_blank">
            <FaTelegram />
          </a>
        </span>
        <span>
          <a href="https://www.instagram.com/hornvanhong" target="_blank">
            <FaInstagram />
          </a>
        </span>
      </div>
      <a className="resume-button" href="/CV/Horn%20Vanhong(CV).pdf" download="Horn_Vanhong_CV.pdf">
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
