import { Text, StyleSheet, View, ScrollView, Pressable, TextInput, Switch, ToastAndroid } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import ThresholdModal from "./editThresholdScreen";
import axios from "axios";
import Slider from "@react-native-community/slider";

const BACKEND_API = "https://smart-house-api.onrender.com";

export default function EditThresholdScreen({ navigation, route }) {
	const { threshold } = route.params; // Lấy threshold từ params nếu có

	// State variables for the inputs and switches
	const [temp, setTemp] = useState(threshold ? threshold.temp.$numberDecimal : 0); // Nếu có threshold thì lấy giá trị từ đó, nếu không thì mặc định là 0
	const [humid, setHumid] = useState(threshold ? threshold.humid.$numberDecimal : 0);
	const [distance, setDistance] = useState(threshold ? threshold.distance : 0);
	const [lightStatusWhenReached, setLightStatusWhenReached] = useState(threshold ? threshold.lightStatusWhenReached : false);
	const [lightStatusOriginal, setLightStatusOriginal] = useState(threshold ? threshold.lightStatusOriginal : false);
	const [fanSpeedWhenReached, setFanSpeedWhenReached] = useState(threshold ? threshold.fanSpeedWhenReached : 0);
	const [fanSpeedOriginal, setFanSpeedOriginal] = useState(threshold ? threshold.fanSpeedOriginal : 0);
	const [presented, setPresented] = useState(threshold ? threshold.presented : true);
	const addFlag = threshold.addFlag;

	// Handlers for the inputs and switches
	const handleTempChange = (value) => {
		setTemp(value);
	};

	const handleHumidChange = (value) => {
		setHumid(value);
	};

	const handleDistanceChange = (value) => {
		setDistance(value);
	};

	const handleLightStatusWhenReachedChange = (value) => {
		setLightStatusWhenReached(value);
	};

	const handleLightStatusOriginalChange = (value) => {
		setLightStatusOriginal(value);
	};

	const handleFanSpeedWhenReachedChange = (value) => {
		setFanSpeedWhenReached(value);
	};

	const handleFanSpeedOriginalChange = (value) => {
		setFanSpeedOriginal(value);
	};

	const handlePresentedChange = (value) => {
		setPresented(value);
	};

	const handleSave = async () => {
		// Tạo một đối tượng threshold mới với các giá trị từ state
		const newThreshold = {
			fanDevice: "fan-speed",
			lightDevice: "light-switch",
			tempSensor: "temp",
			humidSensor: "humid",
			distanceSensor: "distance",
			pirSensor: "pir",
			temp: { $numberDecimal: temp },
			humid: { $numberDecimal: humid },
			distance,
			presented,
			active: true,
			currentState: false,
			lightStatusWhenReached,
			lightStatusOriginal,
			fanSpeedWhenReached,
			fanSpeedOriginal,
		};
		try {
			// Nếu AddFlag là true thì gọi API để thêm mới, nếu không thì gọi API để cập nhật
			if (addFlag == true) {
				await axios.post(`${BACKEND_API}/thresholds`, newThreshold);
				ToastAndroid.show("Threshold added successfully", ToastAndroid.SHORT);
			} else {
				await axios.put(`${BACKEND_API}/thresholds/${threshold._id}`, newThreshold);
				ToastAndroid.show("Threshold updated successfully", ToastAndroid.SHORT);
			}
			// Quay lại màn hình Threshold
			navigation.navigate("Threshold");
		} catch (error) {
			// Hiển thị thông báo lỗi
			ToastAndroid.show("Error saving threshold", ToastAndroid.SHORT);
			console.error("Error saving threshold:", error);
		}
	};

	// Styles for the inputs and switches
	const inputStyle = {
		width: 100,
		height: 40,
		borderColor: "#006A64",
		borderWidth: 1,
		borderRadius: 5,
		margin: 10,
		padding: 5,
		textAlign: "center",
	};

	const switchStyle = {
		transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
		margin: 10,
	};

	const sliderStyle = {
		width: 200,
		height: 40,
		margin: 10,
	};

	const saveButtonStyle = {
		width: 100,
		height: 40,
		backgroundColor: "#006A64",
		borderRadius: 5,
		margin: 10,
		padding: 5,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "flex-end",
	};

	const saveButtonTextStyle = {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	};

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<ScrollView>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>Temp: </Text>
					<TextInput style={inputStyle} keyboardType="numeric" value={temp.toString()} onChangeText={handleTempChange} />
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>Humid: </Text>
					<TextInput style={inputStyle} keyboardType="numeric" value={humid.toString()} onChangeText={handleHumidChange} />
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>Distance: </Text>
					<TextInput style={inputStyle} keyboardType="numeric" value={distance.toString()} onChangeText={handleDistanceChange} />
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>Presented: </Text>
					<Switch style={switchStyle} value={presented} onValueChange={handlePresentedChange} />
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>Light Status When Triggered: </Text>
					<Switch style={switchStyle} value={lightStatusWhenReached} onValueChange={handleLightStatusWhenReachedChange} />
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>Light Status Original: </Text>
					<Switch style={switchStyle} value={lightStatusOriginal} onValueChange={handleLightStatusOriginalChange} />
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>Fan Status When Triggered: </Text>
					<Slider
						style={sliderStyle}
						minimumValue={0}
						maximumValue={100}
						step={20}
						thumbTintColor={"#006A64"}
						value={fanSpeedWhenReached}
						maximumTrackTintColor={"#ADD8E6"}
						onValueChange={handleFanSpeedWhenReachedChange}
					/>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text>Fan Status Original: </Text>
					<Slider
						style={sliderStyle}
						minimumValue={0}
						maximumValue={100}
						step={20}
						thumbTintColor={"#006A64"}
						value={fanSpeedOriginal}
						maximumTrackTintColor={"#ADD8E6"}
						onValueChange={handleFanSpeedOriginalChange}
					/>
				</View>
				<Pressable style={saveButtonStyle} onPress={handleSave}>
					<Text style={saveButtonTextStyle}>Save</Text>
				</Pressable>
			</ScrollView>
		</View>
	);
}

