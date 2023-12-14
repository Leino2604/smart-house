import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import ThresholdModal from "../components/thresholdModal";
import axios from "axios";

const BACKEND_API = "https://smart-house-api.onrender.com";

// https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/light-switch/data
// https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/fan-speed/data

const ThresholdCard = () => {};

const ThresholdScreen = () => {
	const [data, setData] = useState([]);
	const [distanceOld, setDistanceOld] = useState(0.0);
	const [distanceNew, setDistanceNew] = useState(0.0);

	// Function to fetch data from the API
	const fetchTempDistanceData = async () => {
		try {
			const headers = {
				"X-AIO-Key": "aio_NJsU20FtltbbgXxgqiTSCIBjmEpT",
				"Content-Type": "application/json",
			};

			const response = await axios.get(`https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.distance`, { headers });
			setDistanceNew(response.data.value);
			console.log(response.data.value);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const fetchThresholdData = async () => {
		try {
			const response = await axios.get(`${BACKEND_API}/thresholds`);
			const thresholds = response.data;
			setData(thresholds);
			console.log(data);
		} catch (error) {
			if (error.response) {
				console.error("Server responded with an error:", error.response.status, error.response.data);
			} else if (error.request) {
				console.error("No response received from the server");
			} else {
				console.error("Error setting up the request:", error.message);
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetchTempDistanceData();
			setDistanceOld(distanceNew); // Update distanceOld with the previous value of distanceNew
			fetchThresholdData();
		};

		fetchData(); // Initial fetch

		const interval = setInterval(fetchData, 3000);

		// Clean up interval on component unmount
		return () => clearInterval(interval);
	}, [distanceNew]); // Re-run the effect when distanceNew changes

	return (
		// <View style={style.main}>
		// 	<View style={style.head}>
		// 		<Text style={style.head.title}>Thresholds</Text>
		// 		<Pressable style={style.head.addButtonContainer}>
		// 			<Text style={style.head.addButtonContainer.buttonLabel}>Add</Text>
		// 		</Pressable>
		// 	</View>
		// 	<ScrollView>
		// 		{data &&
		// 			data.map((item) => {
		// 				console.log(item);
		// 				if (data[0] == undefined || data == undefined) return <Text>No threshold set</Text>;
		// 				else {
		// 					//
		// 				}
		// 			})}
		// 	</ScrollView>
		// 	<View>
		// 		<Text>SIUUU</Text>
		// 	</View>
		// </View>
	);
};

const style = StyleSheet.create({
	// container: {
	// 	backgroundColor: "#246EE9",
	// 	width: "100%",
	// 	height: "100%",
	// 	gap: 39,
	// },
	main: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "89.22%",
		backgroundColor: "#246EE9",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		paddingBottom: 75, // Add padding at the bottom
	},
	head: {
		display: "flex",
		flexDirection: "row",
		title: {
			flex: 2 / 3,
			margin: 15,
			fontSize: 25,
			color: "#fff",
		},
		addButtonContainer: {
			flex: 1 / 3,
			width: 30,
			height: 30,
			margin: 15,
			fontSize: 20,
			alignItems: "center",
			justifyContent: "center",
			padding: 3,
			button: {
				borderRadius: 10,
				width: "100%",
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "row",
			},
			buttonIcon: {
				paddingRight: 8,
			},
			buttonLabel: {
				color: "#fff",
				fontSize: 16,
			},
		},
	},

	// buttonContainer: {
	// 	width: 320,
	// 	height: 68,
	// 	marginHorizontal: 20,
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	padding: 3,
	// },
	// button: {
	// 	borderRadius: 10,
	// 	width: "100%",
	// 	height: "100%",
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	flexDirection: "row",
	// },
	// buttonIcon: {
	// 	paddingRight: 8,
	// },
	// buttonLabel: {
	// 	color: "#fff",
	// 	fontSize: 16,
	// },
});

export default ThresholdScreen;
