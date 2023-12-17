import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/home";
import ScheduleScreen from "./screens/schedule";
import EditScheduleScreen from "./screens/editSchedule";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ThresholdModal from "./components/thresholdModal";
import ThresholdScreen from "./screens/thresholdScreen";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{headerShown: false}}
			>
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{title: "Home"}}
				/>
				<Stack.Screen 
					name="EditScheduleScreen"
					component={EditScheduleScreen}
					options={{title: "Edit schedule"}}
				/>
				<Stack.Screen
					name="ScheduleScreen"
					component={ScheduleScreen}
					options={{title: "Schedule"}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
