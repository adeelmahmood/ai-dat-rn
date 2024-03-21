import React from "react";
import { StyleSheet, Alert } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { useRouter } from "expo-router";
import AIChat from "@/components/AIChat";

const Chat = () => {
    const router = useRouter();

    const onCompleted = (messages: IMessage[]) => {
        Alert.alert("Chat Completed", "You have completed the chat");
    };

    return <AIChat agentUrl="http://localhost:3000/api/personality" onCompleted={onCompleted} />;
};

const styles = StyleSheet.create({});

export default Chat;
