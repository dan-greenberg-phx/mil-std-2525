import express from "express";
import ms from "milsymbol";
import http from "http";
const app = express();
const port = 3001;

app.get("/getsvg/:sidc", (req, res) => {
  res.send(new ms.Symbol(req.params.sidc.replace(/-/g, "")).asSVG());
});

http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// });
