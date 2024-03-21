import React from "react";
import { Alert, StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";
import AIChat from "@/components/AIChat";
import { IMessage } from "react-native-gifted-chat";

const Index = () => {
    const router = useRouter();

    // const generateBio = async () => {
    //     const generateBioMessage = {
    //         _id: Math.random().toString(),
    //         text: "Generate a thoughtful and kind summary of what you have learnt about me. It should be in a format that can be posted by my bio on my dating profile.",
    //         createdAt: new Date(),
    //         user: sysUser,
    //     };

    //     const response = await sendMessage(generateBioMessage, false);
    //     Alert.alert("Bio Generated", response);
    // };

    const onCompleted = (messages: IMessage[]) => {
        Alert.alert("Chat Completed", "You have completed the chat");
    };

    return <AIChat agentUrl="http://localhost:3000/api/bio" onCompleted={onCompleted} />;
};

const styles = StyleSheet.create({});

export default Index;
