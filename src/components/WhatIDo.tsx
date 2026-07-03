import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FaCode,
  FaGlobe,
  FaMobileAlt,
  FaNetworkWired,
  FaShieldAlt,
} from "react-icons/fa";
// import "./styles/WhatIDo.css";

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  name: string;
  level: number;
}

interface SkillGroup {
  title: string;
  summary: string;
  icon: ReactNode;
  level: string;
  focus: string;
  skills: SkillBarProps[];
  tools: string[];
  image: string;
}

const skillGroups: SkillGroup[] = [
  {
    title: "Cyber Security",
    summary: "Security fundamentals, Linux administration, and secure system auditing.",
    icon: <FaShieldAlt aria-hidden="true" />,
    level: "Core focus",
    focus: "Defensive systems",
    skills: [
      { name: "Linux (Kali, CentOS, Debian)", level: 80 },
      { name: "Cybersecurity Principles", level: 75 },
      { name: "Database Security (SQL Audits)", level: 70 },
      { name: "Defensive Coding Standards", level: 65 },
    ],
    tools: ["Kali Linux", "SQL", "Git", "Wireshark"],
    image: "/cyber_security_banner.png",
  },
  {
    title: "App Development",
    summary: "Mobile UI creation, cross-platform apps, and database integration.",
    icon: <FaMobileAlt aria-hidden="true" />,
    level: "Applied",
    focus: "Mobile delivery",
    skills: [
      { name: "Flutter & Dart", level: 85 },
      { name: "React Native", level: 75 },
      { name: "Java (Android SDK)", level: 70 },
      { name: "PHP / backend API structures", level: 65 },
    ],
    tools: ["Flutter", "React Native", "Java", "REST APIs"],
    image: "/app_development_banner.png",
  },
  {
    title: "Web Development",
    summary: "Responsive front-end development with standard and modern toolsets.",
    icon: <FaGlobe aria-hidden="true" />,
    level: "Strong",
    focus: "Modern interfaces",
    skills: [
      { name: "HTML / CSS / JavaScript", level: 85 },
      { name: "React.js / Next.js", level: 80 },
      { name: "TypeScript", level: 70 },
      { name: "CSS Modules / Sass / styled-components", level: 70 },
    ],
    tools: ["React", "Next.js", "TypeScript", "Figma Design"],
    image: "/web_development_banner.png",
  },
  {
    title: "Networking & Admin",
    summary: "LAN setup, Cisco NetAcad configurations, and packet capture analytics.",
    icon: <FaNetworkWired aria-hidden="true" />,
    level: "Practical",
    focus: "Network operations",
    skills: [
      { name: "Cisco Routing & Switching", level: 75 },
      { name: "Network Configuration Labs", level: 70 },
      { name: "Protocol Sniffing (ARP, DNS)", level: 65 },
    ],
    tools: ["Cisco Packet Tracer", "ARP", "DNS", "DHCP"],
    image: "/networking_admin_banner.png",
  },
];

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  return (
    <div className="skill-bar">
      <div className="skill-bar-header">
        <span>{name}</span>
        <span className="skill-percent" data-level={level}>0%</span>
      </div>
      <div className="skill-bar-bg">
        <div className="skill-bar-fill" style={{ width: "0%" }} data-level={level} />
      </div>
    </div>
  );
};

