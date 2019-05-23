const express = require("express");
const ColorsController = require("../colorsController/colors");
const router = express.Router();

router.get("/api/v1/historical-colors", ColorsController.getAllColors);
router.get("/api/v1/color", ColorsController.getColor);
router.get("/", function handleRootRequest(req, res) {
    res.status(200).send({
        success: "true",
        message: "you don't want to be here. try /api/v1/color or /api/v1/historical-colors instead"
    });
});

module.exports = {router};