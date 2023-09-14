import logo from "./logo.svg";
import React, { useState } from "react";
import ms from "milsymbol";
import "./App.css";

function App() {
  const [file, setFile] = useState();
  const [sidcList, setSidcList] = useState("");
  const fileReader = new FileReader();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      fileReader.onload = function(event) {
        setSidcList(event.target.result);
      };
      fileReader.readAsText(file);
    }
  };

  const csvFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div>
      <form>
        <input
          type={"file"}
          id={"sidCSV"}
          accept={".txt"}
          onChange={csvFileChange}
        />
        <button onClick={handleSubmit}>Display</button>
      </form>
      {sidcList !== "" &&
        sidcList
          .split("\n")
          .map((sidc) => (
            <img
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                new ms.Symbol(sidc).asSVG()
              )}`}
            />
          ))}
    </div>
  );
}

export default App;
