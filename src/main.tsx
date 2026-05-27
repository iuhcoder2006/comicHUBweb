import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = document.getElementById("root");
if (!root) {
  document.body.innerHTML = '<div style="color:red;padding:20px">ERROR: #root not found</div>';
} else {
  try {
    createRoot(root).render(<App />);
  } catch (e) {
    root.innerHTML = `<div style="color:red;padding:20px">ERROR: ${e}</div>`;
  }
}
