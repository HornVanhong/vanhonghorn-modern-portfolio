import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// Helper to load .env.local into process.env for local development
function loadEnvLocal() {
  try {
    const filePath = path.resolve(__dirname, ".env.local");
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      content.split("\n").forEach((line) => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || "";
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.slice(1, -1);
          }
          process.env[key] = value;
        }
      });
    }
  } catch (err) {
    console.error("Failed to load .env.local", err);
  }
}

// Load env variables during Vite dev startup
loadEnvLocal();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "api-contact-middleware",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url?.startsWith("/api/contact")) {
            if (req.method === "POST") {
              try {
                let body = "";
                req.on("data", (chunk) => {
                  body += chunk;
                });
                req.on("end", async () => {
                  try {
                    const parsedBody = JSON.parse(body);
                    const mockReq = {
                      method: "POST",
                      body: parsedBody,
                    } as any;

                    let statusCode = 200;
                    const responseHeaders: Record<string, string> = {
                      "Content-Type": "application/json",
                    };

                    const mockRes = {
                      status(code: number) {
                        statusCode = code;
                        return this;
                      },
                      setHeader(name: string, value: string) {
                        responseHeaders[name] = value;
                        return this;
                      },
                      json(data: any) {
                        res.writeHead(statusCode, responseHeaders);
                        res.end(JSON.stringify(data));
                        return this;
                      },
                    } as any;

                    // Load api/contact.ts using Vite SSR loader
                    const contactModule = await server.ssrLoadModule("./api/contact.ts");
                    await contactModule.default(mockReq, mockRes);
                  } catch (err: any) {
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: err.message }));
                  }
                });
              } catch (err: any) {
                res.writeHead(500, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: err.message }));
              }
            } else {
              res.writeHead(405, { "Content-Type": "application/json" });
              res.end(JSON.stringify({ error: "Method not allowed" }));
            }
          } else {
            next();
          }
        });
      },
    },
  ],
});
