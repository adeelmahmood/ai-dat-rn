import { Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";

const BtnLink = (props: { title: string; href: any; styles: {} }) => {
    return (
        <Link href={props.href} asChild>
            <TouchableOpacity style={{ ...styles.button, ...props.styles }} onPress={() => {}}>
                <Text style={styles.text}>{props.title}</Text>
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
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

export default BtnLink;
