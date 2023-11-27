import React from "react";
import { View, Image, StyleSheet } from "react-native";

const MenuBar = () => {
    return (
        <View style={menuBarStyle.container}>
            <Image 
                source={require("../assets/home_icon.png")}
                style={homeIconStyle.container}
            />
            <Image 
                source={require("../assets/clock_icon.png")}
                style={clockIconStyle.container}
            />
            <Image 
                source={require("../assets/setting_icon.png")}
                style={settingIconStyle.container}
            />
        </View>
    );
}

const menuBarStyle = StyleSheet.create({
    container: {
        display: "flex",
        width: "74%",
        height: "4.27%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        marginLeft: "12.82%",
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
    }
});

const homeIconStyle = StyleSheet.create({
    container: {
        width: 42,
        height: 42
    }
});

const clockIconStyle = StyleSheet.create({
    container: {
        width: 35,
        height: 35
    }
});

const settingIconStyle = StyleSheet.create({
    container: {
        width: 42,
        height: 42
    }
})

export default MenuBar;