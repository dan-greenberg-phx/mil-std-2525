import React, { useState, useEffect } from "react";
import { Gallery } from "react-grid-gallery";
import ms from "milsymbol";

import Page from "./Page";

const ImageGallery = ({
  sidcList,
  selectable = false,
  getSelectedImages = (selectedImages) => {},
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [validSidcList, setValidSidcList] = useState(
    sidcList.filter((sidc) => new ms.Symbol(sidc).validIcon)
  );
  const [images, setImages] = useState(
    validSidcList
      .slice(25 * (currentPage - 1), 25 * currentPage)
      .map((sidc) => {
        return {
          src: `data:image/svg+xml;utf8,${encodeURIComponent(
            new ms.Symbol(sidc).asSVG()
          )}`,
          width: 75,
          height: 60,
          caption: sidc,
          isSelected: false,
        };
      })
  );

  useEffect(() => {
    setImages(
      validSidcList
        .slice(25 * (currentPage - 1), 25 * currentPage)
        .map((sidc) => {
          return {
            src: `data:image/svg+xml;utf8,${encodeURIComponent(
              new ms.Symbol(sidc).asSVG()
            )}`,
            width: 75,
            height: 60,
            caption: sidc,
            isSelected: false,
          };
        })
    );
  }, [validSidcList, currentPage]);

  useEffect(() => {
    setValidSidcList(sidcList.filter((sidc) => new ms.Symbol(sidc).validIcon));
    setCurrentPage(1);
  }, [sidcList]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        images={validSidcList
          .slice(25 * (currentPage - 1), 25 * currentPage)
          .map((sidc, idx) => {
            return {
              src: `data:image/svg+xml;utf8,${encodeURIComponent(
                new ms.Symbol(sidc).asSVG()
              )}`,
              width: 75,
              height: 60,
              caption: sidc,
              isSelected: images[idx]?.isSelected || false,
            };
          })}
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
    </div>
  );
};

export default ImageGallery;
