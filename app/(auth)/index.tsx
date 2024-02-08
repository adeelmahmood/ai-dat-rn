import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    View,
    AppState,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import { supabase } from "../lib/supabase";
import { COLORS } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import BtnLink from "@/components/BtnLink";
import Btn from "@/components/Btn";
import { Stack, useRouter } from "expo-router";

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

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) Alert.alert(error.message);
        else router.replace("/(tabs)");
        setLoading(false);
    }

    async function signUpWithEmail() {
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
        <SafeAreaView style={styles.bg}>
            <View style={styles.container}>
                <View style={styles.emailContainer}>
                    <View>
                        <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
                    </View>
                    <TextInput
                        style={styles.emailInput}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        placeholder="Email Address"
                        autoCapitalize={"none"}
                    />
                </View>

                <View style={styles.emailContainer}>
                    <View>
                        <Ionicons name="lock-closed-outline" size={24} color={COLORS.primary} />
                    </View>
                    <TextInput
                        style={styles.emailInput}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                        placeholder="Password"
                    />
                </View>

                <View style={{ marginTop: 22 }}>
                    <Btn title="Sign In" onPress={() => signInWithEmail()} styles={{}} />
                    <Btn
                        title="Register"
                        onPress={() => signUpWithEmail()}
                        styles={{ marginTop: 22 }}
                    />
                </View>
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
