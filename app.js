import express from "express";
import generateColor from "./db/color";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/api/v1/color", (req, res) => {
	console.log("getting a request");
	res.status(200).send({
		success: "true",
		message: "color retrieved successfully",
		color: generateColor()
	});
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
