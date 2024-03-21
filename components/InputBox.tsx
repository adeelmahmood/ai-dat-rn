import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { TextInput, View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

interface InputBoxProperties {
    value: string;
    setValue: any;
    placeholder: string;
    icon?: any;
    secure?: boolean;
    capitalize?: boolean;
    disabled?: boolean;
    keyboardType?: any;
}

const InputBox: FC<InputBoxProperties> = ({
    value,
    setValue,
    placeholder,
    icon = "",
    secure = false,
    capitalize = false,
    disabled = false,
    keyboardType = "default",
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                keyboardType={keyboardType}
                style={styles.input}
                onChangeText={(text) => setValue(text)}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secure}
                autoCapitalize={capitalize ? "words" : "none"}
                placeholderTextColor="#C2185B50"
            />
            {icon && (
                <View style={styles.icon}>
                    <Ionicons name={icon} size={32} color={COLORS.primary} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.8,
    },
    input: {
        height: 50,
        width: width * 0.8,
        backgroundColor: "#FFFFFF",
        borderColor: "#C2185B",
        borderWidth: 2,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 18,
        color: "#C2185B",
    },
    icon: {
        position: "absolute",
        left: width * 0.8 - 50,
    },
});

export default InputBox;
