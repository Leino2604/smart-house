import React from "react";
import MenuBar from "../components/menu";

const EditScheduleScreen = () => {
    return (
        <View style={styles.container}>
          <Text>For edit schedule</Text>
          <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EditScheduleScreen;