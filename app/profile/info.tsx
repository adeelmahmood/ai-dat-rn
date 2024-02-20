import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import { COLORS } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Btn from "@/components/Btn";
import { useRouter } from "expo-router";

export default function YourInformation() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 mb-4">
                <Text className="text-xl">Provide Your Information</Text>
            </View>

            <View className="px-6 py-2">
                <Text className="font-semibold text-lg ml-1">Name</Text>
                <View className="">
                    <TextInput
                        className="bg-secondary_white p-4 rounded-lg mt-1"
                        onChangeText={(text) => setName(text)}
                        value={name}
                        placeholder="Your Name"
                        autoCapitalize={"none"}
                    />
                </View>
            </View>

            <View className="px-6 py-2 mt-2">
                <Text className="font-semibold text-lg ml-1">City</Text>
                <View className="">
                    <TextInput
                        className="bg-secondary_white p-4 rounded-lg mt-1"
                        onChangeText={(text) => setName(text)}
                        value={name}
                        placeholder="Your Name"
                        autoCapitalize={"none"}
                    />
                </View>
            </View>

            <View className="px-6 py-2 mt-2">
                <Text className="font-semibold text-lg ml-1">Date of Birth</Text>
                <View className="">
                    <TextInput
                        className="bg-secondary_white p-4 rounded-lg mt-1"
                        onChangeText={(text) => setName(text)}
                        value={name}
                        placeholder="Your Name"
                        autoCapitalize={"none"}
                    />
                </View>
            </View>

            <View className="mt-6 w-full items-center">
                <Btn title="Update" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
        backgroundColor: "white",
        padding: 16,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: "stretch",
    },
    mt20: {
        marginTop: 20,
    },
    emailContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary_white,
        height: 50,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 10,
    },
    emailInput: {
        flex: 1,
        marginHorizontal: 10,
        height: "100%",
        backgroundColor: COLORS.secondary_white,
    },
});
