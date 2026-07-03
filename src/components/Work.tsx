// import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import eduTraceDashboard from "../assets/Edtrace1.png";
import restaurantPreview from "../assets/Resturant.png";
import smartNasPreview from "../assets/Smart_nas.png";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  title: string;
  category: string;
  tools: string;
  image: string;
  pdfUrl?: string;
  repoUrl?: string;
  liveUrl?: string;
  videoUrl?: string;
}

const projects: ProjectItem[] = [
  {
    title: "Modern Cyber Portfolio",
    category: "GitHub Project / Live Website",
    tools: "TypeScript, React, Three.js, GSAP, responsive UI, Vercel deployment",
    image: "/web_development_banner.png",
    repoUrl: "https://github.com/HornVanhong/vanhonghorn-modern-portfolio",
    liveUrl: "https://vanhonghorn-modern-portfolio-5fp2-blush.vercel.app",
    videoUrl: "https://www.youtube.com/watch?v=HqxXHrZLIUU"
  },
  {
    title: "Portfolio Spider Edition",
    category: "GitHub Project / Interactive Website",
    tools: "TypeScript, React, animated portfolio interface, Vercel deployment",
    image: "/web_development_banner.png",
    repoUrl: "https://github.com/HornVanhong/vanhonghorn-portfolio_spider",
    liveUrl: "https://vanhonghorn-portfolio-spider.vercel.app"
  },
  {
    title: "Digital Clock",
    category: "GitHub Project / Web App",
    tools: "HTML, CSS, JavaScript, real-time clock UI, responsive browser app",
    image: "/web_development_banner.png",
    repoUrl: "https://github.com/HornVanhong/Digital_Clock",
    liveUrl: "https://digital-clock-green-omega.vercel.app"
  },
  {
    title: "Restaurant Website - Jong Nham",
    category: "GitHub Project / Website",
    tools: "HTML, CSS, restaurant landing page, responsive layout, Vercel deployment",
    image: restaurantPreview.src,
    repoUrl: "https://github.com/HornVanhong/JongNham_Resturant",
    liveUrl: "https://jong-nham-resturant.vercel.app"
  },
  {
    title: "EduTrace",
    category: "Education Project / Student Tracking",
    tools: "Student records, education workflow, dashboard UI, tracking and management features",
    image: eduTraceDashboard.src
  },
  {
    title: "Smart App - NAS",
    category: "GitHub Project / Smart Mobile Service",
    tools: "JavaScript, Khmer interface, Smart service dashboard, account and package UI",
    image: smartNasPreview.src,
    repoUrl: "https://github.com/HornVanhong/Smart_App"
  },
  {
    title: "Smart Game",
    category: "GitHub Project / Browser Game",
    tools: "HTML, CSS, JavaScript, browser game logic, interactive UI",
    image: "/web_development_banner.png",
    repoUrl: "https://github.com/HornVanhong/smart_game"
  },
  {
    title: "Shodan Cybersecurity Tutorial",
    category: "YouTube Project / Security Education",
    tools: "Shodan, IoT discovery, ethical security awareness, network exposure research",
    image: "https://i4.ytimg.com/vi/Og_m5JMrWJ4/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=Og_m5JMrWJ4"
  },
  {
    title: "SSH Remote Server Control",
    category: "YouTube Project / System Administration",
    tools: "SSH, MobaXterm, secure remote server access, beginner IT tutorial",
    image: "https://i2.ytimg.com/vi/eF-cuR_3zd0/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=eF-cuR_3zd0"
  },
  {
    title: "Flutter API Course Project",
    category: "YouTube Project / Mobile Development",
    tools: "Flutter, API data fetching, mobile UI, beginner app development workflow",
    image: "https://i3.ytimg.com/vi/v6OdtS2WLEQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=v6OdtS2WLEQ"
  },
  {
    title: "Digital Banking Features",
    category: "Mobile Application",
    tools: "React Native, TypeScript, SASS, styled-components, Git, Jira",
    image: "/web_development_banner.png"
  },
  {
    title: "Flutter Course Projects",
    category: "Mobile UI & APIs",
    tools: "Flutter, Dart, Local Storage, REST APIs, Cellcard UI Clone",
    image: "/app_development_banner.png"
  },
  {
    title: "Cisco Networking Labs",
    category: "Network Administration",
    tools: "Cisco Packet Tracer, Network config, Protocols, Troubleshooting",
    image: "/networking_admin_banner.png"
  },
  {
    title: "Cyberium - Net Crafts",
    category: "Network Security Simulation",
    tools: "Shodan, WHOIS, ARP, DNS, DHCP, Wireshark traffic analysis",
    image: "/cyber_security_banner.png"
  },
  {
    title: "Cyberium - Linux Fundamentals",
    category: "System Administration",
    tools: "Linux, Bash Scripting, System Info & Monitoring, Process Audits",
    image: "/networking_admin_banner.png"
  },
  {
    title: "Cyberium - Python Logs",
    category: "Security Automation",
    tools: "Python, Linux Log Analysis (/var/log/auth.log), Failed sudo Alerts",
    image: "/cyber_security_banner.png"
  },
  {
    title: "Cisco Network Lab - xe101",
    category: "PDF Deliverable",
    tools: "Detailed network topology design and IP address assignment table.",
    image: "/networking_admin_banner.png",
    pdfUrl: "/Project/TCI-2510-CAMBODIA-II.s6.xe101.pdf"
  },
  {
    title: "Cisco Network Lab - xe103",
    category: "PDF Deliverable",
    tools: "Cisco Packet Tracer lab files setup, routing protocols, and switches configurations.",
    image: "/networking_admin_banner.png",
    pdfUrl: "/Project/TCI-2510-CAMBODIA-II.s6.xe103.pdf"
  },
  {
    title: "Cisco Network Lab - xe105",
    category: "PDF Deliverable",
    tools: "Detailed verification labs, network pings, routing table outputs.",
    image: "/networking_admin_banner.png",
    pdfUrl: "/Project/TCI-2510-CAMBODIA-II.s6.xe105.pdf"
  }
];

