import express from "express";
import ms from "milsymbol";
const app = express();
const port = 3001;

app.get("/getsvg", (req, res) => {
  res.send(new ms.Symbol(req.get("sidc")).asSVG());
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