// const ThresholdModal = () => {
// 	const [modalVisible, setModalVisible] = useState(true);

// 	const [threshold, setThreshold] = useState({
// 		fanDevice: "",
// 		fanSpeed: 0,
// 		lightDevice: "",
// 		lightStatus: false,
// 		tempSensor: "",
// 		temp: 0.0,
// 		humidSensor: "",
// 		humid: 0.0,
// 		distaceSensor: "",
// 		distance: 0,
// 	});

// 	const handleThresholdChange = (field, value) => {
// 		setThreshold({ ...threshold, [field]: value });
// 	};

// 	const handleResetThreshold = () => {
// 		setThreshold({
// 			fanDevice: "",
// 			fanSpeed: 0,
// 			lightDevice: "",
// 			lightStatus: false,
// 			tempSensor: "",
// 			temp: 0.0,
// 			humidSensor: "",
// 			humid: 0.0,
// 			distaceSensor: "",
// 			distance: 0,
// 		});
// 	};

// 	return (
// 		<Modal
// 			style={styles.modalView}
// 			animationType="slide"
// 			transparent={true}
// 			visible={modalVisible}
// 			onRequestClose={() => {
// 				Alert.alert("Modal has been closed.");
// 			}}
// 		>
// 			{/* <View style={styles.iconView}>
// 				<Pressable style={styles.closeIcon}>
// 					<MaterialIcons
// 						name="close"
// 						size={24}
// 						color="black"
// 						onPress={() => {
// 							setModalVisible(!modalVisible);
// 							handleResetThreshold;
// 						}}
// 					/>
// 				</Pressable>
// 				<Pressable style={styles.saveIcon}>
// 					<MaterialIcons name="save" size={24} color="black" onPress={setModalVisible(!modalVisible)} />
// 				</Pressable>
// 			</View> */}

