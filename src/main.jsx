import { createRoot } from "react-dom/client";
import "./style/index.scss";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./rtk/store";
// import { SupabaseProvider } from "./hooks/useSupabaseAuth.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* <SupabaseProvider> */}
      <Provider store={store}>
        <App />
      </Provider>
    {/* </SupabaseProvider> */}
  </BrowserRouter>
);
