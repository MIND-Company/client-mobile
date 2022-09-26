import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: '#EFF1FB',
        paddingTop: Platform.OS === "android" ? "10%" : 0
    }
});
