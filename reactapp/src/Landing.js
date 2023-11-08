import { Outlet, Link } from "react-router-dom";
import landingLogo from "./landing-logo.png";
import { useState } from "react";
import Layout from "./Layout";

const Landing = () => {
    return (
        <body style={{
            backgroundColor: "beige"
        }}>
        <center>

        <div style={{
            width: "100%",
            height: "100%",
            marginTop: "10%",
            backgroundColor: "#6F9B76"
        }}>
            <Link to="/layout/selectionsthirdparty"> <img src={landingLogo} width={"350px"} height={"277px"}/></Link>
        </div>
        </center>
        </body>
    );
};
export default Landing;
