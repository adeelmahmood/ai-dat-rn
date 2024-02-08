import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface BtnLinkProperties {
    title: string;
    href: any;
    containerStyles?: any;
    inverse?: boolean;
    leftIcon?: any;
    rightIcon?: any;
}

const BtnLink: FC<BtnLinkProperties> = ({
    title,
    href,
    containerStyles = {},
    inverse = false,
    leftIcon = "",
    rightIcon = "",
}) => {
    return (
        <Link href={href} asChild>
            <TouchableOpacity
                onPress={() => {}}
                style={{ ...styles.button, ...containerStyles }}
                className="bg-primary px-6 py-3 rounded-2xl w-[80%] shadow-red-600"
            >
                <Text className="text-white font-bold text-center">{title}</Text>
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default BtnLink;
