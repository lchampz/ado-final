const Router = require("express");
const router = Router();

const home = require("./mocks/home.json");
const estadios = require("./mocks/estadios.json");
const medalhistas = require("./mocks/medalhistas.json");
const esportes = require("./mocks/esportes.json");



router.get("/home", (req, res) => {
  res.send(home)
})

router.get("/medalhistas", (req, res) => {
  res.send(medalhistas);
})

module.exports = router;