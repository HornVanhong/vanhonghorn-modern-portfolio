import "./styles/Career.css";

const careerItems = [
  {
    type: "Training",
    logo: "/images/logo/KSHRD.png",
    role: "IT Specialization Program",
    company: "Korea Software HRD Center (KSHRD)",
    year: "2026",
    desc: "Intensive 14th Generation training in Java, Spring Boot web development, and React Native mobile frameworks with group project design and agile workflows."
  },
  {
    type: "Cybersecurity",
    logo: "/images/logo/ANT.png",
    role: "Cyber Security Program",
    company: "ANT Technology Training Center",
    year: "2022 - Present",
    desc: "Deep dive into network security architecture, vulnerability assessment, Linux configurations, database audits, and secure shell scripting security logs."
  },
  {
    type: "Degree",
    logo: "/images/logo/Rupp_logo.png",
    role: "Bachelor of Computer Science",
    company: "Royal University of Phnom Penh (RUPP)",
    year: "2022 - 2025",
    desc: "Ministry of Posts and Telecommunications (MPTC) scholarship student, specializing in Cyber Security threat management, network architecture, and defensive labs."
  },
  {
    type: "Experience",
    logo: "/images/logo/RHB.webp",
    role: "Intern - Digital Banking",
    company: "RHB Bank Cambodia",
    year: "2023 - 2024",
    desc: "Leveraged React Native to build and deploy mobile banking capabilities. Addressed critical frontend issues, collaborated on Jira/Git, and styled screens with styled-components."
  },
  {
    type: "Training",
    role: "Flutter & Cisco Training",
    company: "Instinct Institute & Cisco Academy",
    year: "2022 - 2023",
    desc: "Completed Instinct Institute Flutter 3 course for mobile UI/API work, and Cisco Networking Academy fundamentals course."
  },
  {
    type: "Experience",
    logo: "/images/logo/DDD.png",
    role: "Data Labeler",
    company: "DDD (Digital Data Divide)",
    year: "2022 - 2023",
    desc: "Performed key tagging, classification, and data annotation for machine learning pipelines, ensuring high-quality training datasets for AI workloads."
  },
  {
    type: "Education",
    role: "High School",
    company: "General Education",
    year: "2020 - 2021",
    desc: "Completed high school with general science major before beginning university study."
  }
];

const Career = () => {
  return (
    <div className="career-section section-container" id="education">
      <div className="career-container">
        <h2>
          Education <span>&</span>
          <br /> Experience
        </h2>
        <p className="career-summary">
          A focused path through cybersecurity, software engineering training,
          and hands-on digital banking work.
        </p>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careerItems.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <div className="career-heading">
                    {item.logo && (
                      <span className="career-logo">
                        <img src={item.logo} alt={`${item.company} logo`} loading="lazy" />
                      </span>
                    )}
                    <div className="career-heading-text">
                      <span className="career-type">{item.type}</span>
                      <h4>{item.role}</h4>
                      <h5>{item.company}</h5>
                    </div>
                  </div>
                </div>
                <h3>{item.year}</h3>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
