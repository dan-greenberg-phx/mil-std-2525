import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Container, Header, Footer, Content,
  Sidebar } from "rsuite";
import "rsuite/dist/rsuite.min.css";

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
    <div id={"layoutDiv"} style={{ marginTop: 50, width: "100%",height: "100%" }}>
      <Container>
        <Sidebar
            style={{
                float: "left",
                width:"fit-content",
              backgroundColor: "orange",
              padding: 20,
              color: "white"
            }}
        >

        <div style={{ float: "left", width: "fit-content" }}>
          <nav>
            <ul>
              <li>
                <Link to="/">File Loader - Third Party</Link>
              </li>
              <li>
                <Link to="/fileloaderproprietary">File Loader - Internal</Link>
              </li>
              <li>
                <Link to="/selectionsthirdparty">Selections - Third Party</Link>
              </li>
              <li>
                <Link to="/selectionsproprietary">Selections - Internal</Link>
              </li>
            </ul>
          </nav>
        </div>


        </Sidebar>
      </Container>
        <div id={"outletDiv"} style={{
            display: "flex",
            marginTop: "20px"
        }}>
            <Outlet />
        </div>

    </div>


    </center>
  );
};

export default Layout;
