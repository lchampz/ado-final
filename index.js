const express = require("express");
const bp = require("body-parser");
const routes = require("./routes")
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('\n' + '\x1b[36m%s\x1b[0m', `[Server] running on http://localhost:${PORT}`);
})

