import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { COLORS } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Btn from "@/components/Btn";
import { useRouter } from "expo-router";

export default function YourInformation() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    return (
        <SafeAreaView style={styles.bg}>
            <View style={styles.container}>
                <View style={styles.emailContainer}>
                    {/* <View>
                        <Ionicons name="mail-outline" size={24} color={COLORS.primary} />
                    </View> */}
                    <TextInput
                        style={styles.emailInput}
                        onChangeText={(text) => setName(text)}
                        value={name}
                        placeholder="Your Name"
                        autoCapitalize={"none"}
                    />
                </View>

                <View style={{ marginTop: 22 }}>
                    <Btn title="Update" />
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
