import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import BtnLink from "@/components/BtnLink";

const DoB = () => {
    const [dob, setDob] = useState<Date>(new Date());

    return (
        <View className="flex-1 bg-white">
            <ImageBackground
                source={require("@/assets/images/profile/dob.png")}
                className="flex-1"
                resizeMethod="scale"
            />
            <View className="flex-1 px-6 py-4">
                <Text className="text-2xl font-roboto-bold">What is your date of birth?</Text>

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

                <View className="flex-row items-center justify-between">
                    <BtnLink icon="arrow-back" href="/profile/city" />
                    <BtnLink icon="arrow-forward" href="/profile/pretalk" />
                </View>
            </View>
        </View>
    );
};

export default DoB;
