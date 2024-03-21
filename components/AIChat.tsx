import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { COLORS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { IMessage, GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AIChatProps {
    agentUrl: string;
    onCompleted?: (messages: IMessage[]) => void;
}

const AIChat: FC<AIChatProps> = ({ agentUrl, onCompleted = (messages: IMessage[]) => {} }) => {
    const insets = useSafeAreaInsets();

    const router = useRouter();

    const [messages, setMessages] = useState<IMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    const user = {
        _id: 1,
        name: "",
    };

    const aiUser = {
        _id: 2,
        name: "Artifical Intelligence",
    };

    const sysUser = {
        _id: 3,
        name: "System User",
    };

    const formatMessages = (messages: IMessage[]) => {
        return messages.map((m: IMessage) => ({
            response: m.text,
            user: m.user._id,
            timestamp: m.createdAt,
            choices: m.quickReplies?.values?.map((v) => v.title) || [],
        }));
    };

    const sendMessage = async () => {
        console.log("Will be sending", formatMessages(messages));
        // make call to ai agent
        const response = await fetch(agentUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${OPEN_AI_KEY}`,
            },
            body: JSON.stringify(formatMessages(messages)),
        });
        const data = await response.json();
        // console.log("got response..", data);

        if (data.completed === true) {
            onCompleted?.(messages);
        } else {
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

            // append ai response to messages
            setMessages((previousMessages) => GiftedChat.append(previousMessages, [aiMessage]));
        }
    };

    const onSend = useCallback(async (msgs: IMessage[] = []) => {
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

    const sendMessageWithTyping = async () => {
        setIsTyping(true);
        await sendMessage();
        setIsTyping(false);
    };

    useEffect(() => {
        // start the conversation
        if (messages.length == 0) {
            setTimeout(() => {
                sendMessageWithTyping();
            }, 500);
        }
    }, [messages]);

    useEffect(() => {
        // send message
        if (messages.length > 0) {
            const lastMessage: any = messages[0];
            if (lastMessage?.user._id == user._id) {
                sendMessageWithTyping();
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

export default AIChat;
