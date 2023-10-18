import React, { useState } from "react";
import { ms2525d, ms2525c, ms2525b } from "mil-std-2525";
import { app6d } from "stanag-app6";
import ImageGallery from "./ImageGallery";

function NameToSVG() {
  const [inputs, setInputs] = useState({});
  const [sidcList, setSidcList] = useState([]);
  const [selectedImages, setSelectedImages] = useState();
  var milstd = ms2525d;

  const handleSubmit = (event) => {
    event.preventDefault();
    var found = [];
    var txt = inputs.searchtext.toUpperCase();
    for (var symset in milstd) {
      var entity = milstd[symset];
      var entityIcon = entity["mainIcon"];
      for (var iconCode in entityIcon) {
        var icon = entityIcon[iconCode];
        if (
          entity.name.toUpperCase().indexOf(txt) !== -1 ||
          icon["Entity"].toUpperCase().indexOf(txt) !== -1 ||
          icon["Entity Subtype"].toUpperCase().indexOf(txt) !== -1 ||
          icon["Entity Type"].toUpperCase().indexOf(txt) !== -1
        ) {
          found.push(
            "3003" + entity.symbolset + "0000" + icon["Code"] + "0000"
          );
        }
      }
    }

    if (found.length > 0) {
      setSidcList(found);
    } else {
      setSidcList([]);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const addToCache = (event) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchstring: inputs.searchtext.toUpperCase(),
        sidclist: selectedImages.map((image) => image.caption),
      }),
    };
    fetch("http://18.119.115.197:8080/st", requestOptions)
      .then((response) => response.json())
      .then((data) => console.info(data))
      .catch((err) => console.log(err.message));
  };

  return (
    <div style={{ width: 380 }}>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Enter target category:
          <input
            type="text"
            name={"searchtext"}
            value={inputs.searchtext || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      <br />
      {sidcList.length > 0 && (
        <ImageGallery
          sidcList={sidcList}
          selectable={true}
          getSelectedImages={setSelectedImages}
        />
      )}
      <br />
      {/* <button onClick={addToCache}>Associate with Search Term</button> */}
    </div>
  );
}

export default NameToSVG;
