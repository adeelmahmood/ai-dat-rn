import { View, Text, Image, TouchableOpacity, AppState, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import BtnLink from "@/components/BtnLink";
import { COLORS } from "@/constants";
import { supabase } from "@/app/lib/supabase";
import Btn from "@/components/Btn";
import Spinner from "react-native-loading-spinner-overlay";
import InputBox from "@/components/InputBox";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
    if (state === "active") {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

const Connect = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        if (!email || !password) {
            Alert.alert("Must provide email and password");
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        // else router.navigate("profile");
        setLoading(false);
    }

    async function signUpWithEmail() {
        if (!email || !password) {
            Alert.alert("Must provide email and password");
            return;
        }

        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        if (!session) Alert.alert("Please check your inbox for email verification!");
        setLoading(false);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <Spinner visible={loading} />
            <View
                style={{
                    position: "absolute",
                    marginTop: 34,
                    paddingLeft: 14,
                    zIndex: 999,
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={32} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <View className="flex-1 items-center justify-center">
                <Image
                    source={require("@/assets/images/logo3.jpeg")}
                    className="h-56 w-56"
                    resizeMode="contain"
                />
                <Text className="font-extrabold text-2xl mb-4 -top-2">Welcome Back</Text>

                <InputBox
                    value={email}
                    setValue={setEmail}
                    placeholder="Email Address"
                    icon="mail-outline"
                    containerStyles="max-w-xs"
                />

                <InputBox
                    value={password}
                    setValue={setPassword}
                    placeholder="Password"
                    icon="lock-closed-outline"
                    secure={true}
                    containerStyles="max-w-xs mt-2"
                />

                <View className="mt-8 w-full items-center">
                    <Btn title="Sign In" onPress={() => signInWithEmail()} />
                    <Btn
                        title="Register"
                        onPress={() => signUpWithEmail()}
                        containerStyles={{ marginTop: 12 }}
                    />
                </View>

                <View className="mt-8 w-full items-center">
                    <View className="flex flex-row space-x-2 item">
                        <View className="border-t h-1 border-t-gray-200 w-full" />
                        <View className="w-8 -top-2 items-center">
                            <Text className="text-xs text-gray-600 text-center">OR</Text>
                        </View>
                        <View className="border-t h-1 border-t-gray-200 w-full" />
                    </View>

                    <BtnLink
                        title="Connect By Google"
                        href="/"
                        leftIcon="logo-google"
                        containerStyles={{ marginTop: 12 }}
                    />
                    <BtnLink
                        title="Connect By Apple"
                        href="/"
                        leftIcon="logo-apple"
                        containerStyles={{ marginTop: 12 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Connect;
