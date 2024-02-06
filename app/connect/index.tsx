import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import BtnLink from "@/components/BtnLink";
import { COLORS } from "@/constants";

const Connect = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.bg}>
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
            <View style={styles.container}>
                <Image
                    source={require("@/assets/images/logo3.jpeg")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.bottomTitle}>Welcome Back</Text>
                <Text style={styles.bottomSubtitle}>
                    Continue by connecting your social account
                </Text>
                <BtnLink
                    title="Continue with Instagram"
                    href="(tabs)"
                    styles={{
                        marginTop: 22,
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        padding: 16,
    },
    logo: {
        width: 92,
        height: 92,
    },
    bottomTitle: {
        fontSize: 32,
        fontFamily: "roboto-bold",
        alignItems: "center",
        textAlign: "center",
        color: "black",
        marginTop: 16,
    },
    bottomSubtitle: {
        fontSize: 16,
        alignItems: "center",
        color: "gray",
        margin: 5,
    },
});

export default Connect;
