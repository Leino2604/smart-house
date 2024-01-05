import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Switch, ToastAndroid, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const BACKEND_API = "https://smart-house-api.onrender.com";

const ThresholdScreen = ({ navigation }) => {
	const [thresholds, setThresholds] = useState([]);
	// const [dialogVisible, setDialogVisible] = useState(false);

	const handleAdd = () => {
		navigation.navigate("Edit Threshold", {
			threshold: {
				fanDevice: "fan-speed",
				lightDevice: "light-switch",
				tempSensor: "temp",
				humidSensor: "humid",
				distanceSensor: "distance",
				pirSensor: "pir",
				temp: { $numberDecimal: 0 },
				humid: { $numberDecimal: 0 },
				distance: 0,
				presented: false,
				active: true,
				currentState: false,
				lightStatusWhenReached: false,
				lightStatusOriginal: false,
				fanSpeedWhenReached: 0,
				fanSpeedOriginal: 0,
                addFlag: true,
			},
		});
	};

	const handleChange = (item) => {
        navigation.navigate("Edit Threshold", { threshold: { ...item, addFlag: false } });
    };
      

	// Hàm để xóa một threshold khỏi API và cập nhật state
	const handleDelete = (item) => {
		// Hiển thị dialog xác nhận xóa
		Alert.alert(
			"Delete threshold",
			"Are you sure you want to delete this threshold?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "OK",
					onPress: async () => {
						try {
							await axios.delete(`${BACKEND_API}/thresholds/${item._id}`);
							setThresholds(thresholds.filter((t) => t._id !== item._id));
							ToastAndroid.show("Threshold deleted successfully", ToastAndroid.SHORT);
						} catch (error) {
							ToastAndroid.show("Error deleting threshold", ToastAndroid.SHORT);
							console.error("Error deleting threshold:", error);
						}
					},
				},
			],
			{ cancelable: false },
		);
	};

	// Hàm để bật/tắt một threshold trên API và cập nhật state
	const toggleThreshold = (item) => {
		// Đảo giá trị active của threshold
		const newActive = !item.active;
		const newThreshold = { ...item, active: newActive };
		// Tạo một mảng thresholds mới với threshold được thay đổi
		const newThresholds = thresholds.map((t) => (t._id === item._id ? newThreshold : t));
		setThresholds(newThresholds);
		axios
			.put(`${BACKEND_API}/thresholds/${item._id}`, newThreshold)
			.then((response) => {
				ToastAndroid.show(`Threshold ${newActive ? "activated" : "deactivated"} successfully`, ToastAndroid.SHORT);
			})
			.catch((error) => {
				ToastAndroid.show("Error updating threshold", ToastAndroid.SHORT);
				console.error("Error updating threshold:", error);
				setThresholds(thresholds);
			});
	};

	// Hàm để lấy danh sách thresholds từ API khi component được mount
	useEffect(() => {
		const fetchThresholdData = async () => {
			try {
				const response = await axios.get(`${BACKEND_API}/thresholds`);
				const thresholdsList = response.data;
				// console.log(thresholdsList);
				setThresholds(thresholdsList);
				return thresholdsList;
			} catch (error) {
				console.error("Error fetching thresholds:", error);
			}
		};

		fetchThresholdData();
	}, [thresholds]); //thresholds

	const renderThresholdItem = ({ item }) => (
		<TouchableOpacity style={styles.card} key={item._id} onPress={() => handleChange(item)} onLongPress={() => handleDelete(item)}>
			<View style={styles.leftContent}>
				<Text>Temp: {item.temp.$numberDecimal}</Text>
				<Text>Humid: {item.humid.$numberDecimal}</Text>
				<Text>Distance: {item.distance}</Text>
				<Text>Presented: {item.presented ? "Present" : "Not Present"}</Text>
				<Text>
					Light: {item.lightStatusWhenReached ? "On" : "Off"} | {item.lightStatusOriginal ? "On" : "Off"}
				</Text>
				<Text>
					Fan: {item.fanSpeedWhenReached} | {item.fanSpeedOriginal}
				</Text>
			</View>
			<View style={styles.separator}></View>
			<View style={styles.rightContent}>
				<Switch value={item.active} onValueChange={() => toggleThreshold(item)} />
				{/* <TouchableOpacity>
					<Ionicons name="ios-create" size={20} color="black" />
				</TouchableOpacity>
				<TouchableOpacity> 
					<Ionicons name="ios-trash" size={20} color="black" />
				</TouchableOpacity> */}
			</View>
		</TouchableOpacity>
	);

	return (
		<View>
			<TouchableOpacity style={styles.addButton} onPress={() => handleAdd()}>
				<Text>Add new threshold</Text>
			</TouchableOpacity>
			<ScrollView>
				{thresholds.length > 0 ? (
					<FlatList data={thresholds} renderItem={renderThresholdItem} keyExtractor={(item) => item._id} />
				) : (
					<Text>No threshold</Text>
				)}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	addButton: {
		alignItems: "center",
		padding: 10,
		backgroundColor: "lightblue",
	},
	card: {
		flexDirection: "row",
		margin: 10,
		padding: 15,
		borderRadius: 8,
		backgroundColor: "white",
	},
	leftContent: {
		flex: 3,
	},
	separator: {
		width: 1,
		backgroundColor: "blue",
	},
	rightContent: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ThresholdScreen;

// import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import React, { useState, useEffect } from "react";
// import ThresholdModal from "./editThresholdScreen";
// import axios from "axios";

// export default function ThresholdScreen({ navigation }) {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text
//                 onPress={() => navigation.navigate('Edit Threshold')}
//                 style={{ fontSize: 26, fontWeight: 'bold' }}>Threshold Screen</Text>
//         </View>
//     );
// }

// const ThresholdCard = () => {};

// const ThresholdScreen = () => {
// 	const [data, setData] = useState([]);

// 	// Function to fetch data from the API
// 	const fetchThresholdData = async () => {
// 		try {
// 			const response = await axios.get(`${BACKEND_API}/thresholds`);
// 			const thresholds = response.data;
// 			setData(thresholds);
// 			console.log(data);
// 		} catch (error) {
// 			if (error.response) {
// 				console.error("Server responded with an error:", error.response.status, error.response.data);
// 			} else if (error.request) {
// 				console.error("No response received from the server");
// 			} else {
// 				console.error("Error setting up the request:", error.message);
// 			}
// 		}
// 	};

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			fetchThresholdData();
// 		};

// 		fetchData(); // Initial fetch

// 		const interval = setInterval(fetchData, 3000);

// 		// Clean up interval on component unmount
// 		return () => clearInterval(interval);
// 	}, []);

// 	return (
// 		<View style={style.main}>
// 			<View style={style.head}>
// 				<Text style={style.head.title}>Thresholds</Text>
// 				<Pressable style={style.head.addButtonContainer}>
// 					<Text style={style.head.addButtonContainer.buttonLabel}>Add</Text>
// 				</Pressable>
// 			</View>
// 			<ScrollView>
// 				{data &&
// 					data.map((item) => {
// 						console.log(item);
// 						if (data[0] == undefined || data == undefined) return <Text>No threshold set</Text>;
// 						else {
// 							//
// 						}
// 					})}
// 			</ScrollView>
// 			<View>
// 				<Text>SIUUU</Text>
// 			</View>
// 		</View>
// 	);
// };

// const style = StyleSheet.create({
// 	// container: {
// 	// 	backgroundColor: "#246EE9",
// 	// 	width: "100%",
// 	// 	height: "100%",
// 	// 	gap: 39,
// 	// },
// 	main: {
// 		display: "flex",
// 		flexDirection: "column",
// 		width: "100%",
// 		height: "89.22%",
// 		backgroundColor: "#246EE9",
// 		borderBottomLeftRadius: 20,
// 		borderBottomRightRadius: 20,
// 		paddingBottom: 75, // Add padding at the bottom
// 	},
// 	head: {
// 		display: "flex",
// 		flexDirection: "row",
// 		title: {
// 			flex: 2 / 3,
// 			margin: 15,
// 			fontSize: 25,
// 			color: "#fff",
// 		},
// 		addButtonContainer: {
// 			flex: 1 / 3,
// 			width: 30,
// 			height: 30,
// 			margin: 15,
// 			fontSize: 20,
// 			alignItems: "center",
// 			justifyContent: "center",
// 			padding: 3,
// 			button: {
// 				borderRadius: 10,
// 				width: "100%",
// 				height: "100%",
// 				alignItems: "center",
// 				justifyContent: "center",
// 				flexDirection: "row",
// 			},
// 			buttonIcon: {
// 				paddingRight: 8,
// 			},
// 			buttonLabel: {
// 				color: "#fff",
// 				fontSize: 16,
// 			},
// 		},
// 	},

// 	// buttonContainer: {
// 	// 	width: 320,
// 	// 	height: 68,
// 	// 	marginHorizontal: 20,
// 	// 	alignItems: "center",
// 	// 	justifyContent: "center",
// 	// 	padding: 3,
// 	// },
// 	// button: {
// 	// 	borderRadius: 10,
// 	// 	width: "100%",
// 	// 	height: "100%",
// 	// 	alignItems: "center",
// 	// 	justifyContent: "center",
// 	// 	flexDirection: "row",
// 	// },
// 	// buttonIcon: {
// 	// 	paddingRight: 8,
// 	// },
// 	// buttonLabel: {
// 	// 	color: "#fff",
// 	// 	fontSize: 16,
// 	// },
// });

// export default ThresholdScreen;
