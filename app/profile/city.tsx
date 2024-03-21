import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Text, Alert } from "react-native";

import * as Location from "expo-location";
import InputBox from "@/components/InputBox";
import BtnLink from "@/components/BtnLink";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function App() {
    const insets = useSafeAreaInsets();

    const [city, setCity] = useState<string>("");

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // Reverse Geocoding to get address details
            const addressResponse = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            });

            if (addressResponse.length > 0 && addressResponse[0].city) {
                setCity(addressResponse[0].city);
            }
        })();
    }, []);

    return (
        <View className="flex-1 bg-white">
            <View
                className="flex-1 px-6 py-4 justify-between"
                style={{ marginBottom: insets.bottom }}
            >
                <View style={{ flex: 1 }}>
                    <Text className="text-2xl font-roboto-bold">Where do you live?</Text>

                    <View style={{ marginTop: 10, marginBottom: 10 }}>
                        <InputBox value={city} setValue={setCity} placeholder="Your City" />
                    </View>

                    {location ? (
                        <View className="flex-1">
                            <MapView
                                className="flex-1"
                                initialRegion={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                {/* Marker for Current Location */}
                                <Marker
                                    coordinate={{
                                        latitude: location.coords.latitude,
                                        longitude: location.coords.longitude,
                                    }}
                                    title="Your Location"
                                />
                            </MapView>
                        </View>
                    ) : (
                        <Text>{errorMsg}</Text>
                    )}
                </View>

                <BtnLink
                    href="/profile/dob"
                    title="Next"
                    containerStyles={{
                        marginTop: 10,
                        width: 150,
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                />
            </View>
        </View>
    );
}
