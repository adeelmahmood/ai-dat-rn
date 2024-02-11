import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
    const router = useRouter();

    return (
        <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
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
            />
            <Stack.Screen name="talk" options={{ headerShown: false }} />
        </Stack>
    );
};

export default _layout;
