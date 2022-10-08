import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

// redux
import { store } from "./store";
import { Provider } from "react-redux";

// firebase
// import { initializeApp } from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import { FirebaseAppProvider } from "reactfire";
// import firebaseConfig from "./firebase/firebaseConfig";

// initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <FirebaseAppProvider firebaseConfig={firebaseConfig}> */}
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    {/* </FirebaseAppProvider> */}
  </React.StrictMode>
);
