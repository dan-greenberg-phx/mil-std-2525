import React, {useState, useEffect, Fragment, createRef} from "react";
import {useRef} from 'react';
import {Gallery} from "react-grid-gallery";
import ms from "milsymbol";
import "./index.css";
import ReactModal from 'react-modal';

import Page from "./Page";

//const url = "http://18.189.126.187:8080";
const url = "http://localhost:8080";

const ImageGallery = ({
                          selectionsList,
                          sidcList,
                          proprietary = false,
                          selectable = false,
                          getSelectedImages = (selectedImages) => {
                          },
                      }) => {
    let SYMBOL = "";
    const [isOpen, setIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [validSidcList, setValidSidcList] = useState([]);
    const [images, setImages] = useState([]);
    const [proprietarySvgs, setProprietarySvgs] = useState({});
    const [proprietarySidcs, setProprietarySidcs] = useState(new Set());

    useEffect(() => {
        const abortController = new AbortController();
        const {signal} = abortController;

        const timer = setTimeout(() => abortController.abort(), 20000);

        async function fetchSvgs() {
            try {
                const response = await fetch(`${url}/sidc`, {signal});
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
                const response = await fetch(`${url}/validsidc`, {signal});
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
        console.log("validSidcList: " + validSidcList);

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

                        caption: sidc + '\n' + formatSymbolMetadata(sidc),
                        isSelected: false, ...SYMBOL = `data:image/svg+xml;utf8,${encodeURIComponent(
                            proprietary ? proprietarySvgs[sidc] : new ms.Symbol(sidc).asSVG()
                        )}`,
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
        const {signal} = abortController;
        const sidcMapping = validSidcList.map((validsidc) => {
            return {sidc: validsidc, svg: new ms.Symbol(validsidc).asSVG()};
        });
        const timer = setTimeout(() => abortController.abort(), 50000);
        const chunkSize = 500;
        for (let i = 0; i < sidcMapping.length; i += chunkSize) {
            const requestOptions = {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
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

    async function downloadSymbol() {
        //       console.log(document.getElementsByClassName("ReactGridGallery_tile-viewport")
        //         .item(0).getElementsByTagName("img").item(0).getAttribute("src"));
        let imgEl = document.getElementsByClassName("ReactGridGallery_tile-viewport")
            .item(0).getElementsByTagName("img").item(0);
        let symUrl = document.getElementsByClassName("ReactGridGallery_tile-viewport")
            .item(0).getElementsByTagName("img").item(0).getAttribute("src");
        const d = document.createElement("input");
        d.style.width = "500px";
        d.style.height = "fit-content";
        d.type = "submit";
        const a = document.createElement('a');
        a.href = symUrl;
        //a.download = symUrl.split('/').pop();
        a.download = "your-symbol-name";
        d.append(a);
        document.body.appendChild(d);
        a.click();
        document.body.removeChild(d);
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
            i === index ? {...image, isSelected: !image.isSelected} : image
        );
        setImages(nextImages);
        getSelectedImages(nextImages.filter((image) => image.isSelected));
    };

    function handleCloseModal() {
        this.setState({showModal: false});
    }

    function formatSymbolMetadata(sidc) {
        let output = "";
        let msSymbol = new ms.Symbol(sidc);
        output += "SIDC: " + sidc + "\n";
        output += "Unit: " + msSymbol.getMetadata().unit + "\n";
        output += "Affiliation: " + msSymbol.getMetadata().affiliation + "\n";
        output += "BaseAffiliation: " + msSymbol.getMetadata().baseAffilation + "\n";
        output += "Dimension: " + msSymbol.getMetadata().dimension + "\n";
        output += "BaseDimension: " + msSymbol.getMetadata().baseDimension + "\n";
        output += "Context: " + msSymbol.getMetadata().context + "\n";
        output += "Condition: " + msSymbol.getMetadata().condition + "\n";
        output += "Echelon: " + msSymbol.getMetadata().echelon + "\n";
        output += "Mobility: " + msSymbol.getMetadata().mobility + "\n";


        return output;
    }


    const sidcModalRef = useRef();

    function ClickOffModalclose() {

        useEffect(() => {
            //console.log("active: "+document.activeElement.id);
            if (isOpen) {
                console.log("its open")
            }

            document.addEventListener("mousedown", (event) => {
                console.log("active: " + document.activeElement.id);
                if (!sidcModalRef.current.contains(event.target) && document.activeElement.id !== "modalId"
                    && document.activeElement.id !== "sidcInput"
                    && document.activeElement.id !== "sidcButton"
                ) {

                    console.log("conatins: " + sidcModalRef.current.contains(event.target)
                    );

                    setIsOpen(false);
                }

            });

        });
    }

    async function genSymbolFromSidc() {

        let provSidc = document.getElementById("sidcInput").value;
        let thisSymbolImg = new ms.Symbol(provSidc);
        console.log("provided SIDC: " + provSidc);
        let metadata = formatSymbolMetadata(provSidc);
        console.log(metadata);
        validSidcList.pop();
        validSidcList.push(provSidc);
        setCurrentPage(1);
        setImages(
            validSidcList
                .slice(25 * (currentPage - 1), 25 * currentPage)
                .map((provSidc) => {
                    return {
                        width: 75,
                        height: 60,
                        src: `data:image/svg+xml;utf8,${encodeURIComponent(
                            proprietary ? proprietarySvgs[provSidc] : thisSymbolImg.asSVG()
                        )}`,

                        caption: provSidc + '\n' + metadata,
                        isSelected: false, ...SYMBOL = `data:image/svg+xml;utf8,${encodeURIComponent(
                            proprietary ? proprietarySvgs[provSidc] : thisSymbolImg.asSVG()
                        )}`,
                    };

                })
        );
        setIsOpen(false);

    }

    return (
        <Fragment>
            <div style={{width: "100%"}}>
                {/*
            30001120000000000000
            30021100001102000500
             */}
                <div id={"modalDiv"} ref={sidcModalRef}

                     style={{display: "inline-block"}}>
                    <button id={"sidcButton"} style={{
                        backgroundColor: "#818761",
                        border: "none", borderRadius: "8px",
                        height: "45px",
                        width: "200px",
                        color: "white",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        margin: "6px 4px",
                        cursor: "pointer"

                    }} onClick={() => setIsOpen(true)}>
                        Enter SIDC
                    </button>

                    <ReactModal id={"modalId"}
                                isOpen={isOpen}
                                onRequestClose={ClickOffModalclose()}
                                contentLabel="Example Modal"
                                style={{
                                    overlay: {
                                        backgroundColor: '#818761',
                                        width: "290px",
                                        height: "120px",
                                        position: "absolute",
                                        top: "25%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"

                                    },
                                    content: {
                                        width: "300px",
                                        height: "130px",
                                        color: 'black',
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)"
                                    }
                                }}

                    >
                        <input id="sidcInput" type="text" placeholder={"Enter SIDC"} style={{
                            height: "45px",
                            borderColor: "#818761"
                        }}></input>
                        <button
                            style={{
                                backgroundColor: "#818761",
                                border: "none", borderRadius: "8px",
                                height: "25px",
                                width: "100px",
                                color: "white",
                                textAlign: "center",
                                textDecoration: "none",
                                display: "inline-block",
                                fontSize: "14px",
                                margin: "6px 4px",
                                cursor: "pointer"
                            }}
                            onClick={genSymbolFromSidc}>Get Symbol
                        </button>
                    </ReactModal>

                </div>

                <button
                    style={{
                        backgroundColor: "#818761",
                        border: "none", borderRadius: "8px",
                        height: "45px",
                        width: "200px",
                        color: "white",
                        textAlign: "center",
                        textDecoration: "none",
                        display: "inline-block",
                        fontSize: "16px",
                        margin: "6px 4px",
                        cursor: "pointer"

                    }}>Import SIDC(s) From File
                </button>


                {!proprietary && <button onClick={addToDb}
                                         style={{
                                             backgroundColor: "#818761",
                                             borderRadius: "8px",
                                             border: "none",
                                             width: "200px",
                                             height: "45px",
                                             color: "white",
                                             textAlign: "center",
                                             textDecoration: "none",
                                             display: "inline-block",
                                             fontSize: "16px",
                                             margin: "6px 4px",
                                             cursor: "pointer"

                                         }}>Add Symbol Database</button>}

                <button onClick={downloadSymbol}
                        style={{
                            backgroundColor: "#818761",
                            border: "none",
                            borderRadius: "8px",
                            height: "45px",
                            width: "200px",
                            color: "white",
                            textAlign: "center",
                            textDecoration: "none",
                            display: "inline-block",
                            fontSize: "16px",
                            margin: "6px 4px",
                            cursor: "pointer"
                        }}
                >Download Symbol
                </button>

            </div>
            <div id={"imgGalleryDiv"} style={{
                marginTop: "5%",
                marginLeft: "27%",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <Gallery id={"gal"}
                         images={images}
                         rowHeight={250}
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
        </Fragment>
    );
};

export default ImageGallery;
