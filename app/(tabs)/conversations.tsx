import { View, StyleSheet, TouchableOpacity, TextInput, Image, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { generateSampleMatches } from "@/utils/generateData";
import { Match } from "@/types";
import timeAgo from "@/utils/timeAgo";

const Conversations = () => {
    const [sampleMatches, setSampleMatches] = useState<Match[]>();

    useEffect(() => {
        if (!sampleMatches) {
            setSampleMatches(generateSampleMatches());
        }
    }, []);

    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                key={index}
                className={`flex flex-row items-center border-b border-b-gray-200 p-2 ${
                    index % 2 !== 0 && "bg-secondary_white"
                }`}
            >
                <View className="px-2 py-2">
                    <Image
                        source={{ uri: item.image }}
                        resizeMode="center"
                        className="w-12 h-12 rounded-full"
                    />
                    {item.isOnline && <View style={styles.onlineIndicator} />}
                </View>

                <View className="ml-2 mr-20">
                    <Text className="font-semibold">{item.username}</Text>
                    <Text className="text-gray-600 mt-1">{item.lastMessage}</Text>
                </View>

                <View
                    style={{
                        position: "absolute",
                        right: 10,
                        top: 8,
                        alignItems: "center",
                    }}
                >
                    <Text className="text-xs text-gray-500">{timeAgo(item.lastMessageTime)}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Page header */}
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
                    <Text className="text-sm text-gray-800">Conversations</Text>
                </View>
            </View>

            {/* Search header */}
            <View className="flex flex-row p-3 bg-secondary_white rounded-md items-center">
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <TextInput className="ml-2" placeholder="Search Conversations" />
            </View>

            {/* Conversations */}
            <View>
                <FlatList
                    data={sampleMatches}
                    renderItem={renderItem}
                    keyExtractor={(item) => item?.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    onlineIndicator: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: COLORS.primary,
        position: "absolute",
        top: 14,
        right: 2,
        zIndex: 999,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
});

export default Conversations;
