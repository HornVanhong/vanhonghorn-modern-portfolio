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
      let telegramSuccess = false;
      let emailSuccess = false;
      let errorMessage = "";

      // 1. Send to Telegram Chatbot
      try {
        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

        if (botToken && chatId) {
          const telegramText = `📩 New Portfolio Message:\n\n👤 Name: ${name}\n📧 Email: ${email}\n\n💬 Message:\n${message}`;

          const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: telegramText,
            }),
          });
          if (tgRes.ok) {
            telegramSuccess = true;
          } else {
            console.error("Telegram API returned non-ok status:", tgRes.status);
          }
        } else {
          console.warn("Telegram bot token or chat ID is missing in environment variables.");
        }
      } catch (tgErr) {
        console.error("Failed to send Telegram notification:", tgErr);
      }

      // 2. Send to Email via FormSubmit
      try {
        const payload = new FormData();
        payload.append("name", name);
        payload.append("email", email);
        payload.append("message", message);
        payload.append("_subject", `Portfolio message from ${name}`);
        payload.append("_template", "table");
        payload.append("_captcha", "false");

        const res = await fetch("https://formsubmit.co/ajax/vanhonghorn37@gmail.com", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: payload,
        });

        const data = await res.json().catch(() => null);
        if (res.ok && data?.success !== false) {
          emailSuccess = true;
        } else {
          errorMessage = data?.message ?? "Email service error.";
        }
      } catch (emailErr) {
        console.error("Failed to send Email notification:", emailErr);
        errorMessage = emailErr instanceof Error ? emailErr.message : "Email network error.";
      }

      if (telegramSuccess || emailSuccess) {
        setSubmitStatus("success");
        if (telegramSuccess && emailSuccess) {
          setStatusMessage("Message sent successfully via Telegram and email!");
        } else if (telegramSuccess) {
          setStatusMessage("Message sent successfully via Telegram (email delivery failed).");
        } else {
          setStatusMessage("Message sent successfully via email (Telegram notification failed).");
        }
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(errorMessage || "Message could not be sent. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "Message could not be sent. Please try Telegram or email."
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
