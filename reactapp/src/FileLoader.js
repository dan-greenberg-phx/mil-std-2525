import React, { useState } from "react";
import ImageGallery from "./ImageGallery";
import fileupload from "./fileupload.png";

const FileLoader = ({ proprietary = false }) => {
  const [file, setFile] = useState();
  const [sidcList, setSidcList] = useState([]);
  const fileReader = new FileReader();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSidcList([]);

    if (file) {
      fileReader.onload = function (event) {
        setSidcList(event.target.result.split("\n").map((sidc) => sidc.trim()));
      };
      fileReader.readAsText(file);
    }
  };

  const txtFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div style={{ width: 380 }}>
      <br />
      <form>
        <input
          type="file"
          id="actual-btn"
          accept=".txt"
          onChange={txtFileChange}
          onClick={(event) => (event.target.value = null)}
          hidden
        />

        <label
          htmlFor="actual-btn"
          style={{
            backgroundColor: "indigo",
            color: "white",
            padding: "0.5rem",
            fontFamily: "sans-serif",
            borderRadius: "0.3rem",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Choose File
        </label>
        {/*        <input
          type={"file"}
          id={"sidcFile"}
          accept={".txt"}
          onChange={csvFileChange}
          onClick={(event) => (event.target.value = null)}
        />*/}
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
