const axios = require("axios");
const aio_key = "aio_pUIZ51qAjbLsUnFexeGSoZw4RZIa";

const BACKEND_API = "https://smart-house-api.onrender.com";
let data = [];
let temp = 0.0,
	humid = 0.0,
	distance = 0.0,
	presented = false;

// --Get threshold data and run once
const fetchThresholdData = async () => {
	try {
		const response = await axios.get(`${BACKEND_API}/thresholds`);
		const thresholds = response.data;
		data = thresholds;
		return data;
	} catch (error) {
		handleError(error);
	}
};

// --Get newest sensor data featuring temp, humid, distance
const fetchEnvironmentSensorData = async (tempSensor, humidSensor, distanceSensor) => {
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};

		let latestTemp = 0.0,
			latestHumid = 0.0,
			latestDistance = 0.0;

		if (tempSensor) {
			const tempResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${tempSensor.toString()}/data/last`, { headers });
			latestTemp = parseFloat(tempResponse.data.value);
		} else {
			console.log("Temp sensor empty");
		}

		if (humidSensor) {
			const humidResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${humidSensor.toString()}/data/last`, {
				headers,
			});
			latestHumid = parseFloat(humidResponse.data.value);
		} else {
			console.log("Humid sensor empty");
		}

		if (distanceSensor) {
			const distanceResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${distanceSensor.toString()}/data/last`, {
				headers,
			});
			latestDistance = parseFloat(distanceResponse.data.value);
		} else {
			console.log("Distance sensor empty");
		}

		return [latestTemp, latestHumid, latestDistance];
	} catch (error) {
		handleError(error);
	}
};

const fetchPIRSensorData = async (pirSensor) => {
	if (!pirSensor) {
		console.log("PIR sensor empty");
		return;
	}
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};
		const pirResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${pirSensor.toString()}/data/last`, { headers });
		return pirResponse.data.value;
	} catch (error) {
		handleError(error);
	}
};

// --Send light data
const sendLightData = async (lightDevice, lightValue) => {
	if (!lightDevice) {
		console.log("Light device empty");
		return;
	}
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};
		let lightValueBit = 0;
		if (lightValue) {
			lightValueBit = 1;
		}
		const data = {
			value: lightValueBit,
		};
		url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${lightDevice.toString()}/data`;
		const response = await axios.post(url, data, { headers });
		// console.log(response.data);
		console.log(`Light device ${lightDevice} switch to ${lightValue}`);
	} catch (error) {
		handleError(error);
	}
};

// --Send fan data
const sendFanData = async (fanDevice, fanValue) => {
	if (!fanDevice) {
		console.log("Fan device empty");
		return;
	}
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};
		const data = {
			value: fanValue,
		};
		url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${fanDevice.toString()}/data`;
		const response = await axios.post(url, data, { headers });
		// console.log(response.data);
		console.log(`Change fan device ${fanDevice} speed to ${fanValue}`);
	} catch (error) {
		handleError(error);
	}
};

// --Send PIR data
const sendPIRData = async (pirDevice, pirValue) => {
	if (!pirDevice) {
		console.log("PIR device empty");
		return;
	}
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};
		const data = {
			value: pirValue,
		};
		url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${pirDevice.toString()}/data`;
		const response = await axios.post(url, data, { headers });
		// console.log(response.data);
		console.log(`Change PIR device ${pirDevice} to ${pirValue}`);
	} catch (error) {
		handleError(error);
	}
};

// --Get last active fanspeed
const getLastFanSpeed = async (fanDevice) => {
	if (!fanDevice) {
		console.log("Fan device empty, cannot get last value of fan speed");
		return;
	}

	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};
		url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${fanDevice.toString()}/data/last`;

		const response = await axios.get(url, { headers });
		return response.data.value;
	} catch (error) {
		handleError(error);
	}
};

let interval;
let thresholdFlag = false;
// let revertFanSpeed = 0;

const triggerThreshold = () => {
	const checkThresholdReached = async () => {
		data = [];
		await fetchThresholdData();

		for (const item of data) {
			if (item.active === true) {
				[temp, humid, distance] = await fetchEnvironmentSensorData(item["tempSensor"], item["humidSensor"], item["distanceSensor"]);
				presentedString = await fetchPIRSensorData(item["pirSensor"]); //KHONG CO/CO NGUOI

				let tempThreshold = item["temp"].$numberDecimal;
				let humidThreshold = item["humid"].$numberDecimal;
				let distanceThreshold = item["distance"];
				let presentThreshold = item["presented"]; // True/false
				let isPresent = false;

				if (presentedString === "CO NGUOI") {
					isPresent = true;
				} else isPresent = false;

				console.log(isPresent, presentThreshold, thresholdFlag);

				if (
					// temp >= tempThreshold &&
					// humid >= humidThreshold &&
					// distance <= distanceThreshold &&
					isPresent === presentThreshold &&
					thresholdFlag === false
				) {
					console.log("Threshold Reached. Id:", item["_id"]);
					await sendLightData(item.lightDevice, item.lightStatus);
					await sendFanData(item.fanDevice, item.fanSpeed);
					thresholdFlag = true;
				}

				if (
					// temp < tempThreshold &&
					// humid < humidThreshold &&
					// distance < distanceThreshold &&
					isPresent !== presentThreshold &&
					thresholdFlag === true
				) {
					console.log("Threshold Reverted. Id:", item["_id"]);
					await sendLightData(item.lightDevice, !item.lightStatus);
					await sendFanData(item.fanDevice, 0);
					thresholdFlag = false;
				}
			}
		}
		// setTimeout(checkThresholdReached, 3000);
	};
	// Call the function once immediately
	checkThresholdReached();
	interval = setInterval(checkThresholdReached, 3000);
};

// --Run test functions
// (async () => {
// 	console.log(await fetchThresholdData());
// 	console.log(await fetchEnvironmentSensorData("temp", "humid", "distance"));
// 	console.log(await getLastFanSpeed("fan-speed"));
// 	console.log(await fetchPIRSensorData("pir"));
// 	triggerThreshold();
// })();

triggerThreshold();

//Always be the last in code
process.on("SIGINT", () => {
	clearInterval(interval);
	console.log("Script terminated, cleaning up...");
	process.exit();
});

function handleError(error) {
	if (error.response) {
		console.error("Server responded with an error:", error.response.status, error.response.data);
	} else if (error.request) {
		console.error("No response received from the server");
	} else {
		console.error("Error setting up the request:", error.message);
	}
}
