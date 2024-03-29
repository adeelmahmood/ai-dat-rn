import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import BtnLink from "@/components/BtnLink";

const PreTalk = () => {
    const [dob, setDob] = useState<Date>(new Date());

    return (
        <View className="flex-1 bg-white">
            <ImageBackground
                source={require("@/assets/images/profile/understand.jpeg")}
                className="flex-1"
                resizeMethod="scale"
            />
            <View className="flex-1 px-6 py-4 justify-between">
                <View>
                    <Text className="text-2xl font-roboto-bold">Understand your preferences</Text>

                    <Text className="text-lg font-roboto mt-6">
                        Next, we will ask you some questions to understand what you are looking for.
                    </Text>

                    <Text className="text-lg font-roboto mt-6">
                        This will should only take a couple of mins and you can always come back to
                        finish it.
                    </Text>

                    <Text className="text-lg mt-6 font-roboto-med">
                        Once you are ready, hit the Next button
                    </Text>
                </View>

                {/* bottom buttons */}
                <View className="flex-row items-center justify-between">
                    <BtnLink icon="arrow-back" href="/profile/dob" />
                    <BtnLink icon="arrow-forward" href="/profile/talk" />
                </View>
            </View>
        </View>
    );
};

export default PreTalk;
