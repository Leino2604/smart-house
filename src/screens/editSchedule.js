import React, { useState, useRef, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	StatusBar,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import ToggleSwitch from "../components/ToggleSwitch";
import {useFonts} from "expo-font";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import WheelPicker from "react-native-wheely";


import FanIcon from "../components/fanIcon";
import LightBulbIcon from "../components/lightBulbIcon";
import CalendarIcon from "../components/calendarIcon";
import axios from "axios";

const BACKEND_API = "https://smart-house-api.onrender.com";
const HOURS = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];
const MINUTES = [
	"00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
	"12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
	"24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35",
	"36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47",
	"48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
];
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const EditScheduleScreen = ({navigation, route}) => {
	const {onSave, year, month, day, hour, minute, lightDevice, fanDevice, lightStatus, fanSpeed, notification, id} = route.params
	
	const [currSchedule, setCurrSchedule] = useState({
		hour: hour,
		minute: minute,
		date: new Date(year, month, day),
		notification: notification,
		fanDevice: fanDevice,
		lightDevice: lightDevice,
		lightStatus: lightStatus,
		fanSpeed: fanSpeed
	});
	const [calendarVisible, setCalendarVisible] = useState(false);
	
	function toggleSmartLightSwitch() {
		const newSchedule = {
			...currSchedule,
			lightStatus: !currSchedule.lightStatus
		};
		setCurrSchedule(newSchedule);
	}

	function toggleNotificationEnabledSwitch() {
		const newSchedule = {
			...currSchedule,
			notification: !currSchedule.notification
		};
		setCurrSchedule(newSchedule);
	}

	function pressCalendarIcon() {
		setCalendarVisible((prevState) => !prevState);
	}

	function handleDateConfirmation(datetime) {
		const newSchedule = {
			...currSchedule,
			date: datetime
		};
		setCurrSchedule(newSchedule);
	}

	function hideCalendarPicker() {
		setCalendarVisible(false);
	}

	function scrollHour(hour) {
		const newSchedule = {
			...currSchedule,
			hour: hour
		};
		setCurrSchedule(newSchedule);
	}

	function scrollMinute(minute) {
		const newSchedule = {
			...currSchedule,
			minute: minute
		};
		setCurrSchedule(newSchedule)
	}

	function pressCancelButton() {
		navigation.navigate("Schedule", {});
	}

	function changeFanSpeedValue(value) {
		const newSchedule = {
			...currSchedule,
			fanSpeed: value
		};
		setCurrSchedule(newSchedule);
	}

	function pressSaveButton(schedule, id) {
		onSave(schedule, id);
		navigation.navigate("Schedule", {});
	}


	return (
		<View 
			style={editScheduleScreenViewStyle.container}
		>
			<LinearGradient 
				style={editScheduleViewStyle.container}
				colors={["#004282", "#5899e2"]}
			>
				<StatusBar 
					barStyle={"light-content"}
				/>

				<View
					style={timePickerStyle.container}
				>
					<WheelPicker 
						options={HOURS}
						selectedIndex={currSchedule.hour}
						onChange={(hour) => scrollHour(hour)}
						containerStyle={timePickerStyle.itemContainer}
						itemTextStyle={timePickerStyle.text}
						visibleRest={1}
						itemHeight={60}
						decelerationRate={"normal"}
						itemStyle={timePickerStyle.item}
					/>

					<WheelPicker 
						options={MINUTES}
						selectedIndex={currSchedule.minute}
						onChange={(minute) => scrollMinute(minute)}
						containerStyle={timePickerStyle.itemContainer}
						itemTextStyle={timePickerStyle.text}
						visibleRest={1}
						itemHeight={60}
						decelerationRate={"normal"}
						itemStyle={timePickerStyle.item}
					/>
				</View>
				
				
				<View style={calendarViewStyle.container}>
					<View style={daySelectionViewStyle.container}>
						<Text style={dayTextStyle.container}>
							{WEEKDAYS[currSchedule.date.getDay()]}, {MONTHS[currSchedule.date.getMonth()]} {currSchedule.date.getDate()}
						</Text>
						<DateTimePickerModal
							mode="date"
							display="calendar"
							is24Hour={true}
							isDarkModeEnabled={true}
							isVisible={calendarVisible}
							onConfirm={(datetime) => handleDateConfirmation(datetime)}
							onCancel={hideCalendarPicker}
						/>

						<TouchableOpacity
							onPress={pressCalendarIcon}
							style={calendarIconStyle.container}
						>
							<CalendarIcon/>
						</TouchableOpacity>
					</View>
				</View>

				<View style={equipmentLevelChangeViewStyle.container}>
					<LinearGradient 
						style={smartFanLevelChangeViewStyle.container}
						colors={["rgb(63, 76, 119)","rgb(32, 38, 57)"]}
						locations={[0.114, 0.702]}
						start={{x: 0, y: 0}}
						end={{x: 1, y: 0}}
					>
						<FanIcon />
						<Text style={smartFanLevelChangeTextStyle.container}>
							Smart fan
						</Text>
						<Slider
							style={smartFanLevelChangeSliderStyle.container}
							minimumValue={0}
							maximumValue={100}
							step={20}
							thumbTintColor={"#006A64"}
							value={currSchedule.fanSpeed}
							maximumTrackTintColor={"#ADD8E6"}
							onValueChange={(value) => changeFanSpeedValue(value)}
						/>
						<Text style={smartFanLevelChangeTextStyle.container}>{currSchedule.fanSpeed}</Text>
					</LinearGradient>

					<LinearGradient 
						style={smartLightChangeViewStyle.container}
						colors={["rgb(63, 76, 119)","rgb(32, 38, 57)"]}
						locations={[0.114, 0.702]}
						start={{x: 0, y: 0}}
						end={{x: 1, y: 0}}
					>
						<LightBulbIcon />
						<Text style={smartLightChangeTextStyle.container}>
							Smart light
						</Text>
						<ToggleSwitch
							value={currSchedule.lightStatus}
							onValueChange={toggleSmartLightSwitch}
							backgroundActive={"#90EE90"}
							backgroundInactive={"#FFFFFF"}
							circleBorderActiveColor={"#000000"}
							circleBorderInactiveColor={"#000000"}
							containerStyle={
								smartLightChangeToggleSwitchStyle.container
							}
							activeTextStyle={
								smartLightChangeToggleSwitchStyle.activeText
							}
							inactiveTextStyle={
								smartLightChangeToggleSwitchStyle.inActiveText
							}
							switchWidth={25}
							switchHeight={25}
							activeText={"On"}
							inActiveText={"Off"}
						/>
					</LinearGradient>
				</View>

				<View style={notificationChangeView.container}>
					<Text style={notificationChangeText.container}>
						Notification
					</Text>
					<ToggleSwitch
						containerStyle={
							notificationChangeToggleSwitch.container
						}
						value={currSchedule.notification}
						onValueChange={toggleNotificationEnabledSwitch}
						switchWidth={35}
						switchHeight={30}
						activeTextStyle={
							notificationChangeToggleSwitch.activeText
						}
						inactiveTextStyle={
							notificationChangeToggleSwitch.inActiveText
						}
						backgroundActive={"#90EE90"}
						backgroundInactive={"#FFFFFF"}
						circleBorderActiveColor={"#000000"}
						circleBorderInactiveColor={"#000000"}
					/>
				</View>
				<View style={buttonsViewStyle.container}>
					<LinearGradient
						colors={["rgb(63, 76, 119)","rgb(32, 38, 57)"]}
						locations={[0.114, 0.702]}
						start={{x: 0, y: 0}}
						end={{x: 1, y: 0}}
						style={cancelButtonStyle.linearGradient}
					>
						<TouchableOpacity 
							style={cancelButtonStyle.container}
							onPress={(e) => pressCancelButton()}
						>
							<Text style={cancelButtonStyle.text}>Cancel</Text>
						</TouchableOpacity>
					</LinearGradient>
					
					<LinearGradient
						colors={["rgb(63, 76, 119)","rgb(32, 38, 57)"]}
						locations={[0.114, 0.702]}
						start={{x: 0, y: 0}}
						end={{x: 1, y: 0}}
						style={saveButtonStyle.linearGradient}
					>
						<TouchableOpacity 
							style={saveButtonStyle.container}
							onPress={(e) => pressSaveButton(currSchedule, id)}
						>
							<Text style={saveButtonStyle.text}>Save</Text>
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</LinearGradient> 
		</View>
	);
};

const editScheduleScreenViewStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
	},
	calendarVisible: {
		backgroundColor: "rgba(0, 0, 0, 0.5)"
	}
});

const editScheduleViewStyle = StyleSheet.create({
	container: {
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		height: "100%",
		width: "100%",
	}
});

const topArrowIconViewStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		gap: 39,
		justifyContent: "center",
		marginTop: "10.49%",
	},
});

const bottomArrowIconViewStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		gap: 39,
		justifyContent: "center",
	},
});


const timePickerStyle = StyleSheet.create({
	text: {
		color: "#FFFFFF",
		fontSize: 40
	},
	itemContainer: {
		width: "25%",
	},
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: "10%"
	},
	item: {
		borderWidth: 1,
		backgroundColor: "rgb(32, 38, 57)"	
	}

});

const calendarViewStyle = StyleSheet.create({
	container: {
		marginTop: "7.84%",
		display: "flex",
		flexDirection: "column",
		marginLeft: "7.69%",
		justifyContent: "center",
		gap: 17,
		position: "relative"
	},
});

const daySelectionViewStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		gap: 35,
	},
});

const dayTextStyle = StyleSheet.create({
	container: {
		fontSize: 24,
		color: "#FFFFFF",
	},
});

const calendarIconStyle = StyleSheet.create({
	container: {
		position: "absolute",
		right: 20,
	},
});


