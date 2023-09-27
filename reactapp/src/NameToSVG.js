import React, { useState } from "react";
import ms from "milsymbol";

function NameToSVG() {
  const [inputs, setInputs] = useState({});
  const [sidc, setSidc] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://18.189.126.187:8080/st?target_category=${inputs.symbolname}`)
      .then((response) => response.json())
      .then((data) => setSidc(data))
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
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Enter target category:
          <input
            type="text"
            name={"symbolname"}
            value={inputs.symbolname || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      <br />
      {sidc !== "" && sidc}
      <br />
      {sidc !== "" && (
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            new ms.Symbol(sidc).asSVG()
          )}`}
        />
      )}
    </div>
  );
}

export default NameToSVG;
