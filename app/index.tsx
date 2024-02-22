import { View, Text, ImageBackground } from "react-native";
import React from "react";
import BtnLink from "@/components/BtnLink";
import { StatusBar } from "expo-status-bar";

const Welcome = () => {
    {
        /* <View className="h-screen">
        <View className="h-[70%]">
            <Image
                source={require("@/assets/images/bg5.png")}
                className="w-full h-full object-contain object-center"
            >
            </Image>
        </View>
        <View className="h-full bg-pink-50 rounded-t-[48px] p-6 items-center text-center -top-32">
            <Text className="text-center items-center mt-4 font-extrabold text-3xl">
                Enjoy the New Experience of{"\n"}AI Powered Dating
            </Text>
            <Text className="mt-2 text-base items-center text-center font-roboto text-gray-500">
                Driven By Conversation{"\n"}Not Swiping
            </Text>

            <View className="mt-4 w-full items-center">
                <BtnLink href="/connect" title="Lets Get Started" />
            </View>
        </View>
        </View> */
    }

    return (
        <ImageBackground className="flex-1" source={require("@/assets/images/bg5.png")}>
            <View className="flex-1"></View>
            <View className="flex bg-white rounded-t-[48px] p-6 items-center text-center h-80">
                <Text className="text-center items-center mt-2 font-extrabold text-3xl">
                    Enjoy the New Experience of{"\n"}AI Powered Dating
                </Text>
                <Text className="mt-2 text-base items-center text-center font-roboto text-gray-500">
                    Driven By Conversation{"\n"}Not Swiping
                </Text>

                <View className="mt-4 w-full items-center">
                    <BtnLink href="/connect" title="Lets Get Started" />
                </View>
            </View>
        </ImageBackground>
    );
};

export default Welcome;