// 			{/* <ScrollView style={styles.centeredView}>
// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.fanDevice, value)}
// 					value={threshold.fanDevice}
// 					placeholder="Fan Device Name"
// 				/>
// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.fanSpeed, value)}
// 					value={threshold.fanSpeed}
// 					placeholder="Fan Speed (can just accept 0,20,40,60,80,100"
// 					keyboardType="numeric"
// 				/>

// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.lightDevice, value)}
// 					value={threshold.lightDevice}
// 					placeholder="Light Device Name"
// 				/>
// 				<View style={styles.lightStatusElement}>
// 					<Text style={styles.lightStatusText}>Light Status: </Text>
// 					<Switch
// 						style={styles.lightStatusSwitch}
// 						trackColor={{ false: "#767577", true: "#81b0ff" }}
// 						thumbColor={threshold.lightStatus ? "#f5dd4b" : "#f4f3f4"}
// 						ios_backgroundColor="#3e3e3e"
// 						onValueChange={(value) => handleThresholdChange(threshold.lightStatus, value)}
// 						value={threshold.lightStatus}
// 					/>
// 				</View>

// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.tempSensor, value)}
// 					value={threshold.tempSensor}
// 					placeholder="Temp Sensor Name"
// 				/>
// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.temp, value)}
// 					value={threshold.temp}
// 					placeholder="Temp value to trigger"
// 					keyboardType="numeric"
// 				/>

// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.humidSensor, value)}
// 					value={threshold.humidSensor}
// 					placeholder="Humid Sensor Name"
// 				/>
// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.humid, value)}
// 					value={threshold.humid}
// 					placeholder="Humid value to trigger"
// 					keyboardType="numeric"
// 				/>

// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.distaceSensor, value)}
// 					value={threshold.distaceSensor}
// 					placeholder="Distance Sensor Name"
// 				/>
// 				<TextInput
// 					style={styles.inputElement}
// 					onChangeText={(value) => handleThresholdChange(threshold.distancee, value)}
// 					value={threshold.distance}
// 					placeholder="Distance value to trigger"
// 					keyboardType="numeric"
// 				/>
// 			</ScrollView> */}
// 		</Modal>
// 	);
// };

// const styles = StyleSheet.create({
// 	modalView: {
// 		margin: 20,
// 		backgroundColor: "white",
// 		borderRadius: 20,
// 		padding: 35,
// 		alignItems: "center",
// 		shadowColor: "#000",
// 		shadowOffset: {
// 			width: 0,
// 			height: 2,
// 		},
// 		shadowOpacity: 0.25,
// 		shadowRadius: 4,
// 		elevation: 5,
// 	},
// 	iconView: {
// 		flexDirection: 'row',
// 		margin: 10,
// 		padding: 10,
// 	},
// 	closeIcon: {
// 		flex: 1,
// 	},
// 	saveIcon: {
// 		flex: 1,
// 	},
// 	centeredView: {
// 		flex: 1,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		// marginTop: 22,
// 		// width: "80%",
// 		// height: "80%",\
// 		marginTop: 10,
// 		marginBottom: 10,
// 	},

// 	inputElement: {
// 		margin: 10,
// 		padding: 10,
// 		height: 20,
// 		backgroundColor: "blue",
// 		borderRadius: 5,
// 		borderWidth: 2,
// 	},
// 	lightStatusElement: {},
// 	lightStatusText: {},
// 	lightStatusSwitch: {},

// 	// button: {
// 	// 	borderRadius: 20,
// 	// 	padding: 10,
// 	// 	elevation: 2,
// 	// },
// 	// buttonOpen: {
// 	// 	backgroundColor: "#F194FF",
// 	// },
// 	// buttonClose: {
// 	// 	backgroundColor: "#2196F3",
// 	// },
// 	// textStyle: {
// 	// 	color: "white",
// 	// 	fontWeight: "bold",
// 	// 	textAlign: "center",
// 	// },
// 	// modalText: {
// 	// 	marginBottom: 15,
// 	// 	textAlign: "center",
// 	// },
// });

// export default ThresholdModal;
