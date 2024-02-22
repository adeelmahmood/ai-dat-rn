import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import React, { useState } from "react";
import Btn from "@/components/Btn";
import InputBox from "@/components/InputBox";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { useSignUp, useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-expo";

const Page = () => {
    const { signin } = useLocalSearchParams();
    const [code, setCode] = useState("");

    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    const [loading, setLoading] = useState(false);

    const doVerifyCode = async () => {
        if (signin === "true") {
            await verifySignIn();
        } else {
            await verifyCode();
        }
    };

    const verifyCode = async () => {
        try {
            setLoading(true);

            // verify code
            await signUp?.attemptPhoneNumberVerification({
                code: code,
            });

            // set user session
            await setActive!({ session: signUp?.createdSessionId });
        } catch (err) {
            console.log(JSON.stringify(err));
            if (isClerkAPIResponseError(err)) {
                Alert.alert("Error", err.errors[0].message);
            }
        }
        setLoading(false);
    };

    const verifySignIn = async () => {
        try {
            setLoading(true);

            // verify code
            await signIn?.attemptFirstFactor({
                strategy: "phone_code",
                code,
            });

            // set user session
            await setActive!({ session: signIn?.createdSessionId });
        } catch (err) {
            console.log(JSON.stringify(err));
            if (isClerkAPIResponseError(err)) {
                Alert.alert("Error", err.errors[0].message);
            }
        }
        setLoading(false);
    };

    return (
        <SafeAreaView className={`flex-1 bg-gray-50`}>
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
                    <Ionicons name="arrow-back-circle-outline" size={32} color={COLORS.primary} />
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
                    <Text className={`font-extrabold text-2xl mb-4 -top-2 text-gray-900`}>
                        Verify Code
                    </Text>

                    <InputBox
                        value={code}
                        setValue={setCode}
                        placeholder="Enter Code"
                        keyboardType={"numeric"}
                        icon="lock-open"
                        containerStyles="max-w-xs"
                    />

                    <View className="mt-8 w-full items-center max-w-xs">
                        <Btn title="Verify Code" onPress={doVerifyCode} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Page;
