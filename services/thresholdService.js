const axios = require("axios");
const aio_key = "aio_lfox71xTDDwyGl1tHLQXwcoO4pyW";

const BACKEND_API = "https://smart-house-api.onrender.com";
const data = [];
let distanceOld = 0.0;
let distanceNew = 0.0;
let isFirstRun = true; // Add flag to prevent light from false triggering when distanceOld = 0

// --Get threshold data
const fetchThresholdData = async () => {
	try {
		const response = await axios.get(`${BACKEND_API}/thresholds`);
		const thresholds = response.data;
		data.push(thresholds);
		for (const item of data[0]) {
			// console.log(`Date: ${item.date.$numberDecimal}`);
			// console.log(`Open: ${item.open.$numberDecimal}`);
			// console.log("Item: ", item);
			console.log("Id Data: ", item["_id"]);
			console.log("Humid Data: ", item["humid"].$numberDecimal);
			console.log("Temp Data: ", item["temp"].$numberDecimal);
			console.log("-----------");
			// ... access other properties similarly
		}
	} catch (error) {
		handleError(error);
	}
};

// --Get newest distance data
const fetchTempDistanceData = async () => {
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};

		const response = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.distance/data/last`, { headers });
		distanceNew = parseFloat(response.data.value);
	} catch (error) {
		handleError(error);
	}
};

// --Send light data
const sendLightData = async (lightValue) => {
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};

		const data = {
			value: lightValue,
		};

		const response = await axios.post(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data`, data, { headers });
		// console.log(response.data);
	} catch (error) {
		handleError(error);
	}
};

// --Check and trigger light when threshold satisfied
const checkDistanceThresholdReached = async (distanceThreshold) => {
	await fetchTempDistanceData();

	console.log("Distance old:", distanceOld);
	console.log("Distance new:", distanceNew);
	console.log("Distance threshold:", distanceThreshold);
	console.log("----------------------------");

	if (!isFirstRun) {
		if (distanceNew <= distanceThreshold && distanceOld > distanceThreshold) {
			sendLightData(1);
			console.log("light on");
		} else if (distanceNew > distanceThreshold && distanceOld <= distanceThreshold) {
			sendLightData(0);
			console.log("light off");
		}
	}

	// Set distanceOld only after the first run
	if (isFirstRun) {
		distanceOld = distanceNew;
		isFirstRun = false;
	}
};

// --Run functions

fetchThresholdData();
// fetchTempDistanceData();
// checkDistanceThresholdReached(50);

// const interval = setInterval(() => {
//     checkDistanceThresholdReached(50);
// }, 3000);

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
