const axios = require("axios");
const aio_key = global.AdaFruitIOKey;

const BACKEND_API = "https://smart-house-api.onrender.com";

let data = [];
let feedKey = "distance";

const fetchData = async (key) => {
	try {
		const headers = {
			"X-AIO-Key": aio_key,
			"Content-Type": "application/json",
		};

		url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${key.toString()}/data?limit=10`;
		const response = await axios.get(url, { headers });

		data = response.data;
		for (const item of data) {
			// console.log("Item: ", item);
			console.log("Value: ", item["value"]);
			console.log("Time: ", item["created_at"]);
			let date = new Date(item["created_at"]);

			let formattedTime = date.toUTCString(); // "Wed, 13 Dec 2023 02:40:41 GMT"
            console.log(formattedTime);

			formattedTime = formattedTime.split(" ")[4] + " " + formattedTime.split(" ")[2] + " " + formattedTime.split(" ")[1]; // "02:40 Dec 13"
			console.log(formattedTime);
			console.log("----------------------");
		}

		// console.log(data[9].value);
		// console.log(data);
	} catch (error) {
		handleError(error);
	}
};

// useEffect(() => {
// 	// Fetch data initially
// 	fetchData(feedKey);

// 	// Set up interval to fetch data every 3 seconds
// 	const interval = setInterval(() => {
// 		console.log("----------------------------------");
// 		fetchData(feedKey);
// 	}, 5000);

// 	// Clean up interval on component unmount
// 	return () => clearInterval(interval);
// }, []);

fetchData(feedKey);

// let timeString = "2023-12-13T02:40:41Z";

function handleError(error) {
	if (error.response) {
		console.error("Server responded with an error:", error.response.status, error.response.data);
	} else if (error.request) {
		console.error("No response received from the server");
	} else {
		console.error("Error setting up the request:", error.message);
	}
}
