import type { Metadata, Viewport } from "next";

// Global style imports
import "../index.css";
import "../App.css";

// Component-specific style imports
import "../components/styles/style.css";
import "../components/styles/About.css";
import "../components/styles/Career.css";
import "../components/styles/Certificates.css";
import "../components/styles/ChatBot.css";
import "../components/styles/Contact.css";
import "../components/styles/Cursor.css";
import "../components/styles/Landing.css";
import "../components/styles/Loading.css";
import "../components/styles/Navbar.css";
import "../components/styles/SocialIcons.css";
import "../components/styles/WhatIDo.css";
import "../components/styles/Work.css";

export const metadata: Metadata = {
  title: "Vanhong Horn - Security & Developer Portfolio",
  description: "Specializing in Cyber Security, Network Configurations, and modern Front-End Web/Mobile engineering. Korea Software HRD Center 14th Gen student & MPTC Scholar.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
