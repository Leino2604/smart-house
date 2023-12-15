const axios = require("axios");
const aio_key = "aio_igiG69DzU9ILrWqsZ7KWswxdikvb";

const BACKEND_API = "https://smart-house-api.onrender.com";
let data = [];
let temp = 0.0, humid = 0.0, distance = 0.0, presented = false;

// let isFirstRun = true;

// --Get threshold data and run once
const fetchThresholdData = async () => {
	try {
		const response = await axios.get(`${BACKEND_API}/thresholds`);
		const thresholds = response.data;
		data = thresholds;
		// for (const item of data[0]) {
		// 	console.log("Item: ", item);
		// 	console.log("Id Data: ", item["_id"]);
		// 	console.log("Fan Device Key:", item["fanDevice"]);
		// 	console.log("Fan speed: ", item["fanSpeed"]);
		// 	console.log("Light Device Key: ", item["lightDevice"]);
		// 	console.log("Light switch: ", item["lightStatus"]);
		// 	console.log("Temp sensor:", item["tempSensor"]);
		// 	console.log("Temp Data: ", item["temp"].$numberDecimal);
		// 	console.log("Humid sensor:", item["humidSensor"]);
		// 	console.log("Humid Data: ", item["humid"].$numberDecimal);
		// 	console.log("Distance sensor: ", item["distanceSensor"]);
		// 	console.log("Distance Data: ", item["distance"]);
		// 	console.log("-----------");
		// }
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

		const tempResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${tempSensor.toString()}/data/last`, { headers });
		const latestTemp = parseFloat(tempResponse.data.value);

		const humidResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${humidSensor.toString()}/data/last`, { headers });
		const latestHumid = parseFloat(humidResponse.data.value);

		const distanceResponse = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${distanceSensor.toString()}/data/last`, { headers });
		const latestDistance = parseFloat(distanceResponse.data.value);

		// console.log("Latest temp: ", latestTemp);
		// console.log("Latest humid: ", latestHumid);
		// console.log("Latest distance: ", latestDistance);
		// console.log("----------------------");
		return [latestTemp, latestHumid, latestDistance];
	} catch (error) {
		handleError(error);
	}
};

const fetchPIRSensorData = async (pirSensor) => {
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
}


// --Get last active fanspeed
const getLastFanSpeed = async (fanDevice) => {
	if (fanDevice == '') {
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
}

const checkThresholdReached = async () => {
	for (const item of data[0]) {
		[temp, humid, distance] = await fetchEnvironmentSensorData(item["tempSensor"], item["humidSensor"], item["distanceSensor"]);

		let tempThreshold = item["temp"].$numberDecimal;
		let humidThreshold = item["humid"].$numberDecimal;
		let distanceThreshold = item["distance"];

		console.log(temp, humid, distance);

		let revertFanSpeed = 0;
		await getLastFanSpeed(item["fanDevice"]).then(fanSpeed => {
			(fanSpeed === undefined) ? revertFanSpeed = 0 : revertFanSpeed = fanSpeed;
		});
		console.log("init fan speed: ", revertFanSpeed);

		// 	if (distanceNew <= distanceThreshold &&	distanceOld > distanceThreshold) {
		// 		console.log("Threshold passed!");
		// 		sendLightData(item["lightDevice"], item["lightStatus"]);
		// 		sendFanData(item["fanDevice"], item["fanSpeed"]);
		// 	} 
		// 	else if (distanceNew > distanceThreshold && distanceOld <= distanceThreshold) {
		// 		console.log("Threshold passed!");
		// 		sendLightData(item["lightDevice"], !item["lightStatus"]);
		// 		sendFanData(item["fanDevice"], revertFanSpeed);
		// 	}
	}
};

// --Run test functions
(async () => {
	console.log(await fetchThresholdData());
	console.log(await fetchEnvironmentSensorData("temp", "humid", "distance"));
	console.log(await getLastFanSpeed("fan-speed"));
	console.log(await fetchPIRSensorData("pir"));
	await checkThresholdReached();
})();



//Always be the last in code
process.on("SIGINT", () => {
	// clearInterval(interval);
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
