import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/providers/userContext.jsx";
import { RoutesMain } from "./components/routesMain.jsx";
import { ContactProvider } from "./components/providers/contactContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ContactProvider>
          <RoutesMain />
        </ContactProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
