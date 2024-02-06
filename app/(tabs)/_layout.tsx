import { Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "@/constants";

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
            initialRouteName="index"
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Image
                            source={require("@/assets/images/logo3.jpeg")}
                            style={{ width: 42, height: 42 }}
                            resizeMode="contain"
                        />
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
    );
};

export default TabsLayout;
