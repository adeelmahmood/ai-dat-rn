import { View, Text, StyleSheet, Alert, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/constants/colors";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<any>();
    const router = useRouter();

    const { signOut } = useAuth();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setSession(session);
            }
        });
    }, [supabase]);

    useEffect(() => {
        if (session) {
            getProfile();
        }
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error("No user on the session!");

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`username, website, avatar_url`)
                .eq("id", session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                console.log(data);
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string;
        website: string;
        avatar_url: string;
    }) {
        try {
            setLoading(true);
            if (!session?.user) throw new Error("No user on the session!");

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            };

            const { error } = await supabase.from("profiles").upsert(updates);

            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.area}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                    style={styles.input}
                    editable={false}
                    selectTextOnFocus={false}
                    value={session?.user?.email}
                />
            </View>

            {/* <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Website</Text>
                    <TextInput
                        style={styles.input}
                        value={website}
                        onChangeText={(text) => setWebsite(text)}
                    />
                </View> */}

            {/* <View style={{}}>
                    <Button
                        title={loading ? "Loading ..." : "Update"}
                        onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
                        disabled={loading}
                    />
                </View> */}

            <View style={{}}>
                <Button
                    title="Sign Out"
                    onPress={async () => {
                        signOut();
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        borderBottomColor: "gray",
        borderBottomWidth: 0.3,
    },
    headerTitle: {
        fontWeight: "bold",
    },
    headerSubtitle: {},
    inputContainer: {
        marginVertical: 22,
        paddingHorizontal: 12,
    },
    inputLabel: {
        fontFamily: "roboto-med",
        fontSize: 18,
        height: 44,
    },
    input: {
        flex: 1,
        marginHorizontal: 0,
        fontSize: 16,
        fontFamily: "roboto",
        backgroundColor: COLORS.secondary_white,
    },
});

export default Settings;
