import express from "express";
import generateColor from "./db/color";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import { strict as assert } from "assert";
dotenv.config();
const url = process.env.MONGODB_LETS_TRY_THIS;
const dbName = process.env.MONGODB_NAME;
const client = new MongoClient(url, {useNewUrlParser: true});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const PORT = process.env.PORT;
var db;
console.log(url);

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
});
