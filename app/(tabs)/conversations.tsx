import { View, StyleSheet, TouchableOpacity, TextInput, Image, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { SAMPLE_MATCHES } from "@/constants/data";
import { COLORS } from "@/constants/colors";

const Conversations = () => {
    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                key={index}
                style={[styles.userContainer, index % 2 !== 0 ? styles.oddBackground : null]}
            >
                <View style={styles.userImageContainer}>
                    <Image source={item.image} resizeMode="center" style={styles.userImage} />
                    {item.isOnline && <View style={styles.onlineIndicator} />}
                </View>

                <View>
                    <Text style={{ fontWeight: "bold" }}>{item.username}</Text>
                    <Text style={{ marginTop: 5, color: COLORS.norm_gray }}>
                        {item.lastMessage}
                    </Text>
                </View>

                <View
                    style={{
                        position: "absolute",
                        right: 10,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: 12, color: COLORS.norm_gray }}>
                        {item.lastMessageTime}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.area}>
            <View style={styles.container}>
                {/* Page header */}
                <View style={styles.header}>
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
                        <Text style={styles.headerTitle}>Adeel Q</Text>
                        <Text style={styles.headerSubtitle}>Conversations</Text>
                    </View>
                </View>

                {/* Search header */}
                <View style={styles.searchContainer}>
                    <TouchableOpacity>
                        <Ionicons name="search" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                    <TextInput style={styles.searchInput} placeholder="Search Conversations" />
                </View>

                {/* Conversations */}
                <View>
                    <FlatList
                        data={SAMPLE_MATCHES}
                        renderItem={renderItem}
                        keyExtractor={(item) => item?.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        borderBottomColor: "gray",
        borderBottomWidth: 0.3,
    },
    headerTitle: {
        fontWeight: "bold",
    },
    headerSubtitle: {},
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.secondary_white,
        height: 50,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginBottom: 10,
    },
    searchInput: {
        flex: 1,
        marginHorizontal: 10,
        height: "100%",
        backgroundColor: COLORS.secondary_white,
    },
    userContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: COLORS.warm_gray,
        borderBottomWidth: 0.5,
        paddingHorizontal: 12,
    },
    userImageContainer: {
        paddingVertical: 15,
        marginRight: 22,
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
    },
    oddBackground: {
        backgroundColor: COLORS.secondary_white,
    },
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
