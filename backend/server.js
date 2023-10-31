const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Schedule = require("./models/schedule");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
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
      return res
        .status(404)
        .json({ message: `Cannot find schedule with ID ${id}` });
    }
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new schedule
app.post("/schedules", async (req, res) => {
  try {
    const { hour, minute, date, repeat, fan, light, notification } = req.body;
    const schedule = new Schedule({
      hour,
      minute,
      date,
      repeat,
      fan,
      light,
      notification,
    });
    const newSchedule = await schedule.save();
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
      return res
        .status(404)
        .json({ message: `Cannot find schedule with ID ${id}` });
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
      return res
        .status(404)
        .json({ message: `Cannot find schedule with ID ${id}` });
    }
    res.status(200).json(deletedSchedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://admin:admin@smart-house.r4bi8mz.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to Smart House MongoDB");

    app.listen(3000, () => {
      console.log("Smart House database is running on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
