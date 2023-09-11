import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState({});
  const [img, setImg] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://18.189.126.187:8080/st?sidc=${inputs.sidc}`)
      .then((response) => response.json())
      .then((data) => setImg(data))
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter SIDC:
          <input
            type="text"
            name="sidc"
            value={inputs.sidc || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      {img !== "" && (
        <img src={`data:image/svg+xml;utf8,${encodeURIComponent(img)}`} />
      )}
    </div>
  );
}

export default App;
