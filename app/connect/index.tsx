import {
    View,
    Text,
    Image,
    TouchableOpacity,
    AppState,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import BtnLink from "@/components/BtnLink";
import { COLORS } from "@/constants";
import { supabase } from "@/app/lib/supabase";
import Btn from "@/components/Btn";
import Spinner from "react-native-loading-spinner-overlay";
import InputBox from "@/components/InputBox";
import { useAuth } from "@/providers/auth";

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

    const { authInitialized, user } = useAuth();

    useEffect(() => {
        if (user) {
            router.navigate("/(tabs)/chat");
        }
    }, [user, authInitialized]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [lightMode, setLightMode] = useState(false);

    async function signInWithEmail() {
        if (!email || !password) {
            Alert.alert("Must provide email and password");
            return;
        }

        setLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        console.log("tried logging in with ", email, password);
        console.log(data, error);

        if (error) Alert.alert(error.message);
        else router.navigate("/(tabs)");
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
        <SafeAreaView className={`flex-1 ${lightMode ? "bg-gray-50" : "bg-pink-800"}`}>
            <Spinner visible={loading} />
            <View
                style={{
                    position: "absolute",
                    top: 55,
                    left: 20,
                    zIndex: 1,
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons
                        name="arrow-back-circle-outline"
                        size={32}
                        color={lightMode ? COLORS.primary : COLORS.white}
                    />
                </TouchableOpacity>
            </View>

            <View
                style={{
                    position: "absolute",
                    top: 55,
                    right: 20,
                    zIndex: 1,
                }}
            >
                <TouchableOpacity onPress={() => setLightMode(!lightMode)}>
                    <Ionicons
                        name={`${lightMode ? "toggle-outline" : "toggle"}`}
                        size={32}
                        color={lightMode ? COLORS.primary : COLORS.white}
                    />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == "ios" ? "height" : "padding"}
            >
                <View className="flex-1 items-center justify-center">
                    <Image
                        source={require("@/assets/images/logo3-removebg.png")}
                        className="h-56 w-56"
                        resizeMode="contain"
                    />
                    <Text
                        className={`font-extrabold text-2xl mb-4 -top-2 ${
                            lightMode ? "text-gray-900" : "text-gray-100"
                        }`}
                    >
                        Welcome Back
                    </Text>

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
                        containerStyles="max-w-xs mt-4"
                    />

                    <View className="mt-8 w-full items-center max-w-xs">
                        <Btn
                            title="Sign In"
                            isSecondary={!lightMode}
                            onPress={() => signInWithEmail()}
                        />
                        <Btn
                            title="Register"
                            isSecondary={!lightMode}
                            onPress={() => signUpWithEmail()}
                            containerStyles={{ marginTop: 12 }}
                        />
                    </View>

                    {/* <View className="mt-8 w-full items-center">
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
                </View> */}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Connect;
