import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StatusBar,
	StyleSheet,
	Image,
	FlatList,
	ScrollView,
    TouchableOpacity,
	Switch,
} from "react-native";
import ToggleSwitch from "../components/ToggleSwitch";
import NewIcon from "../components/newIcon";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

const BACKEND_API = "https://smart-house-api.onrender.com";
const DEFAULT_SCHEDULE_LIST = [
	{
		_id: "6579c1eea11efb927b9c74b0",
		hour: 13,
		minute: 8,
		date: new Date(),
		fanDevice: "fan-speed",
		lightDevice: "light-switch",
		fanSpeed: 20,
		lightStatus: true,
		notification: true,
		__v: 0
	}
];
const DEFAULT_NEW_SCHEDULE = {
	hour: new Date().getHours(),
	minute: new Date().getMinutes(),
	date: new Date(),
	notification: true,
	fanDevice: "fan-spped",
	lightDevice: "light-switch",
	notification: false,
	lightStatus: true,
	fanSpeed: 20
}

const ScheduleScreen = ({navigation}) => {
	const [scheduleList, setScheduleList] = useState([]);

	useEffect(() => {
		axios.get(`${BACKEND_API}/schedules`)
			.then((response) => {
				const newScheduleList = response.data.map((schedule) => {
					return {
						...schedule,
						date: Date.parse(schedule.date)
					}
				})
				setScheduleList(newScheduleList);
			})
			.catch((error) => {
				console.log(error)
			})
	}, [scheduleList])

	function getHourIn24Hours(hour) {
		return hour >= 10 ? hour.toString() : "0" + hour.toString();
	}

	function getMinute(minute) {
		return minute >= 10 ? minute.toString() : "0" + minute.toString();
	}

	function handleScheduleItemToggleSwitch(scheduleItem) {
		axios.put(`${BACKEND_API}/schedules/${scheduleItem._id}`, {
			notification: !scheduleItem.notification
		}).then((response) => {
			const newScheduleList = scheduleList.map((item) => {
				if (item._id === response.data._id) {
					return ({
						...item,
						notification: response.data.notification
					})
				} else {
					return item;
				}
			})
			setScheduleList(newScheduleList)
		}).catch((error) => {
			console.log(error)
		});
	}

	function pressNewIcon(e) {
		navigation.navigate("Edit schedule", {
			schedule: DEFAULT_NEW_SCHEDULE,
			created: true,
			onSave: saveSchedule
		});
	}

	function saveSchedule(savedSchedule, created) {
		function createNewSchedule(savedSchedule) {
			axios.post(`${BACKEND_API}/schedules`, {
				hour: savedSchedule.hour,
				minute: savedSchedule.minute,
				date: savedSchedule.date,
				fanDevice: "fan-speed",
				lightDevice: "light-switch",
				fanSpeed: savedSchedule.fanSpeed,
				lightStatus: savedSchedule.lightStatus,
				notification: savedSchedule.notification
			}).then((response) => {
				const newScheduleList = [...scheduleList, savedSchedule];
				setScheduleList(newScheduleList);
			}).catch((error) => {
				console.log(error)
			});
		}

		function modifySchedule(savedSchedule) {
			console.log(savedSchedule.date)
			console.log(typeof savedSchedule.date)
			axios.put(`${BACKEND_API}/schedules/${savedSchedule._id}`, {
				hour: savedSchedule.hour,
				minute: savedSchedule.minute,
				date: savedSchedule.date,
				fanDevice: "fan-speed",
				lightDevice: "light-switch",
				fanSpeed: savedSchedule.fanSpeed,
				lightStatus: savedSchedule.lightStatus,
				notification: savedSchedule.notification
			}).then((response) => {
				const newScheduleList = scheduleList.map((item) => {
					if (item._id === savedSchedule._id) { 
						return savedSchedule;
					} else {
						return item;
					}
				});
				setScheduleList(newScheduleList);
			}).catch((error) => {
				console.log(error);
			})
		}
		if (created) {
			createNewSchedule(savedSchedule);
		} else {
			modifySchedule(savedSchedule);
		}
	}

	function pressScheduleItem(scheduleItem) {
		navigation.navigate("Edit schedule", {
			schedule: {
				hour: scheduleItem.hour,
				minute: scheduleItem.minute,
				date: new Date(scheduleItem.date),
				notification: true,
				fanDevice: "fan-spped",
				lightDevice: "light-switch",
				notification: scheduleItem.notification,
				lightStatus: scheduleItem.lightStatus,
				fanSpeed: scheduleItem.fanSpeed,
				repeat: ["Mon", "Wed", "Sat", "Sun"]
			},
			created: false,
			onSave: saveSchedule
		});
	}

	return (
		<View style={scheduleScreenStyle.container}>
			<LinearGradient 
				style={scheduleScreenStyle.schedule}
				colors={["#004282", "#5899e2"]}
			>
				<StatusBar 
					barStyle={"light-content"}
				/>
				<View style={scheduleScreenStyle.title}>
					<Text style={scheduleScreenStyle.titleText}>
						Your schedule
					</Text>
					<TouchableOpacity
						style={scheduleScreenStyle.newIcon}
						onPress={(e) => pressNewIcon(e)}
					>
						<NewIcon />
					</TouchableOpacity>
				</View>
				<View style={scrollViewStyle.container}>
					<ScrollView 
						style={scheduleStyle.container}
						contentContainerStyle={scheduleStyle.contenContainer}
					>
						{scheduleList.map((scheduleItem, idx) => {
							const hour = getHourIn24Hours(scheduleItem.hour);
							const minute = getMinute(scheduleItem.minute);
							return (
								<TouchableOpacity
									onPress={(e) => pressScheduleItem(scheduleItem)}
									key={idx}
								>
									<LinearGradient 
										style={scheduleItemStyle.container} key={idx}
										colors={["rgb(63, 76, 119)","rgb(32, 38, 57)"]}
										locations={[0.114, 0.702]}
										start={{x: 0, y: 0}}
										end={{x: 1, y: 0}}
									>
										<View style={scheduleItemStyle.equipmentInfo}>
											<Text style={scheduleItemStyle.timeText}>
												{hour}:{minute}
											</Text>
											<Text
												style={scheduleItemStyle.equipmentText}
											>
												Light{" "}
												{scheduleItem.lightStatus ? "ON" : "OFF"},
												Fan {idx}
											</Text>
										</View>

										<ToggleSwitch
											value={scheduleItem.notification}
											onValueChange={() =>
												handleScheduleItemToggleSwitch(scheduleItem)
											}
											activeText={"On"}
											inActiveText={"Off"}
											backgroundInactive={"#FCF5E5"}
											backgroundActive={"#90EE90"}
											inactiveTextStyle={
												scheduleItemToggleSwitchStyle.inactiveText
											}
											activeTextStyle={
												scheduleItemToggleSwitchStyle.activeText
											}
											switchHeight={30}
											switchWidth={30}
											containerStyle={
												scheduleItemToggleSwitchStyle.container
											}
										/>
									</LinearGradient>
								</TouchableOpacity>
							);
						})}
					</ScrollView>
				</View>
				
			</LinearGradient>
		</View>
	);
};

