const getHistoricalColors = require("../db/color").getHistoricalColors;
const generateColor = require("../db/color").generateColor;

class ColorsController {

    static getColor(req, res) {
        generateColor().then(function(color) {
            console.log(color);
            return res.status(200).send({
                success: "true",
                message: "color generated successfully",
                color: color
            });
        }).catch(function(err) {
            console.log("you ran into an error!");
            console.log(err);
        });      
    }
    
    static getAllColors(req, res, db) {
        getHistoricalColors(db).then(function(colors) {
            res.status(200).send({
                success: "true",
                message: "historical colors retrieved successfully",
                colors
            });
        }).catch(function(err) {
            console.log(err);
        })
    }
}

module.exports = ColorsController;