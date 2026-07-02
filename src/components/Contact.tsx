import { useState } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (submitting) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setSubmitStatus("error");
      setStatusMessage("Please fill in your name, email, and message.");
      return;
    }

    setSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Message could not be sent.");
      }

      setSubmitStatus("success");
      setStatusMessage("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Message could not be sent. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-left-col">
            <div className="contact-box">
              <h4>Email</h4>
              <p>
                <a href="mailto:vanhonghorn37@gmail.com" data-cursor="disable">
                  vanhonghorn37@gmail.com
                </a>
              </p>
              <h4>Phone</h4>
              <p>
                <a href="tel:+85586378933" data-cursor="disable">
                  +855 86-378-933
                </a>
              </p>
            </div>
            <div className="contact-box">
              <h4>Social</h4>
              <a
                href="https://github.com/HornVanhong"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Github <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/horn-vanhong-45366324a/"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Linkedin <MdArrowOutward />
              </a>
              <a
                href="https://t.me/vanhongVH"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Telegram <MdArrowOutward />
              </a>
              <a
                href="https://www.instagram.com/hornvanhong"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Instagram <MdArrowOutward />
              </a>
            </div>
            <div className="contact-box contact-attribution">
              <h2>
                Designed and Developed <br /> by <span>Vanhong Horn</span>
              </h2>
              <h5>
                <MdCopyright /> 2026
              </h5>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-head">
              <h4>Send a message</h4>
              <p>
                Leave your details and your message will be sent directly to my inbox.
              </p>
            </div>

            <div className="contact-field-grid">
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              Message
              <textarea
                name="message"
                placeholder="Write your message..."
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </button>

            {submitStatus !== "idle" && (
              <div className={`contact-status-banner ${submitStatus}`} role="alert">
                <span className="banner-icon">{submitStatus === "success" ? "✓" : "⚠"}</span>
                <span className="banner-text">{statusMessage}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
