const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const items = require("./routes/api/items");
const path = require("path");

const app = express();

app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("DB connected..."))
	.catch(err => console.log(err));

app.use("/api/items", items);

// Serve static assets
if (process.env.NODE_ENV === "production") {
	//Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