const scheduleScreenStyle = StyleSheet.create({
	container: {
		backgroundColor: "#FFFFFF",
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
	},
	schedule: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	newIcon: {
		marginRight: "10%"
	},
	title: {
		marginTop: "8.90%",
		marginLeft: "10%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between"
		
	},
	titleText: {
		fontSize: 25,
		color: "#E5E5E5",
		fontWeight: "bold",
	}
});

const scrollViewStyle = StyleSheet.create({
	container: {
		height: "87.5%"
	}
});

const scheduleStyle = StyleSheet.create({
	container: {
		marginTop: "7.87%",
	},
	contenContainer: {
		rowGap: 20,
	}
});

const scheduleItemStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		width: "80%",
		height: 120,
		alignItems: "center",
		gap: 87,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#000000",
		marginLeft: "10%",
	},
	timeText: {
		color: "#E5E5E5",
		fontSize: 45,
	},
	equipmentText: {
		color: "#E5E5E5",
		fontSize: 20,
	},
	dateText: {},
	equipmentInfo: {
		marginLeft: "5%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "flex-start"
	},
});

const scheduleItemToggleSwitchStyle = StyleSheet.create({
	container: {
		width: "23.08%",
		height: "5.05%",
	},
	activeText: {
		color: "#90EE90",
	},
	inactiveText: {
		color: "#FFFFFF",
	},
});

export default ScheduleScreen;
