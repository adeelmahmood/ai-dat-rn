import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";

const Btn = ({
    title,
    onPress = () => {},
    containerStyles = {},
    isSecondary = false,
}: {
    title: string;
    onPress?: any;
    containerStyles?: any;
    isSecondary?: boolean;
}) => {
    return (
        <TouchableOpacity
            style={{ ...styles.button, ...containerStyles }}
            onPress={onPress}
            className={`${
                isSecondary ? "bg-gray-50" : "bg-primary"
            } px-6 py-3 rounded-2xl w-[80%] shadow-red-600`}
        >
            <Text className={`${isSecondary ? "" : "text-white"} font-bold text-center`}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Btn;
