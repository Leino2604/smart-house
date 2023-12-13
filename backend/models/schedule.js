const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
	hour: {
		type: Number,
		required: true,
	},
	minute: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	repeat: {
		type: [String],
		required: true,
    enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
	},
	fanDevice: {
		type: String,
		default: "",
	},
	lightDevice: {
		type: String,
		default: "",
	},
	fanSpeed: {
		type: Number,
		required: true,
		enum: [0, 20, 40, 60, 80, 100],
		default: 0,
	},
	lightStatus: {
		type: Boolean,
		required: true,
		default: false,
	},
	notification: {
		type: Boolean,
		required: true,
	},
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
