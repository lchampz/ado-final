const Router = require("express");
const router = Router();

const estadios = require("./mocks/estadios.json");
const medalhistas = require("./mocks/medalhistas.json");
const modalidades = require("./mocks/esportes.json");


router.get("/medalhistas", (req, res) => {
  res.send(medalhistas);
})

module.exports = router;