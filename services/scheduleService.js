//Will send data to adafruit feed to trigger when a time occured
const axios = require("axios");
const aio_key = "aio_fClV25jxEPfNzb2KUmpTMtpBthHL";

const BACKEND_API = "https://smart-house-api.onrender.com";
let scheduleData = [];

// --Send light data
const sendLightData = async (lightDevice, lightValue) => {
	if (lightDevice == "") {
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
	if (fanDevice == "") {
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

const fetchScheduleData = async () => {
	try {
		const response = await axios.get(`${BACKEND_API}/schedules`);
		const schedules = response.data;
		scheduleData = schedules;
		// for (const item of scheduleData) {
		// 	console.log("Item: ", item);
		// 	console.log("-----------");
		// }
		return scheduleData;
	} catch (error) {
		handleError(error);
	}
};

// Helper function to get the day of the week
const getDayOfWeek = (dayIndex) => {
	const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	return daysOfWeek[dayIndex];
};

// --Main function here
let interval;
let isCooldown = false;

const triggerSchedule = () => {
	const checkSchedules = async () => {
		if (isCooldown) return;

        await fetchScheduleData();

        if (scheduleData.length == 0) {
            console.log("No schedule");
            return;
        }

		const currentTime = new Date();
		const options = { timeZone: 'Asia/Ho_Chi_Minh', hour12: false };
		console.log("Current Time in GMT+7:", currentTime.toLocaleString('en-US', options));
		// console.log(currentTime.getHours());
		// console.log(currentTime.getMinutes());
		// console.log(currentTime.getDate());
		// console.log(currentTime.getMonth() + 1);
		// console.log(currentTime.getFullYear());
		// console.log("----------------------");

		for (const schedule of scheduleData) {
            if (schedule.notification === false) {
                console.log("Schedule inactive. id: ", schedule._id);
                continue;
            }

			const scheduleTime = new Date(schedule.date);

			// console.log(schedule.hour);
			// console.log(schedule.minute);
			// console.log(scheduleTime.getDate());
			// console.log(scheduleTime.getMonth() + 1);
			// console.log(scheduleTime.getFullYear());
			// console.log("----------------------");

			if (
				currentTime.getHours() === schedule.hour &&
				currentTime.getMinutes() === schedule.minute &&
				currentTime.getDate() === scheduleTime.getDate() &&
				currentTime.getMonth() === scheduleTime.getMonth() &&
				currentTime.getFullYear() === scheduleTime.getFullYear()
				// && schedule.repeat.includes(getDayOfWeek(currentTime.getDay()))   Sẽ quay lại tính
			) {
				console.log("Schedule triggered. Id: ", schedule["_id"]);
                // Start cooldown
				isCooldown = true;
				clearInterval(interval); // Stop the interval
                console.log("Sending data!!");
				await sendFanData(schedule.fanDevice, schedule.fanSpeed);
				await sendLightData(schedule.lightDevice, schedule.lightStatus);
				// Additional actions can be added here if needed

				setTimeout(() => {
					isCooldown = false;
					interval = setInterval(checkSchedules, 1000); // Restart the interval after the cooldown
				}, 60000); // 60 seconds cooldown
			}
		}
	};

	// Call the function once immediately
	checkSchedules();
	interval = setInterval(checkSchedules, 1000);
};



//--Test
// sendFanData("fan-speed", 100);
// sendLightData("light-switch", 0);

// const runScript = async () => {
// 	await fetchScheduleData();
// 	triggerSchedule();
// };

// runScript();

triggerSchedule();

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
