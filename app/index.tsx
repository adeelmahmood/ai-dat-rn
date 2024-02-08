import { View, Text, ImageBackground } from "react-native";
import React from "react";
import BtnLink from "@/components/BtnLink";

const Welcome = () => {
    return (
        <ImageBackground className="flex-1" source={require("@/assets/images/bg5.png")}>
            {/* style={{ flex: 3, marginTop: 22, padding: 16 }} */}
            <View className="flex-1 mt-20 p-16"></View>
            <View className="flex bg-white rounded-t-[48px] p-6 items-center text-center h-80">
                <Text className="text-center items-center mt-2 font-extrabold text-3xl">
                    Enjoy the New Experience of{"\n"}AI Powered Dating
                </Text>
                <Text className="mt-2 text-base items-center text-center font-roboto text-gray-500">
                    Driven By Conversation{"\n"}Not Swiping
                </Text>

                <View className="mt-4 w-full items-center">
                    <BtnLink href="/connect" title="Lets Get Started" />
                    {/* <BtnLink href="/profile" title="Profile" /> */}
                </View>
            </View>
        </ImageBackground>
    );
};

export default Welcome;
