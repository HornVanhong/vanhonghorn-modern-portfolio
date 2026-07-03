import { FaAward, FaDownload, FaEye, FaFilePdf } from "react-icons/fa";
// import "./styles/Certificates.css";

const certificateFiles = [
  {
    name: "cyber.pdf",
    title: "Cyber Security Specialist Certificate",
    issuer: "ANT Technology Training Center",
    category: "Certificate",
    type: "PDF",
  },
  {
    name: "HRD/Coding1.jpeg",
    title: "HRD Coding Challenge Certificate (Phase 1)",
    issuer: "Korea Software HRD Center",
    category: "Certificate",
    type: "JPEG",
  },
  {
    name: "HRD/Coding2.jpg",
    title: "HRD Coding Challenge Certificate (Phase 2)",
    issuer: "Korea Software HRD Center",
    category: "Certificate",
    type: "JPG",
  },
  {
    name: "FullCertificate.pdf",
    title: "Cyber Security Training Certificate",
    issuer: "ANT Technology Training Center",
    category: "Certificate",
    type: "PDF",
  },
];

const Certificates = () => {
  return (
    <div className="certificates-section section-container" id="certificates">
      <h2>
        My <span>Certificates</span>
      </h2>
      <div className="certificates-grid">
        {certificateFiles.map((cert) => {
          const fileUrl = `/certificate/${cert.name}`;
          const isPdf = cert.type === "PDF";

          return (
            <div className="certificate-card" key={cert.name}>
              {isPdf ? (
                <div className="certificate-preview">
                  <span className="certificate-preview-topline" />
                  <span className="certificate-preview-seal">
                    <FaAward aria-hidden="true" />
                  </span>
                  <span className="certificate-preview-label">
                    Certificate of Completion
                  </span>
                  <span className="certificate-preview-title">
                    {cert.title}
                  </span>
                  <span className="certificate-preview-lines" />
                  <span className="certificate-preview-file">
                    <FaFilePdf aria-hidden="true" /> PDF
                  </span>
                </div>
              ) : (
                <div className="certificate-preview image-preview-mode">
                  <img
                    src={fileUrl}
                    alt={cert.title}
                    className="certificate-card-img"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="certificate-info">
                <div className="certificate-meta-row">
                  <span>{cert.category}</span>
                  <span>{cert.issuer}</span>
                </div>
                <h4>{cert.title}</h4>
                <p className="certificate-filename">{cert.name}</p>
                <div className="certificate-actions">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-view-btn"
                    data-cursor="disable"
                  >
                    <FaEye aria-hidden="true" /> View
                  </a>
                  <a
                    href={fileUrl}
                    download
                    className="cert-download-btn"
                    data-cursor="disable"
                  >
                    <FaDownload aria-hidden="true" /> Download
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Certificates;
