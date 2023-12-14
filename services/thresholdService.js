const axios = require("axios");
const aio_key = "aio_xWAq30FEBn10PygTgRr1uiiqupLS";

const BACKEND_API = "https://smart-house-api.onrender.com";
let data = [];

let distanceOld = 0.0;
let distanceNew = 0.0;
let distanceFirstRun = true; // Add flag to prevent false triggering when distanceOld = 0

// --Get threshold data and run once
const fetchThresholdData = async () => {
	try {
		const response = await axios.get(`${BACKEND_API}/thresholds`);
		const thresholds = response.data;
		data.push(thresholds);
		for (const item of data[0]) {
			console.log("Item: ", item);
			console.log("Id Data: ", item["_id"]);
			console.log("Fan Device Key:", item["fanDevice"]);
			console.log("Fan speed: ", item["fanSpeed"]);
			console.log("Light Device Key: ", item["lightDevice"]);
			console.log("Light switch: ", item["lightStatus"]);
			console.log("Temp sensor:", item["tempSensor"]);
			console.log("Temp Data: ", item["temp"].$numberDecimal);
			console.log("Humid sensor:", item["humidSensor"]);
			console.log("Humid Data: ", item["humid"].$numberDecimal);
			console.log("Distance sensor: ", item["distanceSensor"]);
			console.log("Distance Data: ", item["distance"]);
			console.log("-----------");
		}
	} catch (error) {
		handleError(error);
	}
};

// --Get newest sensor data
const fetchSensorData = async (tempSensor, humidSensor, distanceSensor) => {
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};

		const tempResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${tempSensor.toString()}/data/last`, { headers });
		const latestTemp = parseFloat(tempResponse.data.value);

		const humidResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${humidSensor.toString()}/data/last`, { headers });
		const latestHumid = parseFloat(humidResponse.data.value);

		const distanceResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${distanceSensor.toString()}/data/last`, { headers });
		const latestDistance = parseFloat(distanceResponse.data.value);

		console.log("Latest temp: ", latestTemp);
		console.log("Latest humid: ", latestHumid);
		console.log("Latest distance: ", latestDistance);
		console.log("----------------------");
		return latestTemp, latestHumid, latestDistance;
	} catch (error) {
		handleError(error);
	}
};

// --Send light data
const sendLightData = async (lightDevice, lightValue) => {
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};

		const data = {
			value: lightValue,
		};

		url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${lightDevice.toString()}/data`;
		console.log("Send light url: ", url)

		const response = await axios.post(url, data, { headers });
		// console.log(response.data);
		console.log(`Light device ${lightDevice} switch to ${lightValue}`);
	} catch (error) {
		handleError(error);
	}
};

// --Send fan data
const sendFanData = async (fanDevice, fanValue) => {
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};

		const data = {
			value: fanValue,
		};

		url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${fanDevice.toString()}/data`;
		console.log("Send fan url: ", url);

		const response = await axios.post(url, data, { headers });
		// console.log(response.data);
		console.log(`Change fan device ${fanDevice} speed to ${fanValue}`);
	} catch (error) {
		handleError(error);
	}
};

// --Get last active fanspeed
const getLastFanSpeed = async (fanDevice) => {
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};

		const response = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${fanDevice.toString()}/data/last`, { headers });
		// console.log(response.data.value);
		return response.data.value;
	} catch (error) {
		handleError(error);
	}
}

const checkThresholdReached = async () => {
	data = [];
	await fetchThresholdData();
	let tempOld,
		tempNew = 0.0;
	let humidOld,
		humidNew = 0.0;
	let distanceOld,
		distanceNew = 0;

	let isFirstRun = true;

	for (const item of data[0]) {
		console.log("Enter loop block");
		tempNew, humidNew, distanceNew = fetchSensorData(item["tempSensor"], item["humidSensor"], item["distanceSensor"]);
		console.log("Fetch sensor success");

		let tempThreshold = item["temp"].$numberDecimal;
		let humidThreshold = item["humid"].$numberDecimal;
		let distanceThreshold = item["distance"];

		let revertFanSpeed = 0;
		getLastFanSpeed(item["fanDevice"]).then(fanSpeed => {
			revertFanSpeed = fanSpeed;
		});
		console.log("Revert fan speed: ", revertFanSpeed);

		if (!isFirstRun) {
			if (
				distanceNew <= distanceThreshold &&
				distanceOld > distanceThreshold &&
				tempNew >= tempThreshold &&
				tempOld < tempThreshold &&
				humidNew >= humidThreshold &&
				humidOld < humidThreshold
			) {
				sendLightData(item["lightDevice"], item["lightStatus"]);
				sendFanData(item["fanDevice"], item["fanSpeed"]);
			} else if (
				distanceNew > distanceThreshold &&
				distanceOld <= distanceThreshold &&
				tempNew < tempThreshold &&
				tempOld >= tempThreshold &&
				humidNew < humidThreshold &&
				humidOld >= humidThreshold
			) {
				sendLightData(item["lightDevice"], !item["lightStatus"]);
				sendFanData(item["fanDevice"], revertFanSpeed);
			}
		}

		if (isFirstRun) {
			tempOld, humidOld, distanceOld = tempNew, humidNew, distanceNew;
			isFirstRun = false;
		}
	}
};

// --Check and trigger light when threshold satisfied
// const checkDistanceThresholdReached = async (distanceThreshold) => {
// 	await fetchSensorData();

// 	console.log("Distance old:", distanceOld);
// 	console.log("Distance new:", distanceNew);
// 	console.log("Distance threshold:", distanceThreshold);
// 	console.log("----------------------------");

// 	if (!isFirstRun) {
// 		if (distanceNew <= distanceThreshold && distanceOld > distanceThreshold) {
// 			sendLightData(1);
// 			console.log("light on");
// 		} else if (distanceNew > distanceThreshold && distanceOld <= distanceThreshold) {
// 			sendLightData(0);
// 			console.log("light off");
// 		}
// 	}

// 	// Set distanceOld only after the first run
// 	if (isFirstRun) {
// 		distanceOld = distanceNew;
// 		isFirstRun = false;
// 	}
// };

// --Run test functions

fetchThresholdData();
fetchSensorData("temp", "humid", "distance");
// console.log("Last fan speed: ", getLastFanSpeed("fan-speed"));
// getLastFanSpeed("fan-speed").then(fanSpeed => {
// 	console.log("Last fan speed:", fanSpeed);
// });

// fetchSensorData();
// checkDistanceThresholdReached(50);

const interval = setInterval(() => {
    checkThresholdReached();
}, 3000);

//  --Run temp distance data to test
// const distanceValueArr = [20.0, 30.0, 40.0, 50.0, 60.0, 80.0, 100.0, 60.0, 51.0, 50.1, 50.0, 49.9, 40.0, 60.0, 100.0];

// const sendFakeDistanceData = async (distanceValue) => {
//     try {
//         const headers = {
//             "X-AIO-Key": aio_key,
//             "Content-Type": "application/json",
//         };

//         const data = {
//             value: distanceValue,
//         };

//         const response = await axios.post(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.distance/data`, data, { headers });
//         console.log(response.data);
//     } catch (error) {
//         handleError(error);
//     }
// };

// let currentIndex = 0;
// const interval2 = setInterval(() => {
//     if (currentIndex < distanceValueArr.length) {
//         const distanceValue = distanceValueArr[currentIndex];
//         sendFakeDistanceData(distanceValue);
//         currentIndex++;
//     } else {
//         clearInterval(interval2); // Dừng lược đồ nếu đã gửi hết mọi phần tử
//     }
// }, 3000);

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
