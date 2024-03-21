import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
    const router = useRouter();

    const onClose = () => {
        Alert.alert("Close", "Are you sure you want to close the generate profile?", [
            {
                text: "Yes",
                onPress: () => router.navigate("/(tabs)"),
                style: "default",
            },
            {
                text: "No",
                onPress: () => {},
                style: "default",
            },
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-white" edges={["right", "top", "left"]}>
            {/* page header */}
            <View className="flex-row items-center justify-between border-b border-b-gray-300 px-6 py-3">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="flex flex-row items-center"
                >
                    <Ionicons name="arrow-back" size={24} />
                </TouchableOpacity>
                <Text>Generate Profile</Text>
                <TouchableOpacity onPress={onClose} className="flex flex-row items-center">
                    <Ionicons name="close" size={24} />
                </TouchableOpacity>
            </View>

            {/* page contents */}
            <Stack initialRouteName="about">
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="city" options={{ headerShown: false }} />
                <Stack.Screen name="dob" options={{ headerShown: false }} />
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

const styles = StyleSheet.create({});

export default _layout;
