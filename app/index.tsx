import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import BtnLink from "@/components/BtnLink";

const Welcome = () => {
    return (
        <ImageBackground
            style={{
                flex: 1,
            }}
            source={require("@/assets/images/bg5.png")}
        >
            <View style={{ flex: 3, marginTop: 22, padding: 16 }}></View>
            <View style={styles.bottomContainer}>
                <Text style={styles.bottomTitle}>
                    Enjoy the New Experience of{"\n"}AI Powered Dating
                </Text>
                <Text style={styles.bottomSubtitle}>Driven By Conversation{"\n"}Not Swiping</Text>

                <BtnLink href="/connect" title="Lets Get Started" styles={{}} />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    bottomContainer: {
        flex: 2,
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 56,
        borderTopRightRadius: 56,
        padding: 16,
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
        fontSize: 20,
        fontFamily: "roboto",
        alignItems: "center",
        textAlign: "center",
        color: "gray",
        margin: 16,
        lineHeight: 24,
    },
});

export default Welcome;
