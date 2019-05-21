import express from "express";
import generateColor from "./db/color";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { strict as assert } from "assert";

const url = process.env.MONGODB_URL;
const dbName = "heroku_w5rj6zjd";
const client = new MongoClient(url, {useNewUrlParser: true});
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const PORT = process.env.PORT;
var db;

client.connect(function(err, database) {
	assert.equal(null, err);
	console.log("Connected successfully to database server");

	app.listen(PORT, () => {
		console.log(`server running on port ${PORT}`);
	});
});


app.get("/api/v1/color", function handleRequest(req, res) {
	console.log("getting a request");
	var color = generateColor();
	db = client.db(dbName);
	var collection = db.collection("colors");
	collection.insertOne(color)
	res.status(200).send({
		success: "true",
		message: "color retrieved successfully",
		color
	});
});

app.get("/api/v1/historical-colors", function getHistoricalColors(req, res) {
	db = client.db(dbName);
	var collection = db.collection("colors");
	var myDocs = [];
	collection.find({}, function(err, docs) {
		docs.each(function(err, doc) {
			if (doc) {
				myDocs.push(doc);
			} else {
				res.status(200).send({
					success: "true",
					message: "historical colors retrieved successfully",
					whoops: "whoops",
					colors: myDocs
				});
			}
		});
	});
})

