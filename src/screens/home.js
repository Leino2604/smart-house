import React, { useState, useEffect, useCallback, useRef } from "react";
import { ScrollView, StatusBar, View, StyleSheet, Text, TouchableOpacity, ToastAndroid, Switch } from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import "../global";
import { useFocusEffect } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

import UserIcon from "../components/userIcon";
import FanIcon from "../components/fanIcon";
import ToggleSwitch from "../components/ToggleSwitch";
import LightBulbIcon from "../components/lightBulbIcon";
import ThermometerIcon from "../components/thermometerIcon";
import HumiditymeterIcon from "../components/humiditymeterIcon";
import AdafruitIOModal from "../components/AdafruitIOModal";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

const HomeScreen = ({ navigation }) => {
	const [user, setUser] = useState(initialUser);
	const [fanSpeed, setFanSpeed] = useState(0);
	const [lightEnabled, setLightEnabled] = useState(false);
	const [temp, setTemp] = useState(0.0);
	const [humidity, setHumidity] = useState(0.0);

	// const [adafruitIOKey, setAdafruitIOKeyState] = useState("aio_izxf20WAfwu9k1oYGMsVL4RGwXGH");
	const [adafruitIOModalVisible, setAdafruitIOModalVisible] = useState(false);

	const fetchData = async (url, setDataFunction) => {
		let adafruitIOKey = global.AdaFruitIOKey;
		// console.log('Fetch data with key: ',adafruitIOKey);
		try {
			const headers = {
				"X-AIO-Key": adafruitIOKey,
				"Content-Type": "application/json",
			};

			const response = await axios.get(url, { headers });

			if (setDataFunction == "setLightEnabled") {
				response.data.value == 1 ? setLightEnabled(true) : setLightEnabled(false);
			} else if (setDataFunction == "setFanSpeed") {
				setFanSpeed(response.data.value);
			} else if (setDataFunction == "setTemp") {
				setTemp(response.data.value);
			} else if (setDataFunction == "setHumidity") {
				setHumidity(response.data.value);
			}

			// console.log(response.data.value);
		} catch (error) {
			console.error("Error fetching device & sensor data:", error);
		}
	};

	// useEffect(() => {
	// 	const fetchDataAndInterval = async () => {
	// 		try {
	// 			// Fetch data initially
	// 			await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data/last", setFanSpeed);
	// 			await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data/last", setLightEnabled);
	// 			await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.temp/data/last", setTemp);
	// 			await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.humid/data/last", setHumidity);

	// 			// Set up interval to fetch data every 3 seconds
	// 			const interval = setInterval(async () => {
	// 				console.log("----------------------------------");
	// 				await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data/last", setFanSpeed);
	// 				await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data/last", setLightEnabled);
	// 				await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.temp/data/last", setTemp);
	// 				await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.humid/data/last", setHumidity);

	// 				console.log(fanSpeed, lightEnabled, temp, humidity);
	// 			}, 3000);

	// 			// Clean up interval on component unmount
	// 			return () => clearInterval(interval);
	// 		} catch (error) {
	// 			console.error("Error in fetchAllData:", error);
	// 		}
	// 	};

	// 	fetchDataAndInterval();
	// }, []);

	useFocusEffect(
		useCallback(() => {
			try {
				async () => {
					// Fetch data initially
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data/last", "setFanSpeed");
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data/last", "setLightEnabled");
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.temp/data/last", "setTemp");
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.humid/data/last", "setHumidity");
				};

				// Set up interval to fetch data every 3 seconds
				const interval = setInterval(async () => {
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data/last", "setFanSpeed");
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data/last", "setLightEnabled");
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.temp/data/last", "setTemp");
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.humid/data/last", "setHumidity");
					console.log("----------------------------------");
					console.log(fanSpeed, lightEnabled, temp, humidity);
				}, 3000);

				// Clean up interval on component unmount
				return () => clearInterval(interval);
			} catch (error) {
				console.error("Error in fetchAllData:", error);
			}
		}, [fanSpeed, lightEnabled, temp, humidity]),
	);

	/* Used to load new fonts */
	const [fontsLoaded, setFontsLoaded] = useFonts({
		"Karla-Regular": require("../assets/fonts/Karla-Regular.ttf"),
	});

	if (!fontsLoaded) {
		return null;
	} else {
		SplashScreen.hideAsync();
	}

	// useEffect(() => {
	// 	async function loadFonts() {
	// 		await SplashScreen.preventAutoHideAsync();
	// 	}
	// 	loadFonts();
	// }, [])

	async function handleFanSpeed(fanValue) {
		setFanSpeed(fanValue);
		try {
			aio_key = global.AdaFruitIOKey;

			const headers = {
				"X-AIO-Key": aio_key,
				"Content-Type": "application/json",
			};
			const data = {
				value: fanValue,
			};
			url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data`;
			const response = await axios.post(url, data, { headers });
			// console.log(response.data);
			console.log(`Change fan device speed to ${fanValue}`);
		} catch (error) {
			ToastAndroid.show("Error changing fan speed", ToastAndroid.SHORT);
			console.error("Error changing fan speed: ", error);
			setFanSpeed(fanSpeed);
		}
	}

	async function handleLightEnabledToggleSwitch(lightValue) {
		// setLightEnabled((currState) => !currState);
		setLightEnabled(lightValue);
		try {
			aio_key = global.AdaFruitIOKey;

			const headers = {
				"X-AIO-Key": aio_key,
				"Content-Type": "application/json",
			};
			const data = {
				value: lightValue ? 1 : 0,
			};
			console.log("Light data:", data);
			url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data`;
			const response = await axios.post(url, data, { headers });
			// console.log(response.data);
			console.log(`Change light switch status to ${lightValue}`);
		} catch (error) {
			ToastAndroid.show("Error changing light switch", ToastAndroid.SHORT);
			console.error("Error changing light switch:", error);
			setLightEnabled(lightEnabled);
		}
	}

	function navigateToScreen(screenName) {
		console.log(screenName);
		navigation.navigate(screenName, {});
	}

	return (
		<View style={homeScreenStyle.container}>
			<LinearGradient style={homeScreenStyle.main} colors={["#004282", "#5899e2"]}>
				<StatusBar barStyle={"light-content"} />
				<View style={userInfoStyle.container}>
					<Text style={userInfoStyle.greetingMsg}>Hi {user.name}</Text>
					<TouchableOpacity style={userInfoStyle.icon} onPress={() => setAdafruitIOModalVisible(!adafruitIOModalVisible)}>
						<UserIcon />
					</TouchableOpacity>
				</View>
				<View style={equipmentInfoStyle.container}>
					<ScrollView>
						<Text style={equipmentInfoStyle.title}>Devices</Text>
						<View style={equipmentInfoStyle.content}>
							<LinearGradient
								style={fanStyle.container}
								colors={["rgb(63, 76, 119)", "rgb(32, 38, 57)"]}
								locations={[0.114, 0.702]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
							>
								<View style={fanStyle.content}>
									<FanIcon />
									<Slider
										style={sliderStyle}
										minimumValue={0}
										maximumValue={100}
										step={20}
										thumbTintColor={"#006A64"}
										value={fanSpeed}
										maximumTrackTintColor={"#ADD8E6"}
										onValueChange={(value) => handleFanSpeed(value)}
									/>
								</View>
								<View style={{display: 'flex', flexDirection: 'row'}}>
									<Text style={fanStyle.title}>Smart Fan</Text>
									<Text style={value.fanSpeed}>{fanSpeed}</Text>
								</View>
							</LinearGradient>
							<LinearGradient
								style={lightStyle.container}
								colors={["rgb(63, 76, 119)", "rgb(32, 38, 57)"]}
								locations={[0.114, 0.702]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
							>
								<View style={lightStyle.content}>
									<LightBulbIcon />
									{/* <ToggleSwitch
										value={lightEnabled}
										onValueChange={(value) => handleLightEnabledToggleSwitch(value)}
										activeText={"On"}
										inactiveText={"Off"}
										activeTextStyle={lightEnabledToggleSwitchStyle.activeText}
										inactiveTextStyle={fanEnabledToggleSwitchStyle.inactiveText}
										backgroundInactive={"#FFFFFF"}
										backgroundActive={"#90EE90"}
										containerStyle={lightEnabledToggleSwitchStyle.container}
										circleInActiveColor={"#FFFFFF"}
									/> */}
									<Switch value={lightEnabled} onValueChange={(value) => handleLightEnabledToggleSwitch(value)} />
								</View>
								<Text style={lightStyle.title}>Smart Light</Text>
							</LinearGradient>

							<LinearGradient
								style={thermometerStyle.container}
								colors={["rgb(63, 76, 119)", "rgb(32, 38, 57)"]}
								locations={[0.114, 0.702]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
							>
								<View style={thermometerStyle.content}>
									<ThermometerIcon />
									<Text style={value.tempValue}>{temp}</Text>
								</View>
								<Text style={fanStyle.title}>Temperature</Text>
							</LinearGradient>

							<LinearGradient
								style={humiditymeterStyle.container}
								colors={["rgb(63, 76, 119)", "rgb(32, 38, 57)"]}
								locations={[0.114, 0.702]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
							>
								<View style={humiditymeterStyle.content}>
									<HumiditymeterIcon />
									<Text style={value.humidityValue}>{humidity}%</Text>
								</View>
								<Text style={humiditymeterStyle.title}>Humidity</Text>
							</LinearGradient>
						</View>
					</ScrollView>
				</View>
				{adafruitIOModalVisible && (
					<View style={styles.modalContainer}>
						<AdafruitIOModal onClose={() => setAdafruitIOModalVisible(!adafruitIOModalVisible)} isVisible={adafruitIOModalVisible} />
					</View>
				)}
			</LinearGradient>
		</View>
	);
};

const sliderStyle = StyleSheet.create({
	width: 200,
	height: 40,
	margin: 10,
});

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 200,
		backgroundColor: "rgba(0,0,0,0.5)",
		zIndex: 2,
	},
});

const homeScreenStyle = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		width: "100%",
		height: "100%",
		fontFamily: "Karla-Regular",
	},
	main: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		paddingBottom: 75, // Add padding at the bottom
	},
});

const userInfoStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: "9.49%",
		marginTop: "9.69%",
	},
	icon: {
		width: 48,
		height: 48,
		marginLeft: "50%",
		borderRadius: 24,
		borderColor: "#000000",
		borderWidth: 1,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
	},
	greetingMsg: {
		fontSize: 24,
		color: "#FFFFFF",
		fontWeight: "bold",
	},
});

const equipmentInfoStyle = StyleSheet.create({
	container: {
		marginTop: "10.62%",
		marginLeft: "9.49%",
		flexDirection: "row",
		height: "90%",
	},
	scrollView: {
		flex: 1,
	},
	title: {
		color: "#E5E5E5",
		fontWeight: "bold",
		fontSize: 24,
	},
	content: {
		display: "flex",
		flexDirection: "column",
		gap: 26,
		marginTop: "6.24%",
	},
});

const fanStyle = StyleSheet.create({
	container: {
		width: "89.74%",
		height: 165, // TODO: use relative unit instead
		borderWidth: 1,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		gap: 21,
	},
	content: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 54, // TODO: relative unit
		marginTop: 33, // TODO: relative unit
	},
	title: {
		color: "#E5E5E5",
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 25,
	},
});

const lightStyle = StyleSheet.create({
	container: {
		width: "89.74%",
		height: 165, // TODO: use relative unit instead
		borderWidth: 1,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		gap: 51,
	},
	content: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 194, // TODO: relative unit
		marginTop: 33, // TODO: relative unit
	},
	title: {
		color: "#E5E5E5",
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 25,
	},
});

