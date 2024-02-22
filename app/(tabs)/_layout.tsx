import { Image, Text, SafeAreaView, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "@/constants";
import { useAuth } from "@/providers/auth";
import { faker } from "@faker-js/faker";

const TabsLayout = () => {
    const [avatar, setAvatar] = React.useState("");

    useEffect(() => {
        if (!avatar) {
            setAvatar(faker.image.avatar());
        }
    }, [avatar]);

    // useEffect(() => {
    //     supabase.auth.onAuthStateChange((_event, session) => {
    //         console.log(_event, session);
    //     });
    // }, []);

    const { signOut } = useAuth();

    const onSignOut = async () => {
        await signOut();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* page header */}
            <View className="flex flex-row justify-center items-center border-b border-b-gray-300 px-6 py-3 relative">
                {avatar && (
                    <Image
                        source={{
                            uri: avatar,
                        }}
                        style={{
                            height: 36,
                            width: 36,
                            marginTop: 0,
                            borderRadius: 18,
                        }}
                    />
                )}
                <View
                    style={{
                        marginHorizontal: 12,
                    }}
                >
                    <Text className="font-semibold">Adeel Q</Text>
                    {/* <Text className="text-sm text-gray-800">Talk Space</Text> */}
                </View>
                <View className="absolute right-2">
                    <TouchableOpacity onPress={onSignOut} className="flex flex-row items-center">
                        <Text className="font-semibold text-gray-800 mr-2">Logout</Text>
                        <Ionicons name="log-out-outline" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name="home"
                                size={24}
                                color={focused ? COLORS.primary : "black"}
                            />
                            // <Image
                            //     source={require("@/assets/images/logo3.jpeg")}
                            //     style={{ width: 42, height: 42 }}
                            //     resizeMode="contain"
                            // />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="chat"
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name="chatbubble-ellipses"
                                size={24}
                                color={focused ? COLORS.primary : "black"}
                            />
                            // <Image
                            //     source={require("@/assets/images/logo3.jpeg")}
                            //     style={{ width: 42, height: 42 }}
                            //     resizeMode="contain"
                            // />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="conversations"
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name="heart"
                                size={24}
                                color={focused ? COLORS.primary : "black"}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="dates"
                    options={{
                        tabBarIcon: ({ focused, color }) => (
                            <FontAwesome6
                                name="umbrella-beach"
                                size={24}
                                color={focused ? COLORS.primary : "black"}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        tabBarLabel: "Test",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                name="settings-sharp"
                                size={24}
                                color={focused ? COLORS.primary : "black"}
                            />
                        ),
                    }}
                />
            </Tabs>
        </SafeAreaView>
    );
};

export default TabsLayout;
