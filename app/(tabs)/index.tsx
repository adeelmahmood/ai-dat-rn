import React, { useState, useCallback, useEffect } from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet, Image, Text } from "react-native";
import { GiftedChat, Bubble, Send, Composer, IMessage } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DEFAULT_PROMPT } from "@/constants/prompts";
import { COLORS } from "@/constants";
import { useRouter } from "expo-router";

const OPEN_AI_KEY = process.env.EXPO_PUBLIC_OPEN_AI_KEY;

const Chat = () => {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const prepareMessagesForGpt = (messages: IMessage[]) => {
        const msgs = messages.map((m: IMessage) => ({
            role: m.user._id == 1 ? "user" : "assistant",
            content: m.text,
        }));
        const systemMessage = {
            role: "system",
            content: DEFAULT_PROMPT,
        };
        return [systemMessage, ...msgs.reverse()];
    };

    const gpt = () => {
        setIsTyping(true);
        const preparedMessages = prepareMessagesForGpt(messages);
        console.log(preparedMessages);

        // make call to ai agent yes
        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPEN_AI_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: preparedMessages,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const aiMessage = {
                    _id: Math.random().toString(),
                    text: data.choices[0].message.content.trim(),
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "Assistant",
                    },
                };

                setMessages((previousMessages) => GiftedChat.append(previousMessages, [aiMessage]));
            })
            .catch((err) => console.log(err))
            .finally(() => setIsTyping(false));
    };

    const onSend = useCallback(async (msgs = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, msgs));
    }, []);

    useEffect(() => {
        // start the conversation
        if (messages.length == 0 && false) gpt();
        else {
            const lastMessage: any = messages[0];
            // console.log("lastMessage..", lastMessage);
            // user message
            // if (lastMessage?.user._id == 1) {
            //     gpt();
            // }
        }
        // gpt();
        // console.log("messages.. => ", messages);
    }, [messages]);

    const renderBubble = (props: any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: COLORS.primary,
                        marginVertical: 6,
                        marginRight: 12,
                    },
                }}
            ></Bubble>
        );
    };

    const renderSend = (props: any) => {
        return (
            <Send {...props} containerStyle={styles.sendContainer}>
                <Ionicons name="chatbubble" size={24} color={COLORS.primary} />
            </Send>
        );
    };

    // const renderComposer = (props: any) => {
    //     return <Composer {...props} textInputStyle={styles.inputMessageContainer} />;
    // };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1">
                <View className="flex flex-row justify-center items-center border-b border-b-gray-300 px-6 py-3">
                    <Image
                        source={require("../../assets/images/face.png")}
                        style={{
                            height: 36,
                            width: 36,
                            marginTop: 0,
                        }}
                    />
                    <View
                        style={{
                            marginHorizontal: 12,
                        }}
                    >
                        <Text className="font-semibold">Adeel Q</Text>
                        <Text className="text-sm text-gray-800">Talk Space</Text>
                    </View>
                </View>

                <GiftedChat
                    messages={messages}
                    onSend={(newMessages: any) => onSend(newMessages)}
                    user={{
                        _id: 1,
                    }}
                    isTyping={isTyping}
                    renderBubble={renderBubble}
                    alwaysShowSend
                    renderSend={renderSend}
                    // renderAvatar={renderAvatar}
                    // bottomOffset={34} //{insets.bottom}
                    // wrapInSafeArea={false}
                    bottomOffset={insets.bottom}
                    // renderComposer={renderComposer}
                />
                {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // inputContainer: {
    //     backgroundColor: "white",
    //     height: 72,
    //     marginHorizontal: 5,
    // },
    // inputMessageContainer: {
    //     backgroundColor: "#F6f6f6",
    //     borderRadius: 16,
    //     borderColor: "#f0f0f0",
    //     borderWidth: 1,
    //     paddingHorizontal: 22,
    // },
    // input: {
    //     flex: 1,
    // },
    sendContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginRight: 15,
    },
});

export default Chat;
