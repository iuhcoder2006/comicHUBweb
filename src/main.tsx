import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

window.addEventListener("error", (e) => {
  document.body.innerHTML =
    `<div style="color:red;padding:20px;font-family:monospace;white-space:pre-wrap">
      <h2>GLOBAL ERROR</h2>
      <p>${e.message}</p>
      <p>${e.error?.stack || "(no stack)"}</p>
    </div>`;
});

window.addEventListener("unhandledrejection", (e) => {
  document.body.innerHTML =
    `<div style="color:red;padding:20px;font-family:monospace;white-space:pre-wrap">
      <h2>UNHANDLED PROMISE REJECTION</h2>
      <p>${e.reason?.message || e.reason}</p>
      <p>${e.reason?.stack || "(no stack)"}</p>
    </div>`;
});

const root = document.getElementById("root");
if (!root) {
  document.body.innerHTML = '<div style="color:red;padding:20px">ERROR: #root not found</div>';
} else {
  try {
    createRoot(root, {
      onUncaughtError(e) {
        root.innerHTML =
          `<div style="color:red;padding:20px;font-family:monospace;white-space:pre-wrap">
            <h2>REACT UNCAUGHT ERROR</h2>
            <p>${e.message}</p>
          </div>`;
      },
      onRecoverableError(e) {
        root.innerHTML =
          `<div style="color:red;padding:20px;font-family:monospace;white-space:pre-wrap">
            <h2>REACT RECOVERABLE ERROR</h2>
            <p>${e.message}</p>
          </div>`;
      },
    }).render(<App />);
  } catch (e) {
    root.innerHTML = `<div style="color:red;padding:20px">SYNC ERROR: ${e}</div>`;
  }
}
