import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BtnLink from "@/components/BtnLink";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* page header */}
            <View className="flex flex-row justify-end items-center border-b border-b-gray-300 px-6 py-3">
                <TouchableOpacity
                    onPress={() => router.navigate("/connect")}
                    className="flex flex-row items-center"
                >
                    <Text className="font-semibold text-gray-800 mr-2">Logout</Text>
                    <Ionicons name="log-out-outline" size={24} />
                </TouchableOpacity>
            </View>
            <View className="flex-1 items-center justify-center p-4">
                <Image
                    source={require("@/assets/images/abstract-profile.jpeg")}
                    className="h-24 w-24"
                    resizeMode="contain"
                />
                <Text className="font-extrabold text-2xl">Build Your Profile</Text>

                <Text className="text-gray-600">Use these actions to build your profile</Text>

                <View className="flex items-center w-full">
                    <BtnLink
                        title="Your Information"
                        href="/profile/info"
                        rightIcon="checkmark-circle-sharp"
                        containerStyles={{
                            marginTop: 42,
                        }}
                    />
                    <Text className="text-sm text-gray-500 mt-2">
                        (We dont have your information yet)
                    </Text>

                    <BtnLink
                        title="Talk to AI Counselor"
                        href="profile/talk"
                        containerStyles={{
                            marginTop: 42,
                        }}
                    />
                    <Text className="text-sm text-gray-500 mt-2">
                        (You havent started talking to the counselor yet)
                    </Text>

                    {/* <BtnLink
                        title="Connect Your Instagram"
                        href="(auth)"
                        containerStyles={{
                            marginTop: 42,
                        }}
                    />
                    <Text className="text-sm text-gray-500 mt-2">(for pictures)</Text> */}

                    <BtnLink
                        title="Generate My Profile"
                        href="(auth)"
                        disabled={true}
                        containerStyles={{
                            marginTop: 42,
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Profile;
