import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Button} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Colors from '../constants/colors'
const Hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
const Minutes = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",]

const TimeSelector = ({limit, defaultOffsetHour, onSave}) => {
    const [selectedHour, setSelectedHour] = useState(defaultOffsetHour)
    const [selectedMinute, setSelectedMinute] = useState("00")
    const defaultOffset = limit * (defaultOffsetHour);
    

    function handleSelectedHour(event) {
        let HoursYScroll = event.nativeEvent.contentOffset.y;
        if (HoursYScroll < 0) {
            setSelectedHour("00");
            return;
        }
        if (HoursYScroll > (limit * 24)) {
            setSelectedHour("23");
            return;
        }
        for (let i = 0; i < 24; i++) {
            let a = i * limit
            let b = (i + 1) * limit
            if (HoursYScroll > a && HoursYScroll < b) {
                if (selectedHour !== Hours[i]) {
                    setSelectedHour(Hours[i])
                    Haptics.selectionAsync()
                    return;
                }
            }
        }
    }
    

    function handleSelectedMinutes(event) {
        let MinutesYScroll = event.nativeEvent.contentOffset.y;
        if (MinutesYScroll < 0) {
            setSelectedMinute("00");
            return;
        }
        if (MinutesYScroll > (limit * 60)) {
            setSelectedMinute("59");
            return;
        }
        for (let i = 0; i < 60; i++) {
            let a = i * limit
            let b = (i + 1) * limit
            if (MinutesYScroll > a && MinutesYScroll < b) {
                if (selectedMinute !== Minutes[i]) {
                    setSelectedMinute(Minutes[i])
                    Haptics.selectionAsync()
                    return;
                }
            }
        }
    }

    function handleTimeConfirmation(hourAsString, minuteAsString) {
        
    }


    return (
        <View>
            <View style={styles.pickerContainer}>
                <View style={styles.scrollContainer}>
                    <ScrollView
                        contentOffset={{
                            x: 0,
                            y: defaultOffset,
                        }}
                        scrollEventThrottle={16}
                        onScroll={handleSelectedHour}
                        showsVerticalScrollIndicator={false}
                    >

                        <View style={{ paddingVertical: 170 }}>
                            {Hours.map((item, index) => {
                                return <View style={styles.timeView} key={item}>
                                    <Text style={styles.timeText}>{item}:</Text>
                                </View>
                            })}
                        </View>
                    </ScrollView>
                </View>
                
                <View style={styles.scrollContainer}>
            
                    <ScrollView
                        scrollEventThrottle={60}
                        onScroll={handleSelectedMinutes}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ paddingVertical: 170 }}>
                            {Minutes.map((item, index) => {
                                return (
                                    <View style={styles.timeView} key={item}>
                                        <Text style={styles.timeText}>{item}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                </View>
                
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    pickerContainer: {
        alignSelf: "center",
        width: "75%",
        height: 70,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 0,
    },
    scrollContainer: {
        width: "30%",
        height: 70,
       // borderWidth: 1
    },
    timeView: {
        width: "100%",
    },
    timeText: {
        fontSize: 50,
        color: "#E5E5E5",
        alignSelf: "center",
        // paddingVertical: 12
    },
});


export default TimeSelector;