import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Header, Footer, Content,
  Sidebar } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import landingLogo from "./landing-logo-wl.png";
import fileupload from "./fileupload.png";

const Layout = () => {
  const [openAiQuestion, setOpenAiQuestion] = useState("");
  const [openAiOutput, setOpenAiOutput] = useState("");

 // const url = "http://18.189.126.187:8080";
   const url = "http://localhost:8080";

  const askAi = () => {
    fetch(`${url}/openai?input=${encodeURIComponent(openAiQuestion)}`)
      .then((response) => response.json())
      .then((data) => setOpenAiOutput(data.choices[0].message.content))
      .catch((err) => console.log(err.message));
  };

  return (
      <center>
    <div id={"layoutDiv"} style={{ marginTop: 30, width: "100%" }}>
      <Container id={"layoutContainer"}
      style={{
        justifyContent: "left",
        backgroundColor: "#4b5320",
      width: "100%"}}>


        <div id={"navDiv"} style={{
            display: "flex",
            marginLeft: "35px",
            backgroundColor: "#4b5320",
            float: "left",
            width: "500px",
        height: "165px"}}>
          <nav>
            <img src={landingLogo} width={"200px"} height={"158px"}
            style={{
              marginTop: "10px",
              marginLeft: "20px"
            }}/>
            <input type="file" id="actual-btn" style={{marginTop:"10px"}}hidden/>


            <label htmlFor="actual-btn" style={{
              backgroundColor: "beige",
              marginLeft: "145px",
              float: "right",
              color: "black",
              padding: "0.5rem",
              fontFamily: "sans-serif",
              borderRadius: "0.3rem",
              cursor: "pointer",
              marginTop: "115px"
            }}>Choose File</label>
{/*            <ul>
              <li>
                <Link to="/layout">File Loader - Third Party</Link>
              </li>
              <li>
                <Link to="/layout/fileloaderproprietary"><img src={fileupload} width={"100px"} height={"50px"}/></Link>
              </li>
              <li>
                <Link to="/layout/selectionsthirdparty">Selections - Third Party</Link>
              </li>
              <li>
                <Link to="/layout/selectionsproprietary">Selections - Internal</Link>
              </li>
            </ul>*/}
          </nav>
        </div>

      </Container>
        <div id={"outletDiv"} style={{
            display: "flex"

        }}>
            <Outlet />
        </div>

    </div>


    </center>
  );
};

export default Layout;
