import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import BtnLink from "@/components/BtnLink";
import { COLORS } from "@/constants";

const Connect = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View
                style={{
                    position: "absolute",
                    marginTop: 32,
                    paddingLeft: 12,
                    zIndex: 999,
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={32} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <StatusBar hidden />
            <View className="flex-1 items-center justify-center">
                <Image
                    source={require("@/assets/images/logo3.jpeg")}
                    className="h-64 w-64"
                    resizeMode="contain"
                />
                <Text className="font-extrabold text-2xl">Welcome Back</Text>
                <Text className="text-gray-600 mt-2">
                    Continue by connecting your social account
                </Text>
                <BtnLink
                    title="Sign In | Register"
                    href="(auth)"
                    containerStyles={{
                        marginTop: 22,
                    }}
                />
                <BtnLink
                    title="Continue with Instagram"
                    href="(tabs)"
                    containerStyles={{
                        marginTop: 22,
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default Connect;
