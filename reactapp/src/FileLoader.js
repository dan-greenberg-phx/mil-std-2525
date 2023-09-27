import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import ms from "milsymbol";
import "./FileLoader.css";

import Page from "./Page";

function FileLoader() {
  const [file, setFile] = useState();
  const [sidcList, setSidcList] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const fileReader = new FileReader();

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(sidcList.split("\n").length / 25)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (file) {
      fileReader.onload = function(event) {
        setSidcList(event.target.result);
      };
      fileReader.readAsText(file);
    }
    setCurrentPage(1);
  };

  const csvFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div style={{ width: 380 }}>
      <br />
      <form>
        <input
          type={"file"}
          id={"sidCSV"}
          accept={".txt"}
          onChange={csvFileChange}
          onClick={(event) => (event.target.value = null)}
        />
        <button onClick={handleSubmit}>Display</button>
      </form>
      <br />
      {sidcList !== "" && (
        <Gallery
          images={sidcList
            .split("\n")
            .slice(25 * (currentPage - 1), 25 * currentPage)
            .map((sidc) => {
              return {
                src: `data:image/svg+xml;utf8,${encodeURIComponent(
                  new ms.Symbol(sidc).asSVG()
                )}`,
                width: 75,
                height: 60,
                caption: sidc,
              };
            })}
          rowHeight={60}
          enableImageSelection={false}
        />
      )}
      {sidcList !== "" && (
        <Page
          imgsPerPage={25}
          totalImgs={sidcList.split("\n").length}
          paginate={paginate}
          currentPage={currentPage}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
}

export default FileLoader;
