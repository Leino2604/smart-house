import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import '../global'

const AdafruitIOModal = ({ isVisible, onClose }) => {
	const [adafruitIOKey, setAdafruitIOKey] = useState("");

	// const handleOk = async () => {
	// 	// Save AdafruitIOKey to AsyncStorage
	// 	try {
	// 		await AsyncStorage.setItem("AdafruitIOKey", adafruitIOKey);
	// 		console.log(adafruitIOKey);
	// 		// Close the modal
	// 		onClose();
	// 	} catch (error) {
	// 		console.error("Error saving AdafruitIOKey to AsyncStorage:", error);
	// 	}
	// };

    const handleOk = async () => {
		try {
            console.log('Before:', global.AdaFruitIOKey)
            global.AdaFruitIOKey = adafruitIOKey;
			console.log('After:', global.AdaFruitIOKey);
			onClose();
		} catch (error) {
			console.error("Error saving AdafruitIOKey", error);
		}
	};

	return (
		<Modal isVisible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
			<View style={styles.modalContainer}>
				<Text style={styles.title}>AdafruitIO Input Key</Text>
				<TextInput style={styles.input} onChangeText={(text) => setAdafruitIOKey(text)} value={adafruitIOKey} />
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={handleOk}>
						<Text style={styles.buttonText}>OK</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button} onPress={onClose}>
						<Text style={styles.buttonText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		elevation: 5, // Add elevation for shadow on Android
        width: "100%",
        zIndex: 2,
        height: 200,
        top: 160
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 10,
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 20,
		width: 200,
		textAlign: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
	},
	button: {
		backgroundColor: "blue",
		padding: 10,
		borderRadius: 5,
		margin: 5,
	},
	buttonText: {
		color: "white",
		textAlign: "center",
	},
});

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     padding: 20,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     width: 200,
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     margin: 5,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//   },
// });

export default AdafruitIOModal;
