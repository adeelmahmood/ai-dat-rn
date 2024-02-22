import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* page header */}
            <View className="flex flex-row justify-end items-center border-b border-b-gray-300 px-6 py-3">
                <TouchableOpacity
                    onPress={() => router.navigate("/(tabs)")}
                    className="flex flex-row items-center"
                >
                    <Text className="font-semibold text-gray-800 mr-2">Close</Text>
                    <Ionicons name="close" size={24} />
                </TouchableOpacity>
            </View>

            {/* page contents */}
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="city" options={{ headerShown: false }} />
                <Stack.Screen name="dob" options={{ headerShown: false }} />
                <Stack.Screen name="pretalk" options={{ headerShown: false }} />
                <Stack.Screen name="talk" options={{ headerShown: false }} />
                {/* <Stack.Screen
                name="info"
                options={{
                    headerShown: true,
                    presentation: "modal",
                    headerTitle: "Your Information",
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="close" size={24} />
                        </TouchableOpacity>
                    ),
                }}
            /> */}
            </Stack>
        </SafeAreaView>
    );
};

export default _layout;