const Work = () => {
  useGSAP(() => {
    let timeline: gsap.core.Timeline;

    const initTrigger = () => {
      if (window.innerWidth <= 1024) return;

      const getTranslateX = () => {
        const box = document.getElementsByClassName("work-box");
        if (box.length === 0) return 0;
        const rectLeft = document
          .querySelector(".work-container")!
          .getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
        const padding: number =
          parseInt(window.getComputedStyle(box[0]).padding) / 2;
        return rect.width * box.length - (rectLeft + parentWidth) + padding;
      };

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: true,
          pin: true,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      timeline.to(".work-flex", {
        x: () => -getTranslateX(),
        ease: "none",
      });
    };

    // Defer initialization by 100ms to ensure ScrollSmoother is created first
    const timer = setTimeout(() => {
      initTrigger();
      ScrollTrigger.refresh();
    }, 100);

    // Clean up
    return () => {
      clearTimeout(timer);
      if (timeline) {
        timeline.kill();
      }
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                {(project.liveUrl || project.repoUrl || project.videoUrl || project.pdfUrl) && (
                  <div className="work-pdf-actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="work-pdf-btn open"
                        data-cursor="disable"
                      >
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="work-pdf-btn download"
                        data-cursor="disable"
                      >
                        GitHub
                      </a>
                    )}
                    {project.videoUrl && (
                      <a
                        href={project.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="work-pdf-btn download"
                        data-cursor="disable"
                      >
                        YouTube
                      </a>
                    )}
                    {project.pdfUrl && (
                      <>
                    <a
                      href={project.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="work-pdf-btn open"
                      data-cursor="disable"
                    >
                      Open
                    </a>
                    <a
                      href={project.pdfUrl}
                      download
                      className="work-pdf-btn download"
                      data-cursor="disable"
                    >
                      Download
                    </a>
                      </>
                    )}
                  </div>
                )}
              </div>
              <WorkImage
                image={project.image}
                alt={project.title}
                link={project.liveUrl || project.videoUrl || project.repoUrl || project.pdfUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
