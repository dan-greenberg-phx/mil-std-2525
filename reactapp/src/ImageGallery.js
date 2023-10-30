import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import ms from "milsymbol";

import Page from "./Page";

const url = "http://18.189.126.187:8080/sidc";
// const url = "http://18.119.115.197:8080/sidc";

async function getProprietarySidcs() {
  const response = await fetch("http://18.189.126.187:8080/validsidc");
  const proprietarySidcs = await response.json();
  return proprietarySidcs;
}

async function getProprietarySidcs2() {
  const response = await fetch("http://18.189.126.187:8080/sidc");
  const proprietarySidcs = await response.json();
  return proprietarySidcs;
}

const ImageGallery = ({
  sidcList,
  proprietary = false,
  selectable = false,
  getSelectedImages = (selectedImages) => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [validSidcList, setValidSidcList] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imgOptions = { width: 75, height: 60, isSelected: false };
    const prefix = "data:image/svg+xml;utf8,";
    if (proprietary) {
      getProprietarySidcs2().then((data) => {
        setImages(
          validSidcList
            .slice(25 * (currentPage - 1), 25 * currentPage)
            .map((sidc) => {
              return {
                ...imgOptions,
                src: `${prefix}${encodeURIComponent(data[sidc])}`,
                caption: sidc,
              };
            })
        );
      });
    } else {
      setImages(
        validSidcList
          .slice(25 * (currentPage - 1), 25 * currentPage)
          .map((sidc) => {
            return {
              ...imgOptions,
              src: `${prefix}${encodeURIComponent(
                new ms.Symbol(sidc).asSVG()
              )}`,
              caption: sidc,
            };
          })
      );
    }
  }, [validSidcList, sidcList, currentPage, proprietary]);

  useEffect(() => {
    if (proprietary) {
      getProprietarySidcs().then((data) =>
        setValidSidcList(
          sidcList.filter((sidc) => {
            return data.flat().includes(sidc);
          })
        )
      );
    } else {
      setValidSidcList(
        sidcList.filter((sidc) => new ms.Symbol(sidc).validIcon)
      );
    }
    setCurrentPage(1);
  }, [sidcList, proprietary]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addToDb = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sidcMapping: validSidcList.map((validsidc) => {
          return { sidc: validsidc, svg: new ms.Symbol(validsidc).asSVG() };
        }),
      }),
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => console.info(data))
      .catch((err) => console.log(err.message));
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(validSidcList.length / 25)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSelect = (index, item, event) => {
    const nextImages = images.map((image, i) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    );
    setImages(nextImages);
    getSelectedImages(nextImages.filter((image) => image.isSelected));
  };

  return (
    <div>
      <Gallery
        images={images}
        rowHeight={60}
        enableImageSelection={selectable}
        onSelect={handleSelect}
      />
      <Page
        imgsPerPage={25}
        totalImgs={validSidcList.length}
        paginate={paginate}
        currentPage={currentPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
      {!proprietary && <button onClick={addToDb}>Add to Proprietary dB</button>}
    </div>
  );
};

export default ImageGallery;
