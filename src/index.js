import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { Provider } from "react-redux";
import store from "./redux/store";
import * as Sentry from "@sentry/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

Sentry.init({
  dsn: "https://24ce27f925071b67c0627ccc6cd01100@o4507763161956352.ingest.us.sentry.io/4507763168903168",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.browserProfilingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^http:\/\/localhost:5000\/api/],
  profilesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <SnackbarProvider
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        action={(snackbarId) => (
          <button onClick={() => closeSnackbar(snackbarId)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      >
        <App />
      </SnackbarProvider>
    </GoogleOAuthProvider>
  </Provider>
);
reportWebVitals();
