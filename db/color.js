const MongoClient = require("mongodb").MongoClient;
const assert = require("assert").strict;
const dotenv = require("dotenv");
dotenv.config();
const url = process.env.MONGODB_LETS_TRY_THIS;
const dbName = process.env.MONGODB_NAME;
const client = new MongoClient(url, {useNewUrlParser: true});

client.connect(function(err, database) {
	assert.equal(null, err);
	console.log("Connected successfully to database server");
});

function generateColor() {
	let r = Math.random();
	r = Math.floor(r * 256);
	let g = Math.random();
	g = Math.floor(g * 256);
	let b = Math.random();
	b = Math.floor(b * 256);
	let rString = r.toString(16).toUpperCase();
	let rHex = rString.length == 2 ? rString : `0${rString}`;
	let gString = g.toString(16).toUpperCase();
	let gHex = gString.length == 2 ? gString : `0${gString}`;
	let bString = b.toString(16).toUpperCase();
	let bHex = bString.length == 2 ? bString : `0${bString}`;
	let color = {
		rgb: {r, g, b},
		hex: `#${rHex}${gHex}${bHex}`,
		timestamp: Date.now()
	}
	return client.db(dbName).collection("colors").insertOne(color);
}

function saveColor(color) {
	var collection = client.db(dbName).collection("colors");
	collection.insertOne(color);
}

function getHistoricalColors(db) {
	var colorDocs = [];
	return client.db(dbName).collection("colors").find().toArray().then(function(docs) {
		colorDocs = docs;
		return new Promise(function(resolve, reject) {
			resolve(colorDocs);
		});
	});
}

module.exports = {
	generateColor,
	saveColor,
	getHistoricalColors
}