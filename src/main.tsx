import "./agGridSetup";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./styles/global.css";

import { AppProviders } from "./app/providers";
import App from "./app/App";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: { url: "/mockServiceWorker.js" }, // make sure this matches your public folder
    });
    console.log("Mocking enabled", worker);
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>
  );
});

// import "./agGridSetup";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";

// import { AppProviders } from "./app/providers/index.tsx";
// import "./styles/global.css";
// import App from "./app/App.tsx";

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <AppProviders>
//       <App />
//     </AppProviders>
//   </StrictMode>
// );
