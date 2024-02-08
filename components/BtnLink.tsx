import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface BtnLinkProperties {
    title: string;
    href: any;
    style?: any;
    inverse?: boolean;
    leftIcon?: any;
    rightIcon?: any;
}

const BtnLink: FC<BtnLinkProperties> = ({
    title,
    href,
    style = {},
    inverse = false,
    leftIcon = "",
    rightIcon = "",
}) => {
    return (
        <Link href={href} asChild>
            <TouchableOpacity
                style={{ ...(inverse ? styles.button_inverse : styles.button), ...style }}
                onPress={() => {}}
            >
                <Text style={inverse ? styles.text_inverse : styles.text}>{title}</Text>
                {leftIcon && (
                    <View style={{ position: "absolute", left: 12 }}>
                        <Ionicons name={leftIcon} size={24} color={COLORS.white} />
                    </View>
                )}
                {rightIcon && (
                    <View style={{ position: "absolute", right: 12 }}>
                        <Ionicons name={rightIcon} size={24} color={COLORS.white} />
                    </View>
                )}
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
    button_inverse: {
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 18,
        borderColor: COLORS.primary,
        borderWidth: 2,
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
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
    },
    text_inverse: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default BtnLink;
