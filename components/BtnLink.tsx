import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Link } from "expo-router";
import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

interface BtnLinkProperties {
    title: string;
    href: any;
    containerStyles?: any;
    leftIcon?: any;
    rightIcon?: any;
    disabled?: boolean;
}

const BtnLink: FC<BtnLinkProperties> = ({
    title,
    href,
    containerStyles = {},
    leftIcon = "",
    rightIcon = "",
    disabled = false,
}) => {
    return (
        <Link href={href} asChild>
            <TouchableOpacity
                onPress={() => {}}
                disabled={disabled}
                activeOpacity={0}
                style={{ ...styles.button, ...containerStyles }}
                className={`${
                    !disabled ? "bg-primary" : "bg-pink-50"
                } px-6 py-3 rounded-2xl w-[80%] justify-center`}
            >
                <Text
                    className={`${
                        !disabled ? "text-white" : "text-pink-300"
                    } font-bold text-center`}
                >
                    {title}
                </Text>
                {leftIcon && (
                    <View className="absolute left-2">
                        <Ionicons name={leftIcon} size={24} color={COLORS.white} />
                    </View>
                )}
                {rightIcon && (
                    <View className="absolute right-2">
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
