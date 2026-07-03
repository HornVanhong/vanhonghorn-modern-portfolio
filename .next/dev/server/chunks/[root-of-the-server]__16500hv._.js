module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Downloads/Portfolio-Website-main/src/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Portfolio$2d$Website$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/Portfolio-Website-main/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(req) {
    try {
        const { messages } = await req.json();
        if (!Array.isArray(messages)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Portfolio$2d$Website$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Invalid messages format."
            }, {
                status: 400
            });
        }
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Portfolio$2d$Website$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                fallback: true,
                text: "Hello! I am Vanhong's AI Assistant. Currently, the `GEMINI_API_KEY` is not set in the environment variables. Please add it to your environment to enable my full intelligence!\n\nHere is a quick summary of Vanhong's profile:\n- **Studies**: CS Student at RUPP (Graduating 2025)\n- **Specialization**: Cyber Security & Web/Mobile Development\n- **Internship**: Front-end Developer at RHB Bank Cambodia (2023 - 2024)\n- **Training**: ANT Training Center (Cyber Security) & Korea Software HRD Center (2026)\n- **Contact**: Telegram [@vanhongVH](https://t.me/vanhongVH) or Email `vanhonghorn37@gmail.com`."
            });
        }
        // Format messages into Gemini format
        const geminiContents = messages.map((m)=>({
                role: m.role === "assistant" ? "model" : "user",
                parts: [
                    {
                        text: m.content
                    }
                ]
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
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: geminiContents,
                systemInstruction: {
                    parts: [
                        {
                            text: systemInstruction
                        }
                    ]
                }
            })
        });
        if (!response.ok) {
            const errData = await response.json().catch(()=>null);
            throw new Error(errData?.error?.message || `Gemini API returned status ${response.status}`);
        }
        const data = await response.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that response.";
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Portfolio$2d$Website$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            text: replyText
        });
    } catch (error) {
        console.error("Gemini API error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$Portfolio$2d$Website$2d$main$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : "Failed to generate AI response."
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__16500hv._.js.map