import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

console.log('main.tsx loaded');

const rootElement = document.getElementById("root");
console.log('Root element:', rootElement);

if (!rootElement) {
  throw new Error('Root element not found');
}

try {
  const root = createRoot(rootElement);
  console.log('React root created');
  
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
  console.log('App rendered');
} catch (error) {
  console.error('Render error:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: red;"><h1>Render Error</h1><pre>${error}</pre></div>`;
}
