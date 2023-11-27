import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/home";
import ScheduleScreen from "./screens/schedule";
import EditScheduleScreen from "./screens/editSchedule";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
	return (
		<View style={styles.container}>
			{/* <NavigationContainer>
				<Stack.Navigator initialRouteName="HomeScreen">
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Schedule" component={ScheduleScreen} />
					<Stack.Screen
						name="EditSchedule"
						component={EditScheduleScreen}
					/>
				</Stack.Navigator>
			</NavigationContainer> */}
      <HomeScreen />
			<StatusBar style="auto" />
		</View>
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
