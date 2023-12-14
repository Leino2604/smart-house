import React, { useState } from "react";
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
import MenuBar from "../components/menu";
import ToggleSwitch from "../components/ToggleSwitch";
import { useNavigation } from "@react-navigation/native";

const BACKEND_API = "https://smart-house-api.onrender.com/";

const ScheduleScreen = () => {
	// const navigation = useNavigation();

	const [scheduleList, setScheduleList] = useState([
		{
			date: new Date(2023, 11, 13, 6, 30),
			isEnabled: true,
			fanIdx: 2,
		},
		{
			date: new Date(2023, 11, 14, 20, 30),
			isEnabled: false,
			fanIdx: 3,
		},
		{
			date: new Date(2023, 11, 20, 9, 15),
			isEnabled: true,
			fanIdx: 5,
		},
		{
			date: new Date(2023, 12, 1, 0, 0),
			isEnabled: false,
			fanIdx: 4,
		},
		{
			date: new Date(2023, 5, 31, 7, 30),
			isEnabled: true,
			fanIdx: 6,
		},
		{
			date: new Date(2024, 1, 1, 10, 45),
			isEnabled: false,
			fanIdx: 1,
		},
		{
			date: new Date(2023, 2, 12, 7, 0),
			isEnabled: false,
			fanIdx: 8,
		},
		{
			date: new Date(2024, 3, 15, 21, 30),
			isEnabled: false,
			fanIdx: 3,
		},
	]);

	function getHourIn24Hours(date) {
		const hour = date.getHours();
		return hour >= 10 ? hour.toString() : "0" + hour.toString();
	}

	function getMinute(date) {
		const minute = date.getMinutes();
		return minute >= 10 ? minute.toString() : "0" + minute.toString();
	}

	function handleScheduleItemToggleSwitch(index) {
		const newScheduleList = scheduleList.map((scheduleItem, idx) => {
			if (idx === index) {
				return {
					...scheduleItem,
					isEnabled: !scheduleItem.isEnabled,
				};
			} else {
				return scheduleItem;
			}
		});
		setScheduleList(newScheduleList);
	}

	return (
		<View style={scheduleScreenStyle.container}>
			<View style={scheduleScreenStyle.schedule}>
				{/* <Text>Scehdule</Text> */}
				<TouchableOpacity
					// onPress={() => navigation.navigate("EditSchedule")}
				>
					<Image
						source={require("../assets/plus_icon.png")}
						style={scheduleScreenStyle.plusIcon}
					/>
				</TouchableOpacity>
				<ScrollView style={scheduleStyle.container}>
					{scheduleList.map((scheduleItem, idx) => {
						const hour = getHourIn24Hours(scheduleItem.date);
						const minute = getMinute(scheduleItem.date);
						return (
							<View style={scheduleItemStyle.container} key={idx}>
								<View style={scheduleItemStyle.equipmentInfo}>
									<Text style={scheduleItemStyle.timeText}>
										{hour}:{minute}
									</Text>
									<Text
										style={scheduleItemStyle.equipmentText}
									>
										Light{" "}
										{scheduleItem.isEnabled ? "ON" : "OFF"},
										Fan {scheduleItem.fanIdx}
									</Text>
								</View>

								<ToggleSwitch
									value={scheduleItem.isEnabled}
									onValueChange={() =>
										handleScheduleItemToggleSwitch(idx)
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
							</View>
						);
					})}
				</ScrollView>
			</View>
			<MenuBar />
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
		gap: 39,
	},
	schedule: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		height: "89.22%",
		backgroundColor: "#246EE9",
		borderBottomLeftRadius: 20,
		borderBottomRightRadius: 20,
	},
	plusIcon: {
		marginTop: "8.90%",
		marginLeft: "78.46%",
		width: 60,
		height: 45,
	},
});

const scheduleStyle = StyleSheet.create({
	container: {
		marginTop: "7.87%",
	},
});

const scheduleItemStyle = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "5.71%",
		gap: 87,
	},
	timeText: {
		color: "#FFFFFF",
		fontSize: 48,
	},
	equipmentText: {
		color: "#FFFFFF",
		fontSize: 20,
	},
	dateText: {},
	equipmentInfo: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
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
