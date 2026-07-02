import "./styles/Career.css";

const careerItems = [
  {
    role: "IT Specialization Program",
    company: "Korea Software HRD Center (KSHRD)",
    year: "2026",
    desc: "Intensive 14th Generation training in Java, Spring Boot web development, and React Native mobile frameworks with group project design and agile workflows."
  },
  {
    role: "Cyber Security Program",
    company: "ANT Technology Training Center",
    year: "2022 - Present",
    desc: "Deep dive into network security architecture, vulnerability assessment, Linux configurations, database audits, and secure shell scripting security logs."
  },
  {
    role: "Bachelor of Computer Science",
    company: "Royal University of Phnom Penh (RUPP)",
    year: "2022 - 2025",
    desc: "Ministry of Posts and Telecommunications (MPTC) scholarship student, specializing in Cyber Security threat management, network architecture, and defensive labs."
  },
  {
    role: "Intern - Digital Banking",
    company: "RHB Bank Cambodia",
    year: "2023 - 2024",
    desc: "Leveraged React Native to build and deploy mobile banking capabilities. Addressed critical frontend issues, collaborated on Jira/Git, and styled screens with styled-components."
  },
  {
    role: "Flutter & Cisco Training",
    company: "Instinct Institute & Cisco Academy",
    year: "2022 - 2023",
    desc: "Completed Instinct Institute Flutter 3 course for mobile UI/API work, and Cisco Networking Academy fundamentals course."
  },
  {
    role: "Data Labeler",
    company: "DDD (Digital Data Divide)",
    year: "2022 - 2023",
    desc: "Performed key tagging, classification, and data annotation for machine learning pipelines, ensuring high-quality training datasets for AI workloads."
  },
  {
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
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {careerItems.map((item, index) => (
            <div className="career-info-box" key={index}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{item.role}</h4>
                  <h5>{item.company}</h5>
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
