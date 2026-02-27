import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(<App />);
