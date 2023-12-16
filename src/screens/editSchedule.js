import React, { useState, useRef } from "react";
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Modal,
	Alert,
} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import Slider from "@react-native-community/slider";
import ToggleSwitch from "../components/ToggleSwitch";
import { StatusBar } from "expo-status-bar";
import { Calendar } from "react-native-calendars";
import {useFonts} from "expo-font";

import FanIcon from "../components/fanIcon";
import LightBulbIcon from "../components/lightBulbIcon";
import MenuBar from "../components/menu";
import CalendarIcon from "../components/calendarIcon";
import TopArrowIcon from "../components/topArrowIcon";
import BottomArrowIcon from "../components/bottomArrowIcon";
const EditScheduleScreen = () => {
	/* Used to config calendar */
	const TODAY = new Date(2023, 11, 30);
	const DEFAULT_SELECTED_WEEK_DAYS = [false, false, false, false, false, false, false];
	/* Used to select on the calendar */
	const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
	const [selectedWeekDays, setSelectedWeekDays] = useState(DEFAULT_SELECTED_WEEK_DAYS);

	const [smartLightEnabled, setSmartLightEnabled] = useState(false);
	const [notificationEnabled, setNotificationEnabled] = useState(false);
	const [calendarPicked, setCalendarPicked] = useState(false);
	const [selectedDate, setSelectedDate] = useState(TODAY);
	
	function toggleSmartLightSwitch() {
		setSmartLightEnabled((preState) => !preState);
	}

	function toggleNotificationEnabledSwitch() {
		setNotificationEnabled((prevState) => !prevState);
	}

	function pressCalendarIcon() {
		setCalendarPicked((prevState) => !prevState);
	}

	function pressCloseCalendarButton() {
		console.log(calendarPicked)
		setCalendarPicked(false);
	}

	function pressCloseCalendarAgain() {
		Alert.alert("Calendar has been close");
		setCalendarPicked((prevState) => !prevState);
	}

	function pressWeekDayButton(index) {
		const nextSelectedWeekDays = selectedWeekDays.map((dayFlag, idx) => {
			if (idx == index) {
				return !dayFlag;
			} else {
				return dayFlag;
			}
		});
		console.log(nextSelectedWeekDays);
		setSelectedWeekDays(nextSelectedWeekDays);
	}

	function getDateAsStringKey(date) {
		const day = (date.getDate() >= 10) ? date.getDate().toString() : "0" + date.getDate().toString();
		const month = (date.getMonth() >= 10) ? date.getMonth().toString() : "0" + date.getMonth().toString();
		const year = date.getFullYear().toString();
		return year + "-" + month + "-" + day;
	}

	/* Used to decorate date on calendar */
	const selectedDateAsStringKey = getDateAsStringKey(selectedDate);
	const markedDateOnCalendar = {
		[selectedDateAsStringKey] : {selected: true},
		"2024-01-01": {marked: true}	
	};

	/* Used to load new fonts */
	const [fontsLoaded, fontsError] = useFonts({
		"Karla-Regular": require("../assets/fonts/Karla-Regular.ttf")
	});
	
	if (!fontsLoaded) {
		return null;
	}

	return (	
		<View 
			style={editScheduleScreenViewStyle.container}
		>
			<LinearGradient 
				style={editScheduleViewStyle.container}
				colors={["#004282", "#5899e2"]}
			>
				<StatusBar />

				<View style={topArrowIconViewStyle.container}>
					<TouchableOpacity>
						<TopArrowIcon />
					</TouchableOpacity>
					<TouchableOpacity>
						<TopArrowIcon />
					</TouchableOpacity>
				</View>

				<Text style={timeViewStyle.container}>06:30</Text>

				<View style={bottomArrowIconViewStyle.container}>
					<TouchableOpacity>
						<BottomArrowIcon />
					</TouchableOpacity>
					<TouchableOpacity>
						<BottomArrowIcon />
					</TouchableOpacity>
				</View>

				<View style={calendarViewStyle.container}>
					<View style={daySelectionViewStyle.container}>
						<Text style={dayTextStyle.container}>
							Friday, October 27
						</Text>
						<Modal
							animationType="slide"
							visible={calendarPicked}
							transparent={true}
							onRequestClose={pressCloseCalendarAgain}
        				>
							<Calendar 
								style={calendarPickerStyle.container}
								theme={{
									backgroundColor: "#FFFFFF",
									calendarBackground: "#121212",
									textSectionTitleColor: "#b6c1cd",
									
									selectedDayBackgroundColor: "#00adf5",
									selectedDayTextColor: "#FFFFFF",
									todayTextColor: '#00adf5',
									dayTextColor: "#E5E5E5",
									monthTextColor: "#E5E5E5",
									textDisabledColor: "#2d4150"
								}}
								firstDay={1}
								enableSwipeMonths={true}
								minDate="2023-12-01"
								maxDate="2024-12-31"
								markedDates={markedDateOnCalendar}
							/>
							<TouchableOpacity
								style={calendarPickerStyle.closeButton}
								onPress={pressCloseCalendarButton}
							>
								<Text style={calendarPickerStyle.closeButtonText}>Close</Text>
							</TouchableOpacity>
						</Modal>
						<TouchableOpacity
							onPress={pressCalendarIcon}
						>
							<CalendarIcon/>
						</TouchableOpacity>
					</View>

					<View style={weekDayViewStyle.container}>
						{weekDays.map((day, index) => (
							<TouchableOpacity
								key={index}
								style={selectedWeekDays[index] ? weekDayStyle.selectedContainer : weekDayStyle.unSelectedContainer}
								onPress={() => pressWeekDayButton(index)}
							>
								<Text
									style={weekDayStyle.text}
								>
									{day}
							</Text>
							</TouchableOpacity>
							
						))}
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
							// interval={20}
							thumbTintColor={"#006A64"}
						/>
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
							value={smartLightEnabled}
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
						value={notificationEnabled}
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
							colors={["rgba(98, 210, 141, 0.88)", "rgba(234, 245, 45, 0.79)"]}
							start={{x: 0, y: 0}}
							locations={[0.112, 0.88]}
							
							end={{x: 1, y: 0}}
							style={cancelButtonStyle.linearGradient}
					>
						<TouchableOpacity style={cancelButtonStyle.container}>
							<Text style={cancelButtonStyle.text}>Cancel</Text>
						</TouchableOpacity>
					</LinearGradient>
					
					<LinearGradient
						colors={["rgba(98, 210, 141, 0.88)", "rgba(234, 245, 45, 0.79)"]}
						start={{x: 0, y: 0}}
						locations={[0.112, 0.88]}
						end={{x: 1, y: 0}}
						style={saveButtonStyle.linearGradient}
					>
						<TouchableOpacity 
							style={saveButtonStyle.container}
						>
							<Text style={saveButtonStyle.text}>Save</Text>
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</LinearGradient>
			<MenuBar />
		</View>
	);
};

const editScheduleScreenViewStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "100%",
		fontFamily: "Karla-Regular"
	},
});

const editScheduleViewStyle = StyleSheet.create({
	container: {
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
		// height: "89.22%",
		height: "93%",
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


const timeViewStyle = StyleSheet.create({
	container: {
		fontSize: 69,
		textAlign: "center",
		color: "#FFFFFF",
	},
});

const calendarViewStyle = StyleSheet.create({
	container: {
		marginTop: "7.84%",
		display: "flex",
		flexDirection: "column",
		marginLeft: "7.69%",
		justifyContent: "center",
		gap: 17,
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

const weekDayViewStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		gap: 16,
	},
});

const weekDayStyle = StyleSheet.create({
	selectedContainer: {
		borderWidth: 1,
		borderColor: "#FFFFFF",
		borderRadius: 50,
		width: 40,
		height: 40,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#4B0082"
	},
	unSelectedContainer: {
		borderWidth: 1,
		borderColor: "#FFFFFF",
		borderRadius: 50,
		width: 40,
		height: 40,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#9370DB"
	},
	text: {
		fontSize: 18,
		color: "#FFFFFF",
	}
});

const equipmentLevelChangeViewStyle = StyleSheet.create({
	container: {
		height: "23.22%",
		display: "flex",
		flexDirection: "column",
		gap: 18,
		marginLeft: "5.64%",
		marginTop: 10,
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
		width: "48.86%",
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
		marginTop: "5%",
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
		marginTop: "4.91%",
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
		color: "#000000",
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
		color: "#000000",
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
