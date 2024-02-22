import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { View } from "react-native";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "(tabs)",
};

// Clerk JWT Token Cache
const tokenCache = {
    async getToken(key: string) {
        try {
            return SecureStore.getItemAsync(key);
        } catch (err) {
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            return SecureStore.setItemAsync(key, value);
        } catch (err) {
            return;
        }
    },
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
    const router = useRouter();
    const segments = useSegments();

    const { isLoaded, isSignedIn } = useAuth();

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

    useEffect(() => {
        if (!isLoaded) return;

        const inAuthGroup = segments[0] === "(tabs)" || segments[0] === "profile";

        console.log("isSignedIn", isSignedIn);

        if (isSignedIn && !inAuthGroup) {
            router.push("/(tabs)");
        } else if (!isSignedIn && inAuthGroup) {
            router.replace("/");
        }
    }, [isLoaded, segments, isSignedIn]);

    if (!loaded) {
        return <View />;
    }

    return (
        <SafeAreaProvider>
            <Stack initialRouteName="index">
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="opt" options={{ headerShown: false }} />
                <Stack.Screen name="verify" options={{ headerShown: false }} />
                <Stack.Screen name="profile" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </SafeAreaProvider>
    );
};

const RootLayoutNav = () => {
    return (
        <ClerkProvider
            publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
            tokenCache={tokenCache}
        >
            <InitialLayout />
        </ClerkProvider>
    );
};

export default RootLayoutNav;
