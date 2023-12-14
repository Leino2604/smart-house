const mongoose = require("mongoose");

const thresholdSchema = new mongoose.Schema({
	fanDevice: {
		type: String,
		default: "",
	},
	lightDevice: {
		type: String,
		default: "",
	},
	tempSensor: {
		type: String,
		default: "",
	},
	humidSensor: {
		type: String,
        default: "",
	},
	distanceSensor: {
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
	humid: {
		type: "decimal128",
		required: true,
		default: 0.0,
	},
	temp: {
		type: "decimal128",
		required: true,
		default: 0.0,
	},
	distance: {
		type: Number,
		required: true,
		default: 0,
	},
	active: {
		type: Boolean,
		required: true,
		default: true,
	},
});

const Threshold = mongoose.model("Threshold", thresholdSchema);

module.exports = Threshold;


// fanDevice: "",
// fanSpeed: 0,
// lightDevice: "",
// lightStatus: false,
// tempSensor: "",
// temp: 0.0,
// humidSensor: "",
// humid: 0.0,
// distaceSensor: "",
// distance: 0,
// active: true,