const WhatIDo = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchLayout = window.matchMedia("(max-width: 900px), (pointer: coarse)").matches;

    if (prefersReducedMotion || isTouchLayout) {
      gsap.set([
        ".skills-header > *",
        ".skills-overview > div",
        ".skill-card",
        ".skill-bar-fill"
      ], { opacity: 1, y: 0, clearProps: "transform" });
      containerRef.current.querySelectorAll<HTMLElement>(".skill-bar-fill").forEach((fill) => {
        fill.style.width = `${fill.dataset.level ?? 0}%`;
      });
      containerRef.current.querySelectorAll<HTMLElement>(".skill-percent").forEach((percent) => {
        percent.textContent = `${percent.dataset.level ?? 0}%`;
      });
      return;
    }

    // Set initial states
    gsap.set([
      ".skills-header > *",
      ".skills-overview > div",
      ".skill-card"
    ], {
      opacity: 0,
      y: 35
    });

    // 1. Header scroll animation
    gsap.to(".skills-header > *", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-header",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // 2. Overview scroll animation
    gsap.to(".skills-overview > div", {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-overview",
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });

    // 3. Cards reveal
    gsap.to(".skill-card", {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // 4. Progress bar fills
    const bars = containerRef.current?.querySelectorAll(".skill-bar");
    if (bars) {
      bars.forEach((bar) => {
        const fill = bar.querySelector(".skill-bar-fill") as HTMLElement;
        const percentText = bar.querySelector(".skill-percent") as HTMLElement;
        if (!fill || !percentText) return;
        const targetLevel = parseInt(fill.getAttribute("data-level") || "0", 10);

        // Animate progress bar fill width
        gsap.to(fill, {
          width: `${targetLevel}%`,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        });

        // Animate percentage counter
        const counterObj = { value: 0 };
        gsap.to(counterObj, {
          value: targetLevel,
          duration: 1.2,
          ease: "power2.out",
          snap: { value: 1 },
          onUpdate: () => {
            percentText.textContent = `${counterObj.value}%`;
          },
          scrollTrigger: {
            trigger: bar,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        });
      });
    }

    // 3D Hover Tilt for Skill Cards
    const cleanupTiltListeners: Array<() => void> = [];
    if (isTouchLayout) {
      return () => {
        cleanupTiltListeners.forEach((cleanup) => cleanup());
      };
    }

    const cards = containerRef.current.querySelectorAll(".skill-card");
    cards.forEach((card) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update spotlight coordinates
        (card as HTMLElement).style.setProperty("--x", `${x}px`);
        (card as HTMLElement).style.setProperty("--y", `${y}px`);

        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = x - xc;
        const dy = y - yc;

        const tiltX = -(dy / yc) * 8;
        const tiltY = (dx / xc) * 8;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          y: -5,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.4,
          overwrite: "auto",
        });
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          ease: "power3.out",
          duration: 0.8,
          overwrite: "auto",
        });
      };

      card.addEventListener("mousemove", onMouseMove as EventListener);
      card.addEventListener("mouseleave", onMouseLeave as EventListener);
      cleanupTiltListeners.push(() => {
        card.removeEventListener("mousemove", onMouseMove as EventListener);
        card.removeEventListener("mouseleave", onMouseLeave as EventListener);
      });
    });

    return () => {
      cleanupTiltListeners.forEach((cleanup) => cleanup());
    };
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="skills-page whatIDO">
      <div className="skills-header">
        <span className="skills-kicker">
          <FaCode aria-hidden="true" />
          Technical Profile
        </span>
        <h2 className="skills-title">Skills & Competencies</h2>
        <div className="mobile-skill-pills" aria-label="Main skills">
          {skillGroups.map((group) => (
            <span key={group.title}>{group.title}</span>
          ))}
        </div>
        <p className="skills-intro">
          A practical mix of cyber security threat management, network structures,
          and production-oriented front-end web and mobile development capabilities.
        </p>
      </div>

      <div className="skills-overview" aria-label="Skills summary">
        <div>
          <strong>4</strong>
          <span>Key Domains</span>
        </div>
        <div>
          <strong>16+</strong>
          <span>Tools & Technologies</span>
        </div>
        <div>
          <strong>Secure</strong>
          <span>Development Approach</span>
        </div>
      </div>

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article className="skill-card" key={group.title}>
            <div className="card-spotlight" />
            <div className="skill-card-media">
              <img
                src={group.image}
                alt={group.title}
                className="skill-card-image"
                loading="lazy"
              />
              <div className="skill-card-image-overlay" />
              <div className="skill-card-media-content">
                <span className="skill-icon">{group.icon}</span>
                <span className="skill-level">{group.level}</span>
              </div>
            </div>

            <div className="skill-card-body">
              <div className="skill-card-heading">
                <span className="skill-focus">{group.focus}</span>
                <h3>{group.title}</h3>
              </div>
              <p className="skill-summary">{group.summary}</p>

              <div className="skill-bars">
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </div>
            </div>

            <div className="skill-tags">
              {group.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhatIDo;
