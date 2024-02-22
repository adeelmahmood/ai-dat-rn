import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import React from "react";
import { faker } from "@faker-js/faker";

const { width, height } = Dimensions.get("window");

const Page = () => {
    const images = [
        { id: "1", uri: faker.image.url() },
        { id: "2", uri: faker.image.url() },
        { id: "3", uri: faker.image.url() },
        // Add more images as needed
    ];

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>Your Profile</Text>

            <View style={{ marginTop: 20 }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollViewContainer}
                >
                    {images.map((image) => (
                        <Image key={image.id} source={{ uri: image.uri }} style={styles.image} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        textAlign: "center",
    },
    scrollViewContainer: {
        paddingHorizontal: 5,
    },
    image: {
        width: width - 100, // 40% of the screen width
        height: height * 0.4, // Keeping the aspect ratio 1:1 for demonstration
        marginRight: 10,
        borderRadius: 18,
    },
});

export default Page;
