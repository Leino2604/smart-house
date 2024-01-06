import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import "../global";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";

export default function StatisticScreen({ navigation }) {
	const [data, setData] = useState({});
	const feedKeys = ["temp", "distance", "humid", "fan-speed", "light-switch"];

	const fetchData = async () => {
		let newData = {};
		for (let key of feedKeys) {
			try {
				const headers = {
					"X-AIO-Key": global.AdaFruitIOKey,
					"Content-Type": "application/json",
				};

				url = `https://io.adafruit.com/api/v2/dadnhk231nhom9/feeds/group-9.${key}/data?limit=20`;
				const response = await axios.get(url, { headers });

				let tempTimeData = [];
				let tempValueData = [];

				for (const item of response.data) {
					let date = new Date(item["created_at"]);
					let formattedTime = date.toUTCString();
					formattedTime = formattedTime.split(" ")[4] + " " + formattedTime.split(" ")[2] + " " + formattedTime.split(" ")[1];

					tempTimeData.push(formattedTime);
					tempValueData.push(item["value"]);
				}

				newData[key] = { timeData: tempTimeData, valueData: tempValueData };
			} catch (error) {
				handleError(error);
			}
		}
		setData(newData);
	};

	useFocusEffect(
		useCallback(() => {
			// Fetch data initially
			fetchData();

			// Set up interval to fetch data every 5 seconds
			const interval = setInterval(() => {
				fetchData();
			}, 5000);

			// Clean up interval on component unmount or when the screen loses focus
			return () => clearInterval(interval);
		}, []),
	);

	useFocusEffect(
		useCallback(() => {
			// console.log(timeData);
			// console.log(valueData);
			// console.log(data);
			for (let key of feedKeys) {
				if (data[key]) {
					let timeDataForKey = data[key].timeData;
					let valueDataForKey = data[key].valueData;

					console.log(`Time data for ${key}:`, timeDataForKey);
					console.log(`Value data for ${key}:`, valueDataForKey);
				} else {
					console.log(`Data for ${key} is not yet available.`);
				}
			}
		}, [data]), // This effect runs whenever timeData changes
	);

	function handleError(error) {
		if (error.response) {
			console.error("Server responded with an error:", error.response.status, error.response.data);
		} else if (error.request) {
			console.error("No response received from the server");
		} else {
			console.error("Error setting up the request:", error.message);
		}
	}

	return (
		<View>
			<ScrollView>
				<Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 30 }}>Distance Line Chart</Text>
				<ScrollView horizontal={true}>
					{data["distance"] ? (
						<LineChart
							data={{
								labels: data["distance"].timeData,
								datasets: [
									{
										data: data["distance"].valueData,
									},
								],
							}}
							// width={Dimensions.get("window").width} // from react-native
							width={1200}
							height={400}
							yAxisLabel=""
							yAxisSuffix="cm"
							verticalLabelRotation={45}
							yAxisInterval={1} // optional, defaults to 1
							chartConfig={{
								backgroundColor: "#000FFF",
								backgroundGradientFrom: "#00FFFF",
								backgroundGradientTo: "#0055FF",
								decimalPlaces: 1, // optional, defaults to 2dp
								color: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								style: {
									borderRadius: 16,
								},
								propsForDots: {
									r: "6",
									strokeWidth: "2",
									stroke: "#ffa726",
								},
							}}
							bezier
							style={{
								marginVertical: 8,
								borderRadius: 16,
							}}
						/>
					) : (
						<View style={{ width: "100%", height: 150, alignItems: "center", justifyContent: "center" }}>
							<Text style={{ fontSize: 30 }}>Loading...</Text>
						</View>
					)}
				</ScrollView>

				<Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 30 }}>Temperature Line Chart</Text>
				<ScrollView horizontal={true}>
					{data["temp"] ? (
						<LineChart
							data={{
								labels: data["temp"].timeData,
								datasets: [
									{
										data: data["temp"].valueData,
									},
								],
							}}
							// width={Dimensions.get("window").width} // from react-native
							width={1200}
							height={400}
							yAxisLabel=""
							yAxisSuffix="℃"
							verticalLabelRotation={45}
							yAxisInterval={1} // optional, defaults to 1
							chartConfig={{
								backgroundColor: "#000FFF",
								backgroundGradientFrom: "#00FFFF",
								backgroundGradientTo: "#0055FF",
								decimalPlaces: 1, // optional, defaults to 2dp
								color: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								style: {
									borderRadius: 16,
								},
								propsForDots: {
									r: "6",
									strokeWidth: "2",
									stroke: "#ffa726",
								},
							}}
							bezier
							style={{
								marginVertical: 8,
								borderRadius: 16,
							}}
						/>
					) : (
						<View style={{ width: "100%", height: 150, alignItems: "center", justifyContent: "center" }}>
							<Text style={{ fontSize: 30 }}>Loading...</Text>
						</View>
					)}
				</ScrollView>

				<Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 30 }}>Humidity Line Chart</Text>
				<ScrollView horizontal={true}>
					{data["humid"] ? (
						<LineChart
							data={{
								labels: data["humid"].timeData,
								datasets: [
									{
										data: data["humid"].valueData,
									},
								],
							}}
							// width={Dimensions.get("window").width} // from react-native
							width={1200}
							height={400}
							yAxisLabel=""
							yAxisSuffix="%"
							verticalLabelRotation={45}
							yAxisInterval={1} // optional, defaults to 1
							chartConfig={{
								backgroundColor: "#000FFF",
								backgroundGradientFrom: "#00FFFF",
								backgroundGradientTo: "#0055FF",
								decimalPlaces: 1, // optional, defaults to 2dp
								color: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								style: {
									borderRadius: 16,
								},
								propsForDots: {
									r: "6",
									strokeWidth: "2",
									stroke: "#ffa726",
								},
							}}
							bezier
							style={{
								marginVertical: 8,
								borderRadius: 16,
							}}
						/>
					) : (
						<View style={{ width: "100%", height: 150, alignItems: "center", justifyContent: "center" }}>
							<Text style={{ fontSize: 30 }}>Loading...</Text>
						</View>
					)}
				</ScrollView>

				<Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 30 }}>Fan Speed Line Chart</Text>
				<ScrollView horizontal={true}>
					{data["fan-speed"] ? (
						<LineChart
							data={{
								labels: data["fan-speed"].timeData,
								datasets: [
									{
										data: data["fan-speed"].valueData,
									},
								],
							}}
							// width={Dimensions.get("window").width} // from react-native
							width={1200}
							height={400}
							yAxisLabel=""
							yAxisSuffix=""
							verticalLabelRotation={45}
							yAxisInterval={1} // optional, defaults to 1
							chartConfig={{
								backgroundColor: "#000FFF",
								backgroundGradientFrom: "#00FFFF",
								backgroundGradientTo: "#0055FF",
								decimalPlaces: 0, // optional, defaults to 2dp
								color: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								style: {
									borderRadius: 16,
								},
								propsForDots: {
									r: "6",
									strokeWidth: "2",
									stroke: "#ffa726",
								},
							}}
							bezier
							style={{
								marginVertical: 8,
								borderRadius: 16,
							}}
						/>
					) : (
						<View style={{ width: "100%", height: 150, alignItems: "center", justifyContent: "center" }}>
							<Text style={{ fontSize: 30 }}>Loading...</Text>
						</View>
					)}
				</ScrollView>

				<Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 30 }}>Light Switch Line Chart</Text>
				<ScrollView horizontal={true}>
					{data["light-switch"] ? (
						<LineChart
							data={{
								labels: data["light-switch"].timeData,
								datasets: [
									{
										data: data["light-switch"].valueData,
									},
								],
							}}
							// width={Dimensions.get("window").width} // from react-native
							width={1200}
							height={400}
							yAxisLabel=""
							yAxisSuffix=""
							verticalLabelRotation={45}
							yAxisInterval={1} // optional, defaults to 1
							// segments={1}
							chartConfig={{
								backgroundColor: "#000FFF",
								backgroundGradientFrom: "#00FFFF",
								backgroundGradientTo: "#0055FF",
								decimalPlaces: 0, // optional, defaults to 2dp
								color: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								labelColor: (opacity = 1) => `rgba(0,0,139, ${opacity})`,
								style: {
									borderRadius: 16,
								},
								propsForDots: {
									r: "6",
									strokeWidth: "2",
									stroke: "#ffa726",
								},
							}}
							bezier
							style={{
								marginVertical: 8,
								borderRadius: 16,
							}}
						/>
					) : (
						<View style={{ width: "100%", height: 150, alignItems: "center", justifyContent: "center" }}>
							<Text style={{ fontSize: 30, textAlign: 'center' }}>Loading...</Text>
						</View>
					)}
				</ScrollView>
			</ScrollView>
		</View>
	);
}
