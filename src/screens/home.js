import React, { useState, useEffect } from "react";
import MenuBar from "../components/menu";
import {
	ScrollView,
	StatusBar,
	View,
	StyleSheet,
	Text,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";


import UserIcon from "../components/userIcon";
import FanIcon from "../components/fanIcon";
import ToggleSwitch from "../components/ToggleSwitch";
import LightBulbIcon from "../components/lightBulbIcon";
import ThermometerIcon from "../components/thermometerIcon";
import HumiditymeterIcon from "../components/humiditymeterIcon";


const HomeScreen = () => {
	const [user, setUser] = useState(initialUser);
	const [fanEnabled, setFanEnabled] = useState(false);
	const [lightEnabled, setLightEnabled] = useState(false);
	const [temp, setTemp] = useState(20.0);
	const [humidity, setHumidity] = useState(70.0);

	/* Used to load new fonts */
	const [fontsLoaded, fontsError] = useFonts({
		"Karla-Regular": require("../assets/fonts/Karla-Regular.ttf")
	});

	if (!fontsLoaded) {
		return null;
	}

	// Function to fetch data from the API
	const fetchData = async (url, setDataFunction) => {
		try {
			const headers = {
				"X-AIO-Key": "aio_TUVE91jHx4brvdbZ36a9P82TnYTV",
				"Content-Type": "application/json",
			};

			const response = await axios.get(url, { headers });
			setDataFunction(response.data.value);

			console.log(response.data.value)
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	// Effect to fetch data initially and update every 3 seconds
	useEffect(() => {
		// Fetch data initially
		fetchData(
			"https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data/last",
			setFanEnabled,
		);
		fetchData(
			"https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data/last",
			setLightEnabled,
		);
		fetchData(
			"https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.temp/data/last",
			setTemp,
		);
		fetchData(
			"https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.humid/data/last",
			setHumidity,
		);

		// Set up interval to fetch data every 3 seconds
		const interval = setInterval(() => {
			fetchData(
				"https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.fan-speed/data/last",
				setFanEnabled,
			);
			fetchData(
				"https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.light-switch/data/last",
				setLightEnabled,
			);
			fetchData(
				"https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.temp/data/last",
				setTemp,
			);
			fetchData(
				"https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.humid/data/last",
				setHumidity,
			);
		}, 3000);

		// Clean up interval on component unmount
		return () => clearInterval(interval);
	}, []); // Empty dependency array means this effect runs once after the initial render

	function handleFanEnabledToggleSwitch() {
		setFanEnabled((currState) => !currState);
	}

	function handleLightEnabledToggleSwitch() {
		setLightEnabled((currState) => !currState);
	}

	return (
		<View style={homeScreenStyle.container}>
			<LinearGradient 
				style={homeScreenStyle.main}
				colors={["#004282", "#5899e2"]}
			>
				<StatusBar 
					barStyle={"light-content"}
				/>
				<View style={userInfoStyle.container}>
					<Text style={userInfoStyle.greetingMsg}>
						Hi {user.name}
					</Text>
					<View style={userInfoStyle.icon}>
						<UserIcon />
					</View>
				</View>
				<View style={equipmentInfoStyle.container}>
					<ScrollView>
						<Text style={equipmentInfoStyle.title}>Devices</Text>
						<View style={equipmentInfoStyle.content}>
							<LinearGradient 
								style={fanStyle.container}
								colors={["rgb(63, 76, 119)", "rgb(32, 38, 57)"]}
								locations={[0.114, 0.702]}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}
							>
								<View style={fanStyle.content}>
									<FanIcon />
									<ToggleSwitch
										value={fanEnabled}
										onValueChange={
											handleFanEnabledToggleSwitch
										}
										activeText={"On"}
										inactiveText={"Off"}
										activeTextStyle={
											fanEnabledToggleSwitchStyle.activeText
										}
										inactiveTextStyle={
											fanEnabledToggleSwitchStyle.inactiveText
										}
										backgroundInactive={"#FFFFFF"}
										backgroundActive={"#90EE90"}
										containerStyle={
											fanEnabledToggleSwitchStyle.container
										}
										circleInActiveColor={"#FFFFFF"}
									/>
								</View>
								<Text style={fanStyle.title}>Smart Fan</Text>
							</LinearGradient>
							<LinearGradient 
								style={lightStyle.container}
								colors={["rgb(63, 76, 119)", "rgb(32, 38, 57)"]}
								locations={[0.114, 0.702]}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}
							>
								<View style={lightStyle.content}>
									<LightBulbIcon />
									<ToggleSwitch
										value={lightEnabled}
										onValueChange={
											handleLightEnabledToggleSwitch
										}
										activeText={"On"}
										inactiveText={"Off"}
										activeTextStyle={
											lightEnabledToggleSwitchStyle.activeText
										}
										inactiveTextStyle={
											fanEnabledToggleSwitchStyle.inactiveText
										}
										backgroundInactive={"#FFFFFF"}
										backgroundActive={"#90EE90"}
										containerStyle={
											lightEnabledToggleSwitchStyle.container
										}
										circleInActiveColor={"#FFFFFF"}
									/>
								</View>
								<Text style={lightStyle.title}>
									Smart Light
								</Text>
							</LinearGradient>

							<LinearGradient 
								style={lightStyle.container}
								colors={["rgb(63, 76, 119)", "rgb(32, 38, 57)"]}
								locations={[0.114, 0.702]}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}
							>
								<View style={lightStyle.content}>
									<ThermometerIcon />
                                    <Text style={value.tempValue}>{temp}</Text>
								</View>
								<Text style={fanStyle.title}>Temperature</Text>
							</LinearGradient>
                            
							<LinearGradient 
								style={lightStyle.container}
								colors={["rgb(63, 76, 119)", "rgb(32, 38, 57)"]}
								locations={[0.114, 0.702]}
								start={{x: 0, y: 0}}
								end={{x: 1, y: 0}}
							>
								<View style={lightStyle.content}>
									<HumiditymeterIcon />
                                    <Text style={value.humidityValue}>{humidity}%</Text>
								</View>
								<Text style={fanStyle.title}>Humidity</Text>
							</LinearGradient>
						</View>
					</ScrollView>
				</View>
			</LinearGradient>
			<MenuBar />
		</View>
	);
};

const homeScreenStyle = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		width: "100%",
		height: "100%",
		gap: 39,
		fontFamily: "Karla-Regular"
	},
	main: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "89.22%",
		backgroundColor: "#246EE9",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
        paddingBottom: 75,  // Add padding at the bottom
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
        flexDirection: 'row',
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
        fontSize: 20,  // Tăng kích thước font
    },
    humidityValue: {
        // borderWidth: 1,
        // marginLeft: 'auto',  // Đẩy sang bên phải
		color: "#E5E5E5",
        fontSize: 20,
    },
})

const initialUser = {
	name: "John",
};

const initialFanEnabled = false;
const initialLightEnabled = false;

export default HomeScreen;
