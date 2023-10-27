import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  const [openAiQuestion, setOpenAiQuestion] = useState("");
  const [openAiOutput, setOpenAiOutput] = useState("");

  const url = "http://18.189.126.187:8080";
  // const url = "http://18.119.115.197:8080";

  const askAi = () => {
    fetch(`${url}/openai?input=${encodeURIComponent(openAiQuestion)}`)
      .then((response) => response.json())
      .then((data) => setOpenAiOutput(data.choices[0].message.content))
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <div style={{ display: "table", clear: "both", content: "" }}>
        <div style={{ float: "left", width: "35%" }}>
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
        <div style={{ float: "left", width: "65%" }}>
          <label htmlFor="openai">Got a question? Ask OpenAI</label>
          <textarea
            rows="4"
            cols="50"
            id="openai"
            name="openai"
            value={openAiQuestion}
            onChange={(e) => setOpenAiQuestion(e.target.value)}
          />
          <br />
          <button onClick={askAi}>Ask OpenAI</button>
        </div>
      </div>
      <div style={{ display: "table", clear: "both", content: "" }}>
        <div style={{ float: "left", width: "50%" }}>
          <Outlet />
        </div>
        <div style={{ float: "left", width: "50%" }}>
          <p style={{ width: 440 }}>{openAiOutput}</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
