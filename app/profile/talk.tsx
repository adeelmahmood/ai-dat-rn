import React, { useState, useCallback, useEffect } from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet, Image, Text } from "react-native";
import { GiftedChat, Bubble, Send, Composer, IMessage } from "react-native-gifted-chat";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants";
import { useRouter } from "expo-router";

const Talk = () => {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const gpt = () => {
        setIsTyping(true);

        // make call to personality agent
        fetch("http://localhost:3000/api/personality", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${OPEN_AI_KEY}`,
            },
            body: JSON.stringify(messages),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("got response..", data);

                // extract quick reply choices
                const choices = data.choices?.map((c: any) => ({ title: c, value: c }));
                // construct ai response
                const aiMessage: IMessage = {
                    _id: Math.random().toString(),
                    text: data.response,
                    createdAt: new Date(),
                    user: aiUser,
                    quickReplies:
                        choices && choices.length > 0
                            ? {
                                  type: "radio",
                                  values: choices,
                              }
                            : undefined,
                };

                setMessages((previousMessages) => GiftedChat.append(previousMessages, [aiMessage]));
            })
            .catch((err) => console.log(err))
            .finally(() => setIsTyping(false));
    };

    const user = {
        _id: 1,
        name: "",
    };

    const aiUser = {
        _id: 2,
        name: "Assistant",
    };

    const onSend = useCallback(async (msgs: IMessage[] = []) => {
        console.log(msgs);
        setMessages((previousMessages) => GiftedChat.append(previousMessages, msgs));
    }, []);

    const onQuickReply = useCallback((replies: any[]) => {
        onSend([
            {
                createdAt: new Date(),
                _id: Math.round(Math.random() * 1000000),
                text: replies[0].title,
                user,
            },
        ]);
    }, []);

    useEffect(() => {
        // start the conversation
        if (messages.length == 0) {
            setTimeout(() => {
                console.log("starting conversation");
                gpt();
            }, 500);
        }
    }, [messages]);

    useEffect(() => {
        // send message
        if (messages.length > 0) {
            const lastMessage: any = messages[0];
            if (lastMessage?.user._id == 1) {
                gpt();
            }
        }
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
        <View className="flex-1 bg-white">
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
                onQuickReply={onQuickReply}
                // renderAvatar={renderAvatar}
                // bottomOffset={34} //{insets.bottom}
                // wrapInSafeArea={false}
                bottomOffset={insets.bottom}
                // renderComposer={renderComposer}
            />
            {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
        </View>
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

export default Talk;
