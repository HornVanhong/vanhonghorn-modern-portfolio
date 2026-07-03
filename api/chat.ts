import type { VercelRequest, VercelResponse } from "@vercel/node";

const FALLBACK_PROFILE_REPLY = `Hello! I am Vanhong's AI Assistant. The live AI service is temporarily unavailable, but I can still help with Vanhong's profile.

Vanhong is a Cyber Security student and Web/Mobile Developer based in Phnom Penh, Cambodia.

Key details:
- Studies: Computer Science at RUPP, specializing in Cyber Security
- Experience: Digital Banking Front-end Developer intern at RHB Bank Cambodia
- Skills: React, React Native, TypeScript, Flutter, Java, Spring Boot, Linux, networking, vulnerability assessment, and database audits
- Training: ANT Technology Training Center and Korea Software HRD Center
- Contact: Telegram @vanhongVH, email vanhonghorn37@gmail.com, GitHub HornVanhong`;

function fallbackTextFor(messages: Array<{ role?: string; content?: string }>) {
  const latestUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user" && typeof message.content === "string")
    ?.content?.toLowerCase() ?? "";

  if (latestUserMessage.includes("contact") || latestUserMessage.includes("email") || latestUserMessage.includes("telegram") || latestUserMessage.includes("linkedin")) {
    return "You can contact Vanhong by Telegram at @vanhongVH, email at vanhonghorn37@gmail.com, GitHub at HornVanhong, or LinkedIn at Horn Vanhong.";
  }

  if (latestUserMessage.includes("rhb") || latestUserMessage.includes("intern")) {
    return "Vanhong interned in Digital Banking at RHB Bank Cambodia from Dec 2023 to Dec 2024. He worked on mobile banking frontend components with React Native, TypeScript, SASS, and styled-components, resolved frontend tickets, collaborated with UX/UI teams, and used Git, Bitbucket, Jira, and Agile Scrum workflows.";
  }

  if (latestUserMessage.includes("skill") || latestUserMessage.includes("cyber") || latestUserMessage.includes("security")) {
    return "Vanhong's core skills include cybersecurity fundamentals, network security, vulnerability assessment, Linux security configuration, database audits, React, React Native, TypeScript, Flutter, Java, and Spring Boot.";
  }

  if (latestUserMessage.includes("study") || latestUserMessage.includes("education") || latestUserMessage.includes("kshrd") || latestUserMessage.includes("rupp")) {
    return "Vanhong studies Computer Science at the Royal University of Phnom Penh and specializes in Cyber Security. He also completed Korea Software HRD Center training focused on Java, Spring Boot, React Native, and Agile workflows, and he is studying cybersecurity at ANT Technology Training Center.";
  }

  return FALLBACK_PROFILE_REPLY;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format." });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      ok: true,
      fallback: true,
      text: fallbackTextFor(messages)
    });
  }

  // Format messages into Gemini format
  const geminiContents = messages.map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));

  const systemInstruction = `You are the personal AI Assistant for Horn Vanhong (헌 완홓), a passionate Cyber Security student and Web/Mobile Developer based in Phnom Penh, Cambodia. Your goal is to represent Vanhong professionally, answer questions about him, his background, his projects, and invite people to connect with him. Keep your responses friendly, concise, and helpful. Always speak in first-person (e.g., "Vanhong has internship experience at..." or "He is graduating from...").

Here are Vanhong's details:

1. **Identity & Core Info**:
   - **Name**: Horn Vanhong (korean_name: 헌 완홓)
   - **Role**: Cybersecurity & Web/Mobile Developer Candidate
   - **Status**: Open for internships, junior roles, and collaboration.
   - **Location**: Phnom Penh, Cambodia
   - **Interests**: Cyber Security, Web Development, Mobile Dev (React Native, Flutter), Networking, Linux Administration, Database Audits.

2. **Education**:
   - **Royal University of Phnom Penh (RUPP)**: Bachelor of Computer Science (2022 - 2025). Graduating in 2025. MPTC Scholarship student (Ministry of Posts and Telecommunications). Specializing in Cyber Security.
   - **Korea Software HRD Center (KSHRD)**: Completed the 14th Generation IT Training Program in 2026. Intensive training in Java, Spring Boot, React Native, and Agile workflows.
   - **ANT Technology Training Center**: Currently enrolled in a specialized Cyber Security Program. Deep-diving into network security, vulnerability assessment, Linux security configuration, and database audits.
   - **Other Courses**: Flutter 3 Course (Instinct Institute Alumni, 2022-2023), Cisco Networking Academy fundamentals course.

3. **Experience**:
   - **RHB Bank Cambodia** (Intern - Digital Banking, Dec 2023 - Dec 2024):
     - Developed mobile banking frontend components using React Native, TypeScript, SASS, and styled-components.
     - Resolved frontend tickets, improved app stability, and collaborated with UX/UI teams.
     - Used version control (Git, Bitbucket) and project management tool Jira. Participated in Agile Scrum ceremonies.

4. **Contact Details**:
   - **Telegram**: [@vanhongVH](https://t.me/vanhongVH)
   - **Email**: vanhonghorn37@gmail.com
   - **GitHub**: [HornVanhong](https://github.com/HornVanhong)
   - **LinkedIn**: [Horn Vanhong](https://www.linkedin.com/in/horn-vanhong-45366324a/)`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: geminiContents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          }
        })
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.error?.message || `Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (typeof replyText !== "string" || !replyText.trim()) {
      return res.status(200).json({
        success: true,
        fallback: true,
        text: fallbackTextFor(messages)
      });
    }

    return res.status(200).json({
      success: true,
      text: replyText
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(200).json({
      success: true,
      fallback: true,
      text: fallbackTextFor(messages)
    });
  }
}
