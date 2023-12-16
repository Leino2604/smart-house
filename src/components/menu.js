import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import HomeIcon from "./homeIcon";
import ClockIcon from "./clockIcon";
import SettingIcon from "./settingIcon"
import {LinearGradient} from "expo-linear-gradient";

const MenuBar = () => {
    return (
        <LinearGradient
            colors={["#f9fcff", "#dee4ea"]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={menuBarStyle.container}
        >
            <TouchableOpacity>
                <HomeIcon />
            </TouchableOpacity>
            <TouchableOpacity>
                <ClockIcon />
            </TouchableOpacity>
            <TouchableOpacity>
                <SettingIcon />
            </TouchableOpacity>
        </LinearGradient>
    );
}

/* TODO: need to be refined again */
const menuBarStyle = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        // width: "74%",S
        height: "7%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 30,
        marginLeft: "8%",
    }
});



export default MenuBar;