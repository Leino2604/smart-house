import React, { useState, useEffect, useCallback, useRef } from "react";
import MenuBar from "../components/menu";
import { ScrollView, StatusBar, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "../global";

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
	const [fanEnabled, setFanEnabled] = useState(false);
	const [lightEnabled, setLightEnabled] = useState(false);
	const [temp, setTemp] = useState(0.0);
	const [humidity, setHumidity] = useState(0.0);

	// const [adafruitIOKey, setAdafruitIOKeyState] = useState("aio_izxf20WAfwu9k1oYGMsVL4RGwXGH");
	const [adafruitIOModalVisible, setAdafruitIOModalVisible] = useState(false);

	// const getAdafruitIOKey = async () => {
	// 	try {
	// 		const storedAdafruitIOKey = await AsyncStorage.getItem("adafruitIOKey");
	// 		return storedAdafruitIOKey || "";
	// 	} catch (error) {
	// 		console.error("Error retrieving adafruitIOKey from AsyncStorage:", error);
	// 		return "";
	// 	}
	// };

	const fetchData = async (url, setDataFunction) => {
		let adafruitIOKey = global.AdaFruitIOKey;
		// console.log('Fetch data with key: ',adafruitIOKey);
		try {
			const headers = {
				"X-AIO-Key": adafruitIOKey,
				"Content-Type": "application/json",
			};

			const response = await axios.get(url, { headers });
			setDataFunction(response.data.value);
			console.log(response.data.value);
		} catch (error) {
			console.error("Error fetching device & sensor data:", error);
		}
	};

	// useEffect(() => {
	// 	// Fetch Adafruit IO Key
	// 	const storedAdafruitIOKey = getAdafruitIOKey();
	// 	setAdafruitIOKeyState(storedAdafruitIOKey);
	// }, [adafruitIOModalVisible])

	useEffect(() => {
		const fetchAllData = async () => {
			try {
				// Fetch data initially
				await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data/last", setFanEnabled);
				await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data/last", setLightEnabled);
				await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.temp/data/last", setTemp);
				await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.humid/data/last", setHumidity);

				// Set up interval to fetch data every 3 seconds
				const interval = setInterval(async () => {
					console.log("----------------------------------");
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data/last", setFanEnabled);
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data/last", setLightEnabled);
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.temp/data/last", setTemp);
					await fetchData("https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.humid/data/last", setHumidity);

					console.log(fanEnabled, lightEnabled, temp, humidity);
				}, 3000);

				// Clean up interval on component unmount
				return () => clearInterval(interval);
			} catch (error) {
				console.error("Error in fetchAllData:", error);
			}
		};

		// Call the function that fetches all data
		fetchAllData();
	}, []);

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

	function handleFanEnabledToggleSwitch() {
		setFanEnabled((currState) => !currState);
	}

	function handleLightEnabledToggleSwitch() {
		setLightEnabled((currState) => !currState);
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
									<ToggleSwitch
										value={fanEnabled}
										onValueChange={handleFanEnabledToggleSwitch}
										activeText={"On"}
										inactiveText={"Off"}
										activeTextStyle={fanEnabledToggleSwitchStyle.activeText}
										inactiveTextStyle={fanEnabledToggleSwitchStyle.inactiveText}
										backgroundInactive={"#FFFFFF"}
										backgroundActive={"#90EE90"}
										containerStyle={fanEnabledToggleSwitchStyle.container}
										circleInActiveColor={"#FFFFFF"}
									/>
								</View>
								<Text style={fanStyle.title}>Smart Fan</Text>
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
									<ToggleSwitch
										value={lightEnabled}
										onValueChange={handleLightEnabledToggleSwitch}
										activeText={"On"}
										inactiveText={"Off"}
										activeTextStyle={lightEnabledToggleSwitchStyle.activeText}
										inactiveTextStyle={fanEnabledToggleSwitchStyle.inactiveText}
										backgroundInactive={"#FFFFFF"}
										backgroundActive={"#90EE90"}
										containerStyle={lightEnabledToggleSwitchStyle.container}
										circleInActiveColor={"#FFFFFF"}
									/>
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
});

const initialUser = {
	name: "John",
};

const initialFanEnabled = false;
const initialLightEnabled = false;

export default HomeScreen;
