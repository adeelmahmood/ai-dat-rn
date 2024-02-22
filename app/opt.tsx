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
import { router } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { useSignUp } from "@clerk/clerk-react";
import { useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-expo";

const Page = () => {
    const [phone, setPhone] = useState("");

    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    const [loading, setLoading] = useState(false);

    const sendCode = async () => {
        try {
            setLoading(true);

            // start sign up process
            await signUp?.create({
                phoneNumber: phone,
            });

            // send code
            await signUp?.preparePhoneNumberVerification();

            router.push("/verify");
        } catch (err: any) {
            console.log(JSON.stringify(err));

            // if number already verified
            if (isClerkAPIResponseError(err)) {
                if (err.errors[0].code === "form_identifier_exists") {
                    await trySignIn();
                } else {
                    Alert.alert("Error", err.errors[0].message);
                }
            }
        }
        setLoading(false);
    };

    const trySignIn = async () => {
        // sign in factors
        const { supportedFirstFactors } = await signIn!.create({
            identifier: phone,
        });
        console.log("supportedFirstFactors", supportedFirstFactors);

        // look for phone code factor
        const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
            return factor.strategy === "phone_code";
        });
        console.log("firstPhoneFactor", firstPhoneFactor);

        // sign in using phone code factor
        const { phoneNumberId } = firstPhoneFactor;
        console.log("phoneNumberId", phoneNumberId);
        await signIn?.prepareFirstFactor({
            strategy: "phone_code",
            phoneNumberId,
        });
        console.log("all done");

        router.push(`/verify?signin=true`);
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
                        Login Using Phone
                    </Text>

                    <InputBox
                        value={phone}
                        setValue={setPhone}
                        placeholder="Phone number"
                        keyboardType={"phone-pad"}
                        icon="keypad"
                        containerStyles="max-w-xs"
                    />

                    <View className="mt-8 w-full items-center max-w-xs">
                        <Btn title="Send Code" onPress={sendCode} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Page;
