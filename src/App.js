import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/home";
import ScheduleScreen from "./screens/schedule";
import StatisticScreen from "./screens/statisticScreen";
import ThresholdScreen from "./screens/thresholdScreen";
import EditScheduleScreen from "./screens/editSchedule";
import EditThresholdScreen from "./screens/editThresholdScreen";

// Screen names
const homeName = "Home";
const scheduleName = "Schedule";
const editScheduleName = "Edit schedule";
const statisticName = "Statistic";
const ThresholdName = "Threshold";
const editThresholdName = "Edit Threshold"

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ScheduleStack = () => (
  <Stack.Navigator initialRouteName={scheduleName}>
    <Stack.Screen name={scheduleName} component={ScheduleScreen} />
    <Stack.Screen name={editScheduleName} component={EditScheduleScreen} />
  </Stack.Navigator>
);

const ThresholdStack = () => (
	<Stack.Navigator initialRouteName={ThresholdName}>
	  <Stack.Screen name={ThresholdName} component={ThresholdScreen} />
	  <Stack.Screen name={editThresholdName} component={EditThresholdScreen} />
	</Stack.Navigator>
  );


export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator 
				initialRouteName={homeName} //homeName
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						let rn = route.name;

						if (rn === homeName) {
							iconName = focused ? "home" : "home-outline";
						} else if (rn === scheduleName) {
							iconName = focused ? "alarm" : "alarm-outline";
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
					headerShown: false
				})}
			>
				<Tab.Screen name={homeName} component={HomeScreen}/>
				<Tab.Screen name={scheduleName} component={ScheduleStack} />
				<Tab.Screen name={statisticName} component={StatisticScreen} />
				<Tab.Screen name={ThresholdName} component={ThresholdStack} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
