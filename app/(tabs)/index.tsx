import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { faker } from "@faker-js/faker";
import BtnLink from "@/components/BtnLink";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const Page = () => {
    // Placeholder for user data and images
    const bio =
        "An artistic 🎨 and ambitious explorer 🌿, passionate about creativity, adventure, and meaningful connections 💕. Loves the balance between nature’s tranquility and city vibrance, from hiking trails to art galleries. Seeks a partner who's a best friend—open, understanding, and ready for both deep conversations and spontaneous adventures.";
    const bio2 =
        "If you cherish honesty, empathy, and the pursuit of dreams, let's connect and see where the journey takes us. 🌟✨";
    const mainProfilePicture = { uri: faker.image.url() };
    const sideBySidePictures = [{ uri: faker.image.url() }, { uri: faker.image.url() }];
    const personalityTags = [
        { label: "CreativeSoul", emoji: "🎨" },
        { label: "DreamChaser", emoji: "🚀" },
        { label: "NatureLover", emoji: "🌿" },
        { label: "FoodieExplorer", emoji: "🍲" },
        { label: "DeepConversations", emoji: "💬" },
        { label: "AdventureSeeker", emoji: "🛣️" },
        { label: "Stargazer", emoji: "🌌" },
        { label: "EmpathyBeliever", emoji: "🤝" },
        { label: "MeaningfulConnections", emoji: "💕" },
        // Add more tags as needed
    ];

    // router the user to generate profile page
    const router = useRouter();
    useEffect(() => {
        router.navigate("/profile");
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* <Text style={styles.heading}>User Profile</Text> */}
            <Image source={mainProfilePicture} style={styles.mainProfilePicture} />
            <Text style={styles.bio}>{bio}</Text>
            <View style={styles.sideBySidePicturesContainer}>
                {sideBySidePictures.map((pic, index) => (
                    <Image key={index} source={pic} style={styles.sideBySidePicture} />
                ))}
            </View>
            <Text style={styles.bio}>{bio2}</Text>
            <View style={styles.tagsContainer}>
                {personalityTags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                        <Text style={styles.tagText}>
                            {tag.label} {tag.emoji}
                        </Text>
                    </View>
                ))}
            </View>

            <View className="flex items-center mt-10 mb-20">
                <BtnLink href="/profile" title="Generate Profile" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },
    mainProfilePicture: {
        width: "100%",
        height: 300, // Adjust based on your needs
    },
    bio: {
        fontSize: 18,
        marginHorizontal: 20,
        marginTop: 20,
        fontFamily: "roboto",
        lineHeight: 24,
    },
    sideBySidePicturesContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    sideBySidePicture: {
        width: "45%", // Slightly less than half to accommodate margin
        height: 200, // Adjust based on your needs
        borderRadius: 10,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        marginVertical: 20,
    },
    tag: {
        backgroundColor: "#EFEFEF",
        borderRadius: 20,
        padding: 10,
        margin: 5,
    },
    tagText: {
        fontSize: 14,
    },
});

export default Page;
