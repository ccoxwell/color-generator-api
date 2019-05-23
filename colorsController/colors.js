const getHistoricalColors = require("../db/color").getHistoricalColors;
const generateColor = require("../db/color").generateColor;

class ColorsController {

    static getColor(req, res) {
        generateColor().then(function(color) {
            return res.status(200).send({
                success: "true",
                message: "color generated successfully",
                color: color.ops[0]
            });
        })        
    }
    
    static getAllColors(req, res, db) {
        getHistoricalColors(db).then(function(colors) {
            res.status(200).send({
                success: "true",
                message: "historical colors retrieved successfully",
                colors
            });
        })
    }
}

module.exports = ColorsController;