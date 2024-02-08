import { View, Text, TouchableOpacity, StatusBar, Image, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import BtnLink from "@/components/BtnLink";

const Profile = () => {
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
                    source={require("@/assets/images/abstract-profile.jpeg")}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.bottomTitle}>Build Your Profile</Text>

                <Text style={styles.bottomSubtitle}>Use these actions to build your profile</Text>

                <BtnLink
                    title="Your Information"
                    href="/profile/info"
                    rightIcon="checkmark-circle-sharp"
                    style={{
                        marginTop: 42,
                    }}
                />
                <Text style={styles.btnInfoText}>(We dont have your information yet)</Text>

                <BtnLink
                    title="Talk to AI Counselor"
                    href="(tabs)"
                    style={{
                        marginTop: 42,
                    }}
                />
                <Text style={styles.btnInfoText}>
                    (You havent started talking to the counselor yet)
                </Text>

                <BtnLink
                    title="Connect Your Instagram"
                    href="(auth)"
                    style={{
                        marginTop: 42,
                    }}
                />
                <Text style={styles.btnInfoText}>(for pictures)</Text>
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
        backgroundColor: "white",
        padding: 16,
    },
    logo: {
        width: 92,
        height: 92,
    },
    bottomTitle: {
        fontSize: 32,
        fontFamily: "roboto-med",
        alignItems: "center",
        textAlign: "center",
        color: "black",
        marginTop: 8,
    },
    bottomSubtitle: {
        fontSize: 16,
        alignItems: "center",
        color: "gray",
        margin: 5,
    },
    btnInfoText: {
        fontSize: 14,
        alignItems: "center",
        color: "gray",
        margin: 8,
    },
});

export default Profile;
