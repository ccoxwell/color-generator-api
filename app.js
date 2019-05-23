const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const router = require("./routes/index").router;

dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