const equipmentLevelChangeViewStyle = StyleSheet.create({
	container: {
		height: "23.22%",
		display: "flex",
		flexDirection: "column",
		gap: 25,
		marginLeft: "5.64%",
		marginTop: "10%",
	},
});

const smartFanLevelChangeViewStyle = StyleSheet.create({
	container: {
		width: "89.74%",
		height: "46.94%",
		borderStyle: "solid",
		borderColor: "#FFFFFF",
		borderRadius: 10,
		display: "flex",
		flexDirection: "row",
		gap: 7,
		alignItems: "center",
		marginLeft: 8,
	},
});

const smartFanLevelChangeTextStyle = StyleSheet.create({
	container: {
		fontSize: 16,
		color: "#FFFFFF"
	},
});

const smartFanLevelChangeSliderStyle = StyleSheet.create({
	container: {
		width: "50%",
		height: 200,
	},
});

const smartLightChangeViewStyle = StyleSheet.create({
	container: {
		width: "89.74%",
		height: "43.88%",
		borderStyle: "solid",
		borderRadius: 10,
		display: "flex",
		flexDirection: "row",
		gap: 7,
		alignItems: "center",
		marginLeft: 8,
	},
});

const smartLightChangeTextStyle = StyleSheet.create({
	container: {
		fontSize: 16,
		color: "#FFFFFF"
	},
});

const smartLightChangeToggleSwitchStyle = StyleSheet.create({
	container: {
		borderStyle: "solid",
		borderColor: "#000000",
		borderWidth: 1,
		width: "24.57%",
		height: "40%",
		marginLeft: "37.14%",
	},
	inActiveText: {
		color: "#FFFFFF",
	},
	activeText: {
		color: "#90EE90",
	},
});

const notificationChangeView = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 126,
		marginTop: "12%",
		marginLeft: "6.92%",
	},
});

const notificationChangeText = StyleSheet.create({
	container: {
		fontSize: 24,
		color: "#FFFFFF",
	},
});

const notificationChangeToggleSwitch = StyleSheet.create({
	container: {
		width: "12.31%",
		height: 48,
	},
	activeText: {
		fontSize: 14,
		color: "#90EE90",
	},
	inActiveText: {
		fontSize: 14,
		color: "#FFFFFF",
	},
});

const buttonsViewStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		gap: 33,
		marginTop: "20%",
		marginLeft: "30%",
	},
});

const cancelButtonStyle = StyleSheet.create({
	container: {
		width: 120,
		height: 50,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 10,
	},
	text: {
		fontSize: 20,
		color: "#FFFFFF",
	},
	linearGradient: {
		borderRadius: 10
	}
});

const saveButtonStyle = StyleSheet.create({
	container: {
		width: 120,
		height: 50,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: 10,
	},
	text: {
		fontSize: 20,
		color: "#FFFFFF",
	},
	linearGradient: {
		borderRadius: 10
	}
});

const calendarPickerStyle = StyleSheet.create({
	container: {
		width: "100%",
		marginTop: "111.5%",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#808080",
	},
	closeButton: {
		width: "100%",
		height: "5%",
		marginTop: "3%",
		backgroundColor: "rgb(63, 76, 119)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#FFFFFF",

	},
	closeButtonText: {
		fontSize: 20,
		color: "#E5E5E5",
	},
	header: {
		fontStyle: "italic"
	}
});

export default EditScheduleScreen;
