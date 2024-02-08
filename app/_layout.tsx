import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        roboto: require("../assets/fonts/Roboto-Regular.ttf"),
        "roboto-med": require("../assets/fonts/Roboto-Medium.ttf"),
        "roboto-bold": require("../assets/fonts/Roboto-Bold.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    const router = useRouter();
    return (
        <SafeAreaProvider>
            <Stack initialRouteName="index">
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="connect" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
                <Stack.Screen
                    name="(auth)"
                    options={{
                        headerTitle: "Log In or Sign Up",
                        presentation: "modal",
                        headerRight: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="close" size={24} />
                            </TouchableOpacity>
                        ),
                    }}
                />
            </Stack>
        </SafeAreaProvider>
    );
}
