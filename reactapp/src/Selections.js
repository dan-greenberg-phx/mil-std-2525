import React, { useState } from "react";
import ms from "milsymbol";

function Selections() {
  const [inputs, setInputs] = useState({
    selectionone: "landunit",
    selectiontwo: "unspecified",
  });
  const [sidc, setSidc] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      inputs.selectionone === "landunit" &&
      inputs.selectiontwo === "unspecified"
    ) {
      setSidc("30031000000000000000");
    }
    if (
      inputs.selectionone === "landunit" &&
      inputs.selectiontwo === "commandandcontrol"
    ) {
      setSidc("30031000001100000000");
    }
    if (
      inputs.selectionone === "minewarfare" &&
      inputs.selectiontwo === "unspecified"
    ) {
      setSidc("30033600000000000000");
    }
    if (
      inputs.selectionone === "minewarfare" &&
      inputs.selectiontwo === "kingfisher"
    ) {
      setSidc("30033600001106000000");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    if (name === "selectionone")
      setInputs((values) => ({ ...values, selectiontwo: "unspecified" }));
  };

  return (
    <div>
      <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="selectionone">Choose first option:</label>
        <select name="selectionone" id="selectionone" onChange={handleChange}>
          <option value="landunit">Land Unit</option>
          <option value="minewarfare">Mine Warfare</option>
        </select>
        <br />
        <label htmlFor="selectiontwo">Choose second option:</label>
        <select name="selectiontwo" id="selectiontwo" onChange={handleChange}>
          <option value="unspecified">Unspecified</option>
          {inputs.selectionone === "landunit" && (
            <option value="commandandcontrol">Command and Control</option>
          )}
          {inputs.selectionone === "minewarfare" && (
            <option value="kingfisher">Kingfisher</option>
          )}
        </select>
        <br />
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

export default Selections;
