import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

if (typeof window !== "undefined") {
  window.addEventListener("error", (e) => {
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "0";
    div.style.left = "0";
    div.style.width = "100vw";
    div.style.background = "red";
    div.style.color = "white";
    div.style.zIndex = "999999";
    div.style.padding = "10px";
    div.style.fontSize = "12px";
    div.style.wordBreak = "break-all";
    div.innerText = "Error: " + e.message + " at " + e.filename + ":" + e.lineno;
    document.body.appendChild(div);
  });
  window.addEventListener("unhandledrejection", (e) => {
    const div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = "50px";
    div.style.left = "0";
    div.style.width = "100vw";
    div.style.background = "orange";
    div.style.color = "white";
    div.style.zIndex = "999999";
    div.style.padding = "10px";
    div.style.fontSize = "12px";
    div.style.wordBreak = "break-all";
    div.innerText = "Unhandled Rejection: " + e.reason;
    document.body.appendChild(div);
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
