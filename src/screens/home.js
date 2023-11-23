import React, { useState } from "react";
import MenuBar from "../components/menu";
import {ScrollView, StatusBar, View, StyleSheet, Text, Image} from "react-native";
import UserIcon from "../components/userIcon";
import FanIcon from "../components/fanIcon";
import ToggleSwitch from "../components/ToggleSwitch";
import LightBulbIcon from "../components/lightBulbIcon";

const HomeScreen = () => {
    const [user, setUser] = useState(initialUser);
    const [fanEnabled, setFanEnabled] = useState(initialFanEnabled);
    const [lightEnabled, setLightEnabled] = useState(initialLightEnabled);
   
    function handleFanEnabledToggleSwitch() {
        setFanEnabled(currState => !currState);
    }

    function handleLightEnabledToggleSwitch() {
        setLightEnabled(currState => !currState);
    }

    return (
        <View
            style={homeScreenStyle.container} 
        >
            <View
                style={homeScreenStyle.main}
            >
                <StatusBar 
                    backgroundColor={"#246EE9"}
                />
                <View
                    style={userInfoStyle.container}
                >
                    <Text style={userInfoStyle.greetingMsg}>Hi {user.name}</Text>
                    <View
                        style={userInfoStyle.icon}
                    >
                        <UserIcon />
                    </View>
                </View>
                <View
                    style={equipmentInfoStyle.container}
                >
                    <Text style={equipmentInfoStyle.title}>Devices</Text>
                    <View
                        style={equipmentInfoStyle.content}
                    >
                        <View
                            style={fanStyle.container}
                        >
                            <View
                                style={fanStyle.content}
                            >
                                <FanIcon />
                                <ToggleSwitch
                                    value={fanEnabled}
                                    onValueChange={handleFanEnabledToggleSwitch}
                                    activeText={"On"}
                                    inactiveText={"Off"}
                                    activeTextStyle={fanEnabledToggleSwitchStyle.activeText}
                                    inactiveTextStyle={fanEnabledToggleSwitchStyle.inactiveText}
                                    backgroundInactive={"#EDEADE"}
                                    backgroundActive={"#90EE90"}
                                    containerStyle={fanEnabledToggleSwitchStyle.container}
                                    circleInActiveColor={"#FFFFFF"}
                                    
                                />
                            </View>
                            <Text style={fanStyle.title}>Smart Fan</Text>
                        </View>
                        <View
                            style={lightStyle.container}
                        >
                            <View
                                style={lightStyle.content}
                            >
                                <LightBulbIcon />
                                <ToggleSwitch
                                    value={lightEnabled}
                                    onValueChange={handleLightEnabledToggleSwitch}
                                    activeText={"On"}
                                    inactiveText={"Off"}
                                    activeTextStyle={lightEnabledToggleSwitchStyle.activeText}
                                    inactiveTextStyle={fanEnabledToggleSwitchStyle.inactiveText}
                                    backgroundInactive={"#F9F6EE"}
                                    backgroundActive={"#90EE90"}
                                    containerStyle={lightEnabledToggleSwitchStyle.container}
                                    circleInActiveColor={"#121212"}
                                    
                                />
                            </View>
                            <Text style={fanStyle.title}>Smart Light</Text>
                        </View>
                    </View>
                </View>
            </View>
            <MenuBar />
        </View>
    );
}

const homeScreenStyle = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        height: "100%",
        gap: 39
    },
    main: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "89.22%",
        backgroundColor: "#246EE9",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }
});

const userInfoStyle = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "9.49%",
        marginTop: "9.69%"
    },
    icon: {
        width: 48,
        height: 48,
        marginLeft: "50%",
        borderRadius: 24,
        borderColor: "#000000",
        borderWidth: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },
    greetingMsg: {
        fontSize: 24,
        color: "#FFFFFF",
        fontWeight: "bold",
    }

});

const equipmentInfoStyle = StyleSheet.create({
    container: {
        marginTop: "10.62%",
        marginLeft: "9.49%"
    },
    title: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 24,
    },
    content: {
        display: "flex",
        flexDirection: "column",
        gap: 26,
        marginTop: "6.24%",
    }
});

const fanStyle = StyleSheet.create({
    container: {
        width: "89.74%",
        height: 165, // TODO: use relative unit instead
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        gap: 51
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 194, // TODO: relative unit
        marginTop: 33, // TODO: relative unit
    },
    title: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 25
    }
});

const lightStyle = StyleSheet.create({
    container: {
        width: "89.74%",
        height: 165, // TODO: use relative unit instead
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        gap: 51
    },
    content: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 194, // TODO: relative unit
        marginTop: 33, // TODO: relative unit
    },
    title: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 25
    }
});

const fanEnabledToggleSwitchStyle = StyleSheet.create({
    container: {
        borderWidth: 1
    },
    activeText: {
        color: "#90EE90"
    },
    inactiveText: {
        
        color: "#F9F6EE"
    }
});

const lightEnabledToggleSwitchStyle = StyleSheet.create({
    container: {
        borderWidth: 1
    },
    activeText: {
        color: "#90EE90"
    },
    inactiveText: {
        
        color: "#F9F6EE"
    }
});

const initialUser = {
    name: "John"
};

const initialFanEnabled = false;
const initialLightEnabled = false;


export default HomeScreen;