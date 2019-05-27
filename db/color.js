// const MongoClient = require("mongodb").MongoClient;
const assert = require("assert").strict;
const dotenv = require("dotenv");
const mysql = require("mysql");
dotenv.config();
// const url = process.env.MONGODB_LETS_TRY_THIS;
// const dbName = process.env.MONGODB_NAME;
// const client = new MongoClient(url, {useNewUrlParser: true});

// client.connect(function(err, database) {
// 	assert.equal(null, err);
// 	console.log("Connected successfully to database server");
// });

// var connection = mysql.createConnection({
// 	host: process.env.MYSQL_URI,
// 	user: process.env.MYSQL_USER,
// 	password: process.env.MYSQL_PW
// });

// connection.connect(function(err) {
// 	if (err) {
// 		throw err;
// 	}
// 	console.log("Connected!");
// })

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
	let timestamp = Date.now();
	let color = {
		rgb: {r, g, b},
		hex: `${rHex}${gHex}${bHex}`,
		timestamp
	}
	var hex = `${rHex}${gHex}${bHex}`;
	var sql = "INSERT INTO historical_colors (red, green, blue, hex, timestamp) VALUES ('" + r + "', '" + g + "', '" + b + "', '" + hex + "', '" + timestamp + "')";
	return connectionPromise(sql, null, color);
}

function connectionPromise(sql, values, valToResolve) {
	var connection = mysql.createConnection({
		host: process.env.CLEARDB_DATABASE_URL,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PW,
		database: "colors"
	});

	connection.connect(function(err) {
		if (err) {
			throw err;
		}
		console.log("Connected to database!");
	});
	return new Promise(function(resolve, reject) {
		connection.query(sql, values, function(err, result, fields) {
			if (err) {
				reject(err);
			}
			resolve(valToResolve);
		});
	});
}

// function saveColor(color) {
// 	var collection = client.db(dbName).collection("colors");
// 	collection.insertOne(color);
// }

function getHistoricalColors(sql, values, valToResolve) {
	var connection = mysql.createConnection({
		host: process.env.MYSQL_URI,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PW,
		database: "colors"
	});
	connection.connect(function(err) {
		if (err) {
			throw err;
		}
		console.log("connected to database!");
	});
	return new Promise(function(resolve, reject) {
		connection.query("SELECT * FROM historical_colors", values, function(err, result) {
			if (err) {
				reject(err);
			}
			resolve(result);
		});
	});
}

module.exports = {
	generateColor,
	// saveColor,
	getHistoricalColors
}