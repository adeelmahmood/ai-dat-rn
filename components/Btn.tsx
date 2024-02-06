import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";

const Btn = (props: { title: string; onPress: () => {}; styles: {} }) => {
    return (
        <TouchableOpacity style={{ ...styles.button, ...props.styles }} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary, // Dark pink as the base color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: "80%",
    },
    text: {
        color: "white", // White text for contrast
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Btn;
