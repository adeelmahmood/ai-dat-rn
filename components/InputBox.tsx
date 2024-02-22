import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { TextInput, View } from "react-native";

interface InputBoxProperties {
    value: string;
    setValue: any;
    placeholder: string;
    icon?: any;
    size?: string;
    secure?: boolean;
    capitalize?: boolean;
    containerStyles?: string;
    disabled?: boolean;
    keyboardType?: any;
}

const InputBox: FC<InputBoxProperties> = ({
    value,
    setValue,
    placeholder,
    icon = "",
    size = "nm",
    secure = false,
    capitalize = false,
    containerStyles = "",
    disabled = false,
    keyboardType = "default",
}) => {
    return (
        <View
            className={`flex flex-row bg-gray-100 items-center rounded-lg px-2 py-2 ${containerStyles}`}
        >
            {icon && (
                <View>
                    <Ionicons name={icon} size={size == "lg" ? 28 : 24} color={COLORS.primary} />
                </View>
            )}
            <TextInput
                keyboardType={keyboardType}
                className={`w-full ${size == "lg" && "text-lg mb-1"} p-2`}
                onChangeText={(text) => setValue(text)}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secure}
                autoCapitalize={capitalize ? "words" : "none"}
            />
        </View>
    );
};

export default InputBox;
