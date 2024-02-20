import { View, Text } from "react-native";
import React, { useState } from "react";
import BtnLink from "@/components/BtnLink";
import InputBox from "@/components/InputBox";
import LottieView from "lottie-react-native";

const Profile = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    return (
        <View className="flex-1 bg-white">
            <LottieView
                source={require("@/assets/animations/face-looking-at-you.json")}
                style={{ flex: 1 }}
                autoPlay
                duration={3000}
                loop
            />
            <View className="flex-1 px-6 py-4">
                <Text className="text-2xl font-roboto-bold">Tell us a little about yourself</Text>

                <View className="mt-6 mb-8">
                    <InputBox
                        placeholder="First Name (required)"
                        value={firstName}
                        setValue={setFirstName}
                    />
                    <InputBox
                        placeholder="Last Name"
                        value={lastName}
                        setValue={setLastName}
                        containerStyles="mt-8"
                    />
                </View>

                <View className="flex items-end">
                    <BtnLink icon="arrow-forward" href="/profile/city" />
                </View>
            </View>
        </View>
    );
};

export default Profile;
