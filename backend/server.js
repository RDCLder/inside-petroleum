const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const Form = require("./schema/form");
const cors = require("cors");

// const API_PORT = 3001 || process.env.port;
const API_PORT = 3001;
const app = express();
const router = express.Router();
const dbRoute = "mongodb+srv://test_user:test@inside-petroleum-pz5yk.mongodb.net/test?retryWrites=true";

mongoose.connect(
	dbRoute,
	{ useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cors());

// Get data from MongoDB
router.get("/getData", (req, res) => {
	Form.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
});

// Post data to MongoDB
router.post("/postData", (req, res) => {
	let data = new Form();
	const { id, title } = req.body;

	if ((!id && id !== 0) || !title) {
		return res.json({
			success: false,
			error: "INVALID INPUTS"
		});
	}

	data.title = title;
	data.id = id;
	data.save(err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

// Update data in MongoDB
router.post("/updateData", (req, res) => {
	const { id, update } = req.body;
	Form.findByIdAndUpdate(id, update, err => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true });
	});
});

// Delete data from MongoDB
router.delete("/deleteData", (req, res) => {
	const { id } = req.body;
	Form.findByIdAndDelete(id, err => {
		if (err) return res.send(err);
		return res.json({ success: true });
	});
});

app.use("/api", router);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));