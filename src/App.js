// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
// import HomeScreen from "./screens/home";
// import ScheduleScreen from "./screens/schedule";
// import EditScheduleScreen from "./screens/editSchedule";
// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";

// import ThresholdModal from "./components/thresholdModal";
// import ThresholdScreen from "./screens/thresholdScreen";

// const Stack = createStackNavigator();

// export default function App() {
// 	return (
// 		<NavigationContainer>
// 			<Stack.Navigator
// 				screenOptions={{headerShown: false}}
// 			>
// 				<Stack.Screen
// 					name="HomeScreen"
// 					component={HomeScreen}
// 					options={{title: "Home"}}
// 				/>
// 				<Stack.Screen
// 					name="EditScheduleScreen"
// 					component={EditScheduleScreen}
// 					options={{title: "Edit schedule"}}
// 				/>
// 				<Stack.Screen
// 					name="ScheduleScreen"
// 					component={ScheduleScreen}
// 					options={{title: "Schedule"}}
// 				/>
// 			</Stack.Navigator>
// 		</NavigationContainer>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/home";
import ScheduleScreen from "./screens/schedule";
import StatisticScreen from "./screens/statisticScreen";
import ThresholdScreen from "./screens/thresholdScreen";

//Screen names
const homeName = "Home";
const scheduleName = "Schedule";
const statisticName = "Statistic";
const ThresholdName = "Threshold";

const Tab = createBottomTabNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator
				initialRouteName={statisticName} //homeName
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let rn = route.name;

						if (rn === homeName) {
							iconName = focused ? "home" : "home-outline";
						} else if (rn === scheduleName) {
							iconName = focused ? "list" : "list-outline";
						} else if (rn === statisticName) {
							iconName = focused ? "stats-chart" : "stats-chart-outline";
						} else if (rn === ThresholdName) {
							iconName = focused ? "settings" : "settings-outline";
						}

						// You can return any component that you like here!
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					activeTintColor: "darkblue",
					inactiveTintColor: "grey",
					labelStyle: { paddingBottom: 10, fontSize: 10 },
					style: { padding: 10, height: 70 },
				})}
				// tabBarOptions={{
				// 	activeTintColor: "darkblue",
				// 	inactiveTintColor: "grey",
				// 	labelStyle: { paddingBottom: 10, fontSize: 10 },
				// 	style: { padding: 10, height: 70 },
				// }}
			>
				<Tab.Screen name={homeName} component={HomeScreen} />
				<Tab.Screen name={scheduleName} component={ScheduleScreen} />
				<Tab.Screen name={statisticName} component={StatisticScreen} />
				<Tab.Screen name={ThresholdName} component={ThresholdScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
