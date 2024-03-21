import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions,
    ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import AIChat from "@/components/AIChat";
import { IMessage } from "react-native-gifted-chat";
import { COLORS } from "@/constants";
import BtnLink from "@/components/BtnLink";
import InputBox from "@/components/InputBox";

const { width, height } = Dimensions.get("window");

const Index = () => {
    const router = useRouter();
    const [name, setName] = useState("");

    const welcomeTaglines = [
        "Strap in! We’re about to take your love life from 'Netflix alone' to 'Netflix & chill'. 🛋️❤️",
        "Ready to meet someone who’s as awesome as your dog thinks you are? 🐶💕",
        "Let's find someone who looks at you like you look at your food arriving at a restaurant. 🍽️😍",
        "Swipe fatigue? Let us rekindle your belief in love at first swipe. 💫👩‍❤️‍👨",
        "Welcome to the club where 'Your Type' isn’t just a keyboard setting. 🎹❤️",
        "Here to find you a plus-one so your mom stops asking. We’ve got you. 🤝💐",
        "Looking for love? Or maybe just someone to share your fries with? 🍟💞 Let’s start!",
        "Tired of third-wheeling? Let’s find your ride-or-die! 🛵💑",
        "Because ‘happily ever after’ starts with a 'Hello' on this app. 📱💖",
        "Join the adventure to find someone who’s as chill as a Sunday but excites you like a Friday night! 🌅🎉",
    ];

    return (
        <ImageBackground
            source={require("@/assets/images/simple-sun.jpeg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.taglineText} className="text-pink-800">
                    {welcomeTaglines[Math.floor(Math.random() * welcomeTaglines.length)]}
                </Text>

                <View style={styles.inputView}>
                    <InputBox value={name} setValue={setName} placeholder="Enter your name..." />
                </View>

                <View style={{ width: 150, alignItems: "center" }}>
                    <BtnLink title="Next" href="/profile/city" />
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        width: width * 0.9,
        height: height * 0.5,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "rgba(255, 255, 255, 0.7)", // Soft white overlay to enhance text readability
    },
    taglineText: {
        fontSize: 32,
        lineHeight: 44,
        fontWeight: "bold",
        // color: COLORS.primary,
        textAlign: "center",
    },
    inputView: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
});

export default Index;
