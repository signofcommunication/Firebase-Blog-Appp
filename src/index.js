import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FirebaseProvider } from "./utilities/FirebaseProvider";
import "antd/dist/antd.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FirebaseProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseProvider>
);