const thermometerStyle = StyleSheet.create({
	container: {
		width: "89.74%",
		height: 165, // TODO: use relative unit instead
		borderWidth: 1,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		gap: 51,
	},
	content: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 194, // TODO: relative unit
		marginTop: 33, // TODO: relative unit
	},
	title: {
		color: "#E5E5E5",
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 25,
	},
});

const humiditymeterStyle = StyleSheet.create({
	container: {
		width: "89.74%",
		height: 165, // TODO: use relative unit instead
		borderWidth: 1,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		gap: 51,
	},
	content: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 194, // TODO: relative unit
		marginTop: 33, // TODO: relative unit
	},
	title: {
		color: "#E5E5E5",
		fontSize: 16,
		fontWeight: "bold",
		marginLeft: 25,
	},
});

const fanEnabledToggleSwitchStyle = StyleSheet.create({
	container: {
		borderWidth: 1,
	},
	activeText: {
		color: "#FFFFFF",
	},
	inactiveText: {
		color: "#FF0000",
	},
});

const lightEnabledToggleSwitchStyle = StyleSheet.create({
	container: {
		borderWidth: 1,
	},
	activeText: {
		color: "#FFFFFF",
	},
	inactiveText: {
		color: "#FF0000",
	},
});

const value = StyleSheet.create({
	tempValue: {
		// marginLeft: 'auto',  // Đẩy sang bên phải
		color: "#E5E5E5",
		fontSize: 20, // Tăng kích thước font
	},
	humidityValue: {
		// borderWidth: 1,
		// marginLeft: 'auto',  // Đẩy sang bên phải
		color: "#E5E5E5",
		fontSize: 20,
	},
	fanSpeed: {
		color: "#E5E5E5",
		fontSize: 20,
		marginLeft: 170,
	},
});

const initialUser = {
	name: "John",
};

const initialFanEnabled = false;
const initialLightEnabled = false;

export default HomeScreen;
