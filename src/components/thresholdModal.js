import React, { useState } from "react";
import { View, ScrollView, Modal, Text, Picker, Switch, Slider, TextInput, Button } from "react-native";

const ThresholdModal = ({ isVisible, onCancel, onOk }) => {
	const [formValues, setFormValues] = useState({
		selectedDevice: "",
		selectedState: "",
		selectedTempSensor: "",
		tempThreshold: "",
		selectedDistanceSensor: "",
		distanceThreshold: "",
		selectedHumiditySensor: "",
		humidityThreshold: "",
	});

	const handleValueChange = (field, value) => {
		setFormValues({ ...formValues, [field]: value });
	};

	return (
		<Modal visible={isVisible} transparent>
			<ScrollView>
				<View>
					<Picker selectedValue={formValues.selectedDevice} onValueChange={(itemValue) => handleValueChange("selectedDevice", itemValue)}>
						{/* Add your device options here */}
					</Picker>

					{formValues.selectedDevice && (
						<View>
							<Picker selectedValue={formValues.selectedState} onValueChange={(itemValue) => handleValueChange("selectedState", itemValue)}>
								<Picker.Item label="Select State" value="" />
								<Picker.Item label="Light" value="light" />
								<Picker.Item label="Fan" value="fan" />
							</Picker>

							{formValues.selectedState === "light" ? (
								<Switch value={"Light"} onValueChange={(value) => handleValueChange("lightState", value)} />
							) : (
								<Slider value={"Fan"} onValueChange={(value) => handleValueChange("fanState", value)} minimumValue={0} maximumValue={5} />
							)}

							<Picker selectedValue={formValues.selectedState} onValueChange={(itemValue) => handleValueChange("selectedState", itemValue)}>
								<Picker.Item label="Select State" value="" />
								<Picker.Item label="Light" value="light" />
								<Picker.Item label="Fan" value="fan" />
							</Picker>

							<TextInput
								value={formValues.tempThreshold}
								onChangeText={(text) => handleValueChange("tempThreshold", text)}
								keyboardType="numeric"
							/>

							<Picker
								selectedValue={formValues.selectedDistanceSensor}
								onValueChange={(itemValue) => handleValueChange("selectedDistanceSensor", itemValue)}
							>
								{/* Add your distance sensor options here */}
							</Picker>

							<TextInput
								value={formValues.distanceThreshold}
								onChangeText={(text) => handleValueChange("distanceThreshold", text)}
								keyboardType="numeric"
							/>

							<Picker
								selectedValue={formValues.selectedHumiditySensor}
								onValueChange={(itemValue) => handleValueChange("selectedHumiditySensor", itemValue)}
							>
								{/* Add your humidity sensor options here */}
							</Picker>

							<TextInput
								value={formValues.humidityThreshold}
								onChangeText={(text) => handleValueChange("humidityThreshold", text)}
								keyboardType="numeric"
							/>
						</View>
					)}

					<View>
						<Button title="Cancel" onPress={onCancel} />
						<Button title="OK" onPress={() => onOk(formValues)} />
					</View>
				</View>
			</ScrollView>
		</Modal>
	);
};

export default ThresholdModal;
