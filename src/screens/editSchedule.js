import React, { useState } from "react";
import {View, StyleSheet, Image, Text, Switch, Button, TouchableOpacity} from "react-native";
import MenuBar from "../components/menu";
import { StatusBar } from "expo-status-bar";

import FanIcon from "../components/fanIcon";
import LightBulbIcon from "../components/lightBulbIcon";
import Slider from "@react-native-community/slider";
import ToggleSwitch from "../components/ToggleSwitch"

const EditScheduleScreen = () => {
    const weekDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [smartLightEnabled, setSmartLightEnabled] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(false);
    function toggleSmartLightSwitch() {
        setSmartLightEnabled(preState => !preState);
    }

    function toggleNotificationEnabledSwitch() {
        setNotificationEnabled(prevState => !prevState);
    }
    return (
        <View style={editScheduleScreenViewStyle.container}>
            <View style={editScheduleViewStyle.container}>
                <StatusBar />

                <View style={topArrowIconViewStyle.container}>
                    <Image
                        source={require("../assets/top_arrow_icon.png")}
                        style={topArrowIconStyle.container}
                    />
                    <Image
                        source={require("../assets/top_arrow_icon.png")}
                        style={topArrowIconStyle.container}
                    />
                </View>

                <Text style={timeViewStyle.container}>
                    06:30
                </Text>


                <View style={bottomArrowIconViewStyle.container}>
                    <Image
                        source={require("../assets/bottom_arrow_icon.png")}
                        style={bottomArrowIconStyle.container}
                    />
                    <Image
                        source={require("../assets/bottom_arrow_icon.png")}
                        style={bottomArrowIconStyle.container}
                    />
                </View>


                <View style={calendarViewStyle.container}>
                    <View style={daySelectionViewStyle.container}>
                        <Text style={dayTextStyle.container}>
                            Day: Friday, October 27
                        </Text>
                        <Image
                            source={require("../assets/calendar_icon.png")}
                            style={calendarIconStyle.container}
                        />
                    </View>

                    <View style={weekDayViewStyle.container}>
                        {
                            weekDay.map((day, index) =>
                                <Text key={index} style={weekDayTextStyle.container}>{day}</Text>
                            )
                        }
                    </View>
                </View>


                <View style={equipmentLevelChangeViewStyle.container}>
                    <View style={smartFanLevelChangeViewStyle.container}>
                        <FanIcon />
                        <Text style={smartFanLevelChangeTextStyle.container}>Smart fan</Text>
                        <Slider
                            style={smartFanLevelChangeSliderStyle.container}
                            minimumValue={1}
                            maximumValue={3}
                            thumbTintColor={"#006A64"}
                        />
                    </View>
                    <View style={smartLightChangeViewStyle.container}>
                        <LightBulbIcon />
                        <Text style={smartLightChangeTextStyle.container}>Smart light</Text>
                        <ToggleSwitch
                            value={smartLightEnabled}
                            onValueChange={toggleSmartLightSwitch}
                            backgroundActive={"#90EE90"}
                            backgroundInactive={"#FFFFFF"}
                            circleBorderActiveColor={"#000000"}
                            circleBorderInactiveColor={"#000000"}
                            containerStyle={smartLightChangeToggleSwitchStyle.container}
                            activeTextStyle={smartLightChangeToggleSwitchStyle.activeText}
                            inactiveTextStyle={smartLightChangeToggleSwitchStyle.inActiveText}
                            switchWidth={25}
                            switchHeight={25}
                            activeText={'On'}
                            inActiveText={'Off'}
                        />
                    </View>
                </View>

                <View style={notificationChangeView.container}>
                    <Text style={notificationChangeText.container}>Notification</Text>
                    <ToggleSwitch
                        containerStyle={notificationChangeToggleSwitch.container}
                        value={notificationEnabled}
                        onValueChange={toggleNotificationEnabledSwitch}
                        switchWidth={35}
                        switchHeight={30}
                        activeTextStyle={notificationChangeToggleSwitch.activeText}
                        inactiveTextStyle={notificationChangeToggleSwitch.inActiveText}
                        backgroundActive={"#90EE90"}
                        backgroundInactive={"#FFFFFF"}
                        circleBorderActiveColor={"#000000"}
                        circleBorderInactiveColor={"#000000"}
                    />
                </View>
                <View style={buttonsViewStyle.container}>
                    <TouchableOpacity
                        style={cancelButtonStyle.container}
                    >
                        <Text style={cancelButtonStyle.text}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={saveButtonStyle.container}
                    >
                        <Text style={saveButtonStyle.text}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <MenuBar />
        </View>
    );
}

const editScheduleScreenViewStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        gap: 50
    }
})

const editScheduleViewStyle = StyleSheet.create({
    container: {
        backgroundColor: '#246EE9',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: '89.22%',
        width: '100%',
    }
});

const topArrowIconViewStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 39,
        justifyContent: "center",
        marginTop: "10.49%"
    }
});

const bottomArrowIconViewStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 39,
        justifyContent: "center",
    }
});

const topArrowIconStyle = StyleSheet.create({
    container: {
        width: 48,
        height: 48
    }
});

const bottomArrowIconStyle = StyleSheet.create({
    container: {
        width: 48,
        height: 48
    }
});

const timeViewStyle = StyleSheet.create({
    container: {
        fontSize: 69,
        textAlign: "center",
        color: "#FFFFFF"
    }
});

const calendarViewStyle = StyleSheet.create({
    container: {
        marginTop: "7.84%",
        display: "flex",
        flexDirection: "column",
        marginLeft: "7.69%",
        justifyContent: "center",
        gap: 17
    }
});

const calendarIconStyle = StyleSheet.create({
    container: {
        width: 48,
        height: 48
    }
});

const daySelectionViewStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 35
    }
})

const dayTextStyle = StyleSheet.create({
    container: {
        fontSize: 24,
        color: "#FFFFFF"
    }
});

const weekDayViewStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 16,

    }
})

const weekDayTextStyle = StyleSheet.create({
    container: {
        fontSize: 18,
        color: "#FFFFFF"
    }
})

const equipmentLevelChangeViewStyle = StyleSheet.create({
    container: {
        height: "23.22%",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        marginLeft: "5.64%",
        marginTop: 10
    }
});

const smartFanLevelChangeViewStyle = StyleSheet.create({
    container: {
        width: "89.74%",
        height: "46.94%",
        backgroundColor: "#FFFFFF",
        borderStyle: "solid",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        gap: 7,
        alignItems: "center",
        marginLeft: 8
    }
});

const smartFanLevelChangeTextStyle = StyleSheet.create({
    container: {
        fontSize: 16,
        color: "#000000"
    }
});

const smartFanLevelChangeSliderStyle = StyleSheet.create({
    container: {
        width: "48.86%",
        height: 200,


    }
})

const smartLightChangeViewStyle = StyleSheet.create({
    container: {
        width: "89.74%",
        height: "43.88%",
        backgroundColor: "#FFFFFF",
        borderStyle: "solid",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        gap: 7,
        alignItems: "center",
        marginLeft: 8
    }
})

const smartLightChangeTextStyle = StyleSheet.create({
    container: {
        fontSize: 16,
        color: "#000000"
    }
});

const smartLightChangeToggleSwitchStyle = StyleSheet.create({
    container: {
        borderStyle: "solid",
        borderColor: "#000000",
        borderWidth: 1,
        width: "24.57%",
        height: "40%",
        marginLeft: "37.14%"
    },
    inActiveText: {
        color: "#FFFFFF"
    },
    activeText: {
        color: "#90EE90",

    }
})

const notificationChangeView = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 126,
        marginTop: "5%",
        marginLeft: "6.92%"
    }
});

const notificationChangeText = StyleSheet.create({
    container: {
        fontSize: 24,
        color: "#FFFFFF",
    }
});

const notificationChangeToggleSwitch = StyleSheet.create({
    container: {
        width: "12.31%",
        height: 48,
    },
    activeText: {
        fontSize: 14,
        color: "#90EE90"
    },
    inActiveText: {
        fontSize: 14,
        color: "#FFFFFF"
    }
});

const buttonsViewStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        gap: 33,
        marginTop: "4.91%",
        marginLeft: "34.87%"
    }
});

const cancelButtonStyle = StyleSheet.create({
    container: {
        backgroundColor: "#90EE90",
        width: 100,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        color: "#000000",
    }
});

const saveButtonStyle = StyleSheet.create({
    container: {
        backgroundColor: "#90EE90",
        width: 100,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        color: "#000000",
    }
});

export default EditScheduleScreen;