import express from "express";
import generateColor from "./db/color";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import config from "./config";

dotenv.config();

const app = express();
const ProtectedRoutes = express.Router();
app.set("Secret", config.secret);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", ProtectedRoutes);

ProtectedRoutes.use((req, res, next) => {
	var token = req.headers["access-token"];

	if (token) {
		jwt.verify(token, app.get("Secret"), (err, decoded) => {
			if (err) {
				return res.json({ message: "invalid token" });
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.send({
			message: "no token provided."
		});
	}
});

app.get("/api/v1/color", (req, res) => {
	console.log("getting a request");
	res.status(200).send({
		success: "true",
		message: "color retrieved successfully",
		color: generateColor()
	});
});

app.post("/authenticate", (req, res) => {
	console.log(req.body);
	if(req.body.username == "carrie") {
		if(req.body.password == "password") {
			const payload = {
				check: true
			};
			var token = jwt.sign(payload, app.get("Secret"), {
				expiresIn: 1440
			});
			res.json({
				message: "authentication done", 
				token: token
			});
		} else {
			res.json({message: "please check your password"});
		}
	} else {
		res.json({message: "user not found!"});
	}
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
