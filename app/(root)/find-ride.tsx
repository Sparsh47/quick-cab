import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";

export default function FindRide() {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <RideLayout title="Ride" snapPoints={["85%"]}>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Jakarta-SemiBold",
            marginBottom: 12,
          }}
        >
          From
        </Text>
        <GoogleTextInput
          handlePress={(location) => {
            setUserLocation(location);
          }}
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle={{ backgroundColor: "#f5f5f5" }}
          textInputBackgroundColor={"#F5F5F5"}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Jakarta-SemiBold",
            marginBottom: 12,
          }}
        >
          To
        </Text>
        <GoogleTextInput
          handlePress={(location) => {
            setUserLocation(location);
          }}
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle={{ backgroundColor: "#f5f5f5" }}
          textInputBackgroundColor={"#F5F5F5"}
        />
      </View>
      <CustomButton
        title="Find now"
        onPress={() => router.push("/(root)/confirm-ride")}
      />
    </RideLayout>
  );
}
