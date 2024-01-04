import React, { useState } from "react";
import { View, ScrollView, Modal, Text, Switch, Slider, TextInput, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const ThresholdModal = () => {
	const [modalVisible, setModalVisible] = useState(true);

	const [threshold, setThreshold] = useState({
		fanDevice: "",
		fanSpeed: 0,
		lightDevice: "",
		lightStatus: false,
		tempSensor: "",
		temp: 0.0,
		humidSensor: "",
		humid: 0.0,
		distaceSensor: "",
		distance: 0,
	});

	const handleThresholdChange = (field, value) => {
		setThreshold({ ...threshold, [field]: value });
	};

	const handleResetThreshold = () => {
		setThreshold({
			fanDevice: "",
			fanSpeed: 0,
			lightDevice: "",
			lightStatus: false,
			tempSensor: "",
			temp: 0.0,
			humidSensor: "",
			humid: 0.0,
			distaceSensor: "",
			distance: 0,
		});
	};

	

	return (
		<Modal
			style={styles.modalView}
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => {
				Alert.alert("Modal has been closed.");
			}}
		>
			{/* <View style={styles.iconView}>
				<Pressable style={styles.closeIcon}>
					<MaterialIcons
						name="close"
						size={24}
						color="black"
						onPress={() => {
							setModalVisible(!modalVisible);
							handleResetThreshold;
						}}
					/>
				</Pressable>
				<Pressable style={styles.saveIcon}>
					<MaterialIcons name="save" size={24} color="black" onPress={setModalVisible(!modalVisible)} />
				</Pressable>
			</View> */}

			{/* <ScrollView style={styles.centeredView}>
				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.fanDevice, value)}
					value={threshold.fanDevice}
					placeholder="Fan Device Name"
				/>
				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.fanSpeed, value)}
					value={threshold.fanSpeed}
					placeholder="Fan Speed (can just accept 0,20,40,60,80,100"
					keyboardType="numeric"
				/>

				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.lightDevice, value)}
					value={threshold.lightDevice}
					placeholder="Light Device Name"
				/>
				<View style={styles.lightStatusElement}>
					<Text style={styles.lightStatusText}>Light Status: </Text>
					<Switch
						style={styles.lightStatusSwitch}
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={threshold.lightStatus ? "#f5dd4b" : "#f4f3f4"}
						ios_backgroundColor="#3e3e3e"
						onValueChange={(value) => handleThresholdChange(threshold.lightStatus, value)}
						value={threshold.lightStatus}
					/>
				</View>

				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.tempSensor, value)}
					value={threshold.tempSensor}
					placeholder="Temp Sensor Name"
				/>
				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.temp, value)}
					value={threshold.temp}
					placeholder="Temp value to trigger"
					keyboardType="numeric"
				/>

				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.humidSensor, value)}
					value={threshold.humidSensor}
					placeholder="Humid Sensor Name"
				/>
				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.humid, value)}
					value={threshold.humid}
					placeholder="Humid value to trigger"
					keyboardType="numeric"
				/>

				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.distaceSensor, value)}
					value={threshold.distaceSensor}
					placeholder="Distance Sensor Name"
				/>
				<TextInput
					style={styles.inputElement}
					onChangeText={(value) => handleThresholdChange(threshold.distancee, value)}
					value={threshold.distance}
					placeholder="Distance value to trigger"
					keyboardType="numeric"
				/>
			</ScrollView> */}
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	iconView: {
		flexDirection: 'row',
		margin: 10,
		padding: 10,
	},
	closeIcon: {
		flex: 1,
	},
	saveIcon: {
		flex: 1,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// marginTop: 22,
		// width: "80%",
		// height: "80%",\
		marginTop: 10,
		marginBottom: 10,
	},

	inputElement: {
		margin: 10,
		padding: 10,
		height: 20,
		backgroundColor: "blue",
		borderRadius: 5,
		borderWidth: 2,
	},
	lightStatusElement: {},
	lightStatusText: {},
	lightStatusSwitch: {},

	// button: {
	// 	borderRadius: 20,
	// 	padding: 10,
	// 	elevation: 2,
	// },
	// buttonOpen: {
	// 	backgroundColor: "#F194FF",
	// },
	// buttonClose: {
	// 	backgroundColor: "#2196F3",
	// },
	// textStyle: {
	// 	color: "white",
	// 	fontWeight: "bold",
	// 	textAlign: "center",
	// },
	// modalText: {
	// 	marginBottom: 15,
	// 	textAlign: "center",
	// },
});

export default ThresholdModal;