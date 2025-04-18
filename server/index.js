const express = require("express");
const cors = require("cors");
const { DOMAIN, DOMAIN_PORT } = require("./utils/export_env");
const BlogRouter = require("./routes/Blog/blog");
const { currentDateTime } = require("./utils/Date");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.send(`${currentDateTime()}`);
});

app.use("/blog", BlogRouter);

// http://localhost:5000/images/Brr_Brr_Patapim%20(1).png

// Start the server
app.listen(DOMAIN_PORT, () => {
  console.log(`Server is running on ${DOMAIN}:${DOMAIN_PORT}`);
});
