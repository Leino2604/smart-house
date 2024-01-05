const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schedule = require("./models/schedule");
const Threshold = require("./models/threshold");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
// 5 API for schedules
// Get list of schedules
app.get("/schedules", async (req, res) => {
	try {
		const schedules = await Schedule.find();
		res.status(200).json(schedules);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get one schedule
app.get("/schedules/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const schedule = await Schedule.findById(id);
		if (!schedule) {
			return res.status(404).json({ message: `Cannot find schedule with ID ${id}` });
		}
		res.status(200).json(schedule);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Create a new schedule
app.post("/schedules", async (req, res) => {
  const newSchedule = new Schedule(req.body);
	try {
		await newSchedule.save();
		res.status(201).json(newSchedule);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Update one schedule
app.put("/schedules/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedSchedule) {
			return res.status(404).json({ message: `Cannot find schedule with ID ${id}` });
		}
		res.status(200).json(updatedSchedule);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// Delete one schedule
app.delete("/schedules/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedSchedule = await Schedule.findByIdAndDelete(id);
		if (!deletedSchedule) {
			return res.status(404).json({ message: `Cannot find schedule with ID ${id}` });
		}
		res.status(200).json(deletedSchedule);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// 5 API for thresholds
// Get list of thresholds
app.get("/thresholds", async (req, res) => {
	try {
		const thresholds = await Threshold.find();
		res.status(200).json(thresholds);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Get 1 threshold
app.get("/thresholds/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const threshold = await Threshold.findById(id);
		if (!threshold) {
			res.status(404).json({ message: `Threshold not found with ID ${ID}` });
			return;
		}
		res.status(200).json(threshold);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Create new threshold
app.post("/thresholds", async (req, res) => {
	//This or define each value is better?
	const newThreshold = new Threshold(req.body);
	try {
		await newThreshold.save();
		res.status(201).json(newThreshold);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

//Update 1 threshold
app.put("/thresholds/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const updatedThreshold = await Threshold.findByIdAndUpdate(
			id,
			req.body,
			{ new: true }, // This option returns the updated document.
		);
		if (!updatedThreshold) {
			res.status(404).json({ message: "Threshold not found" });
			return;
		}
		res.status(200).json(updatedThreshold);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//Delete 1 threshold
app.delete("/thresholds/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const deletedThreshold = await Threshold.findByIdAndDelete(id);
		if (!deletedThreshold) {
			res.status(404).json({ message: "Threshold not found" });
			return;
		}
		res.status(200).json(deletedThreshold);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

mongoose.set("strictQuery", false);
mongoose
	.connect("mongodb+srv://admin:admin@smart-house.r4bi8mz.mongodb.net/?retryWrites=true&w=majority")
	.then(() => {
		console.log("Connected to Smart House MongoDB");

		app.listen(3000, () => {
			console.log("Smart House database is running on port 3000");
		});
	})
	.catch((error) => {
		console.log(error);
	});
