import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, rides } from "@/constants";
import RideCard from "@/components/RideCard";
import { useUser } from "@clerk/clerk-expo";
import { SignOutButton } from "@/components/SignOutButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { router } from "expo-router";

export default function Home() {
  const { user } = useUser();
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    async function requestLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    }

    requestLocation();
  }, []);

  function handleDestinationPress(location: {
    latitude: number;
    longitude: number;
    address: string;
  }) {
    setDestinationLocation(location);

    router.push("/(root)/find-ride");
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <FlatList
        style={{ paddingHorizontal: 20 }}
        data={rides?.slice(0, 5)}
        keyExtractor={(item) => item.ride_id}
        renderItem={({ item }) => <RideCard ride={item} />}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Empty</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Jakarta-Bold",
                  textTransform: "capitalize",
                }}
              >
                Welcome{" "}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split("@")[0]}
              </Text>
              <SignOutButton />
            </View>
            <GoogleTextInput
              handlePress={handleDestinationPress}
              icon={icons.search}
              containerStyle={{ backgroundColor: "white" }}
            />

            <>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Jakarta-Bold",
                  marginVertical: 20,
                }}
              >
                Your current Location
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "transparent",
                  height: 300,
                }}
              >
                <Map />
              </View>
            </>
          </>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#F6F8FA",
  },
});
