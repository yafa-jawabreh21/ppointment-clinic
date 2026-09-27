const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({
    message: "Clinic API is working!",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Clinic API running at http://localhost:${PORT}`);
});
