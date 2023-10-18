import React, { useState, useEffect } from "react";

const Page = ({
  imgsPerPage,
  totalImgs,
  paginate,
  currentPage,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];
  const [valInTextBox, setValInTextBox] = useState(currentPage);
  const lastPage = Math.ceil(totalImgs / imgsPerPage);

  useEffect(() => {
    setValInTextBox(currentPage);
  }, [currentPage]);

  for (
    let i = Math.max(Number(currentPage) - 2, 1);
    i <=
    (Number(currentPage) < 3 ? 5 : Math.min(Number(currentPage) + 2, lastPage));
    i++
  ) {
    if (i <= lastPage) pageNumbers.push(i);
  }

  const goToPage = (event) => {
    if (event.target.value < 1) {
      paginate(1);
      setValInTextBox(1);
    } else if (event.target.value > lastPage) {
      paginate(lastPage);
      setValInTextBox(lastPage);
    } else {
      paginate(event.target.value);
    }
  };

  return (
    lastPage > 1 && (
      <div>
        <div
          className="img-page-container"
          style={{ display: "flex", justifyContent: "space-evenly" }}
        >
          <button
            onClick={(event) => {
              paginate(1);
              setValInTextBox(1);
            }}
            className="img-page-number"
          >
            {"<<"}
          </button>
          <button
            onClick={(event) => {
              previousPage(event);
              setValInTextBox(Math.max(Number(currentPage) - 1, 1));
            }}
            className="img-page-number"
          >
            {"<"}
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => {
                paginate(pageNumber);
                setValInTextBox(pageNumber);
              }}
              className="img-page-number"
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={(event) => {
              nextPage(event);
              setValInTextBox(Math.min(Number(currentPage) + 1, lastPage));
            }}
            className="img-page-number"
          >
            {">"}
          </button>
          <button
            onClick={(event) => {
              paginate(lastPage);
              setValInTextBox(lastPage);
            }}
            className="img-page-number"
          >
            {">>"}
          </button>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <label>Go to page: </label>
          <input
            type={"text"}
            size={3}
            onBlur={goToPage}
            onChange={(event) => setValInTextBox(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                goToPage(event);
              }
            }}
            value={valInTextBox}
          />
        </div>
      </div>
    )
  );
};

export default Page;
