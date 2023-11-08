import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./Layout";
import FileLoader from "./FileLoader";
import Selections from "./Selections";
import Landing from "./Landing";
import reportWebVitals from "./reportWebVitals";

export default function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/layout" element={<Layout />}>
                  <Route index element={<FileLoader />} />
                  <Route path="fileloaderproprietary" element={<FileLoader proprietary={true} />}/>
                  <Route path="selectionsthirdparty" element={<Selections />} />
                  <Route path="selectionsproprietary" element={<Selections proprietary={true} />}/>
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
