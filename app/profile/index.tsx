import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import BtnLink from "@/components/BtnLink";
import InputBox from "@/components/InputBox";

const Profile = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    return (
        <View className="flex-1 bg-white">
            <ImageBackground
                source={require("@/assets/images/profile/name-girl.jpeg")}
                className="flex-1"
                resizeMethod="scale"
            />
            <View className="flex-1 px-6 py-4">
                <Text className="text-2xl font-roboto-bold">
                    Please tell us a little about yourself
                </Text>

                <View className="mt-6 mb-8">
                    <InputBox
                        placeholder="First Name (required)"
                        value={firstName}
                        setValue={setFirstName}
                        size="lg"
                    />
                    <InputBox
                        placeholder="Last Name"
                        value={lastName}
                        setValue={setLastName}
                        size="lg"
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
