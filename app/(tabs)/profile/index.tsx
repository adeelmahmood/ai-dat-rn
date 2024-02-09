import { View, Text, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BtnLink from "@/components/BtnLink";

const Profile = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* page header */}
            <View className="flex flex-row justify-center items-center border-b border-b-gray-300 px-6 py-3">
                <Image
                    source={require("@/assets/images/face.png")}
                    style={{
                        height: 36,
                        width: 36,
                        marginTop: 0,
                    }}
                />
                <View
                    style={{
                        marginHorizontal: 12,
                    }}
                >
                    <Text className="font-semibold">Adeel Q</Text>
                    <Text className="text-sm text-gray-800">Talk Space</Text>
                </View>
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
                        href="/profile/ai"
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
