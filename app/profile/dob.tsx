import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
import React, { useState } from "react";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import BtnLink from "@/components/BtnLink";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const DoB = () => {
    const insets = useSafeAreaInsets();
    const [dob, setDob] = useState<Date>(new Date());

    return (
        <ImageBackground
            source={require("@/assets/images/simple-sun.jpeg")}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={{ marginBottom: insets.bottom }}>
                <View style={styles.overlay}>
                    <Text className="text-2xl font-roboto-bold text-center text-pink-700">
                        What is your date of birth?
                    </Text>

                    <View className="mt-6 mb-8">
                        <RNDateTimePicker
                            value={dob}
                            display="spinner"
                            onChange={(event: DateTimePickerEvent, date?: Date) => {
                                const {
                                    type,
                                    // nativeEvent: { timestamp, utcOffset },
                                } = event;

                                if (type == "set" && date) {
                                    setDob(date);
                                }
                            }}
                        />
                    </View>
                </View>

                <View style={{ flex: 1 }}></View>

                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonsRow}>
                        <BtnLink icon="arrow-back" href="/profile/city" />
                        <BtnLink icon="arrow-forward" href="/profile/pretalk" />
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        width: width * 0.9,
        height: height * 0.5,
        justifyContent: "center",
    },
    buttonsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    buttonsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: width * 0.9,
    },
});

export default DoB;
