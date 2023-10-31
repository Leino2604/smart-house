import React from "react";
import MenuBar from "../components/menu";

const ScheduleScreen = () => {
  return (
    <View style={styles.container}>
      <Text>For Schedule Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScheduleScreen;
