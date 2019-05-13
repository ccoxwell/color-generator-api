import express from "express";
import generateColor from "./db/color";

const app = express();

app.get("/api/v1/color", (req, res) => {
	console.log("getting a request");
	res.status(200).send({
		success: "true",
		message: "color retrieved successfully",
		color: generateColor()
	});
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
