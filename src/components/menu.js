import React from "react";

const MenuBar = () => {
    return (
        <View style={styles.container}>
          <Text>For Menu Bar</Text>
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

export default MenuBar;