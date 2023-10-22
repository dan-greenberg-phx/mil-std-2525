import React, { useState } from "react";
import ImageGallery from "./ImageGallery";

const FileLoader = ({ proprietary = false }) => {
  const [file, setFile] = useState();
  const [sidcList, setSidcList] = useState([]);
  const fileReader = new FileReader();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSidcList([]);

    if (file) {
      fileReader.onload = function(event) {
        setSidcList(event.target.result.split("\n").map((sidc) => sidc.trim()));
      };
      fileReader.readAsText(file);
    }
  };

  const csvFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div style={{ width: 380 }}>
      {console.info(sidcList)}
      <br />
      <form>
        <input
          type={"file"}
          id={"sidcFile"}
          accept={".txt"}
          onChange={csvFileChange}
          onClick={(event) => (event.target.value = null)}
        />
        <button onClick={handleSubmit}>Display</button>
      </form>
      <br />
      {sidcList.length > 0 && (
        <ImageGallery
          key={proprietary}
          proprietary={proprietary}
          sidcList={sidcList}
        />
      )}
    </div>
  );
};

export default FileLoader;
