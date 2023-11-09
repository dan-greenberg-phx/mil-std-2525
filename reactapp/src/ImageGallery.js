import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import ms from "milsymbol";

import Page from "./Page";

const url = "http://18.189.126.187:8080";
// const url = "http://18.119.115.197:8080";

const ImageGallery = ({
  sidcList,
  proprietary = false,
  selectable = false,
  getSelectedImages = (selectedImages) => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [validSidcList, setValidSidcList] = useState([]);
  const [images, setImages] = useState([]);
  const [proprietarySvgs, setProprietarySvgs] = useState({});
  const [proprietarySidcs, setProprietarySidcs] = useState(new Set());

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    const timer = setTimeout(() => abortController.abort(), 20000);

    async function fetchSvgs() {
      try {
        const response = await fetch(`${url}/sidc`, { signal });
        const json = await response.json();
        clearTimeout(timer);
        setProprietarySvgs(json);
      } catch (e) {
        clearTimeout(timer);
        console.info(e);
      }
    }

    async function fetchSidcs() {
      try {
        const response = await fetch(`${url}/validsidc`, { signal });
        const json = await response.json();
        clearTimeout(timer);
        setProprietarySidcs(new Set(json));
      } catch (e) {
        clearTimeout(timer);
        console.info(e);
      }
    }
    fetchSvgs();
    fetchSidcs();
  }, []);

  useEffect(() => {
    setImages(
      validSidcList
        .slice(25 * (currentPage - 1), 25 * currentPage)
        .map((sidc) => {
          return {
            width: 75,
            height: 60,
            src: `data:image/svg+xml;utf8,${encodeURIComponent(
              proprietary ? proprietarySvgs[sidc] : new ms.Symbol(sidc).asSVG()
            )}`,
            caption: sidc,
            isSelected: false,
          };
        })
    );
  }, [validSidcList, currentPage, proprietarySvgs, proprietary]);

  useEffect(() => {
    setValidSidcList(
      sidcList.filter((sidc) =>
        proprietary ? proprietarySidcs.has(sidc) : new ms.Symbol(sidc).validIcon
      )
    );
    setCurrentPage(1);
  }, [sidcList, proprietarySidcs, proprietary]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  async function addToDb() {
    const abortController = new AbortController();
    const { signal } = abortController;
    const sidcMapping = validSidcList.map((validsidc) => {
      return { sidc: validsidc, svg: new ms.Symbol(validsidc).asSVG() };
    });
    const timer = setTimeout(() => abortController.abort(), 50000);
    const chunkSize = 500;
    for (let i = 0; i < sidcMapping.length; i += chunkSize) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sidcMapping: sidcMapping.slice(i, i + chunkSize),
        }),
        signal,
      };
      await fetch(`${url}/sidc`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          clearTimeout(timer);
          console.info(data);
        })
        .catch((err) => {
          clearTimeout(timer);
          console.log(err.message);
        });
      fetch(`${url}/refreshsidc`)
        .then((response) => response.json())
        .then((data) => console.info(data))
        .catch((err) => console.info(err.message));
    }
    // const requestOptions = {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     sidcMapping: validSidcList.map((validsidc) => {
    //       return { sidc: validsidc, svg: new ms.Symbol(validsidc).asSVG() };
    //     }),
    //   }),
    //   signal,
    // };
    // fetch(`${url}/sidc`, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     clearTimeout(timer);
    //     console.info(data);
    //   })
    //   .catch((err) => {
    //     clearTimeout(timer);
    //     console.log(err.message);
    //   });
  }

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
      {/* {!proprietary && <button onClick={addToDb}>Add to Proprietary dB</button>} */}
    </div>
  );
};

export default ImageGallery;
