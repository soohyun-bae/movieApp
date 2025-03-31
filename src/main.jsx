import { createRoot } from "react-dom/client";
import "./style/index.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./rtk/store";
import { SupabaseProvider } from "./hooks/useSupabaseAuth.jsx";
import { UserProvider } from "./hooks/useUser.jsx";

createRoot(document.getElementById("root")).render(
  <SupabaseProvider>
    <UserProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </UserProvider>
  </SupabaseProvider>
);
