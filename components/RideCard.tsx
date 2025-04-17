import { Ride } from "@/types/type";
import { View, Text, StyleSheet, Image } from "react-native";
import { icons } from "@/constants";
import { formatDate, formatTime } from "@/lib/utils";

export default function RideCard({ ride }: { ride: Ride }) {
  return (
    <View style={styles.cardContainer}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=160&height=180&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_MAPS_API_KEY}`,
            }}
            style={{ width: 80, height: 90, borderRadius: 10 }}
          />
          <View
            style={{
              flexDirection: "column",
              marginHorizontal: 20,
              gap: 20,
              flex: 1,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image source={icons.to} style={{ width: 20, height: 20 }} />
              <Text
                numberOfLines={1}
                style={{ fontSize: 14, fontFamily: "Jakarta-Medium" }}
              >
                {ride.origin_address}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image source={icons.point} style={{ width: 20, height: 20 }} />
              <Text
                numberOfLines={1}
                style={{ fontSize: 14, fontFamily: "Jakarta-Medium" }}
              >
                {ride.destination_address}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            width: "100%",
            marginTop: 20,
            backgroundColor: "#F6F8FA",
            borderRadius: 10,
            padding: 12,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Jakarta-Medium",
                fontSize: 14,
                color: "rgb(107, 114, 128)",
              }}
            >
              Date & Time
            </Text>
            <Text
              style={{
                fontFamily: "Jakarta-Medium",
                fontSize: 14,
                color: "rgb(107, 114, 128)",
              }}
            >
              {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Jakarta-Medium",
                fontSize: 14,
                color: "rgb(107, 114, 128)",
              }}
            >
              Driver
            </Text>
            <Text
              style={{
                fontFamily: "Jakarta-Medium",
                fontSize: 14,
                color: "rgb(107, 114, 128)",
              }}
            >
              {ride.driver.first_name} {ride.driver.last_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Jakarta-Medium",
                fontSize: 14,
                color: "rgb(107, 114, 128)",
              }}
            >
              Car Seats
            </Text>
            <Text
              style={{
                fontFamily: "Jakarta-Medium",
                fontSize: 14,
                color: "rgb(107, 114, 128)",
              }}
            >
              {ride.driver.car_seats}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "Jakarta-Medium",
                fontSize: 14,
                color: "rgb(107, 114, 128)",
              }}
            >
              Payment Status
            </Text>
            <View
              style={{
                backgroundColor:
                  ride.payment_status.toLowerCase() !== "paid"
                    ? "#fb2c36"
                    : "rgb(34, 197, 94)",
                borderRadius: 5,
                padding: 5,
              }}
            >
              <Text
                style={{
                  fontFamily: "Jakarta-Medium",
                  fontSize: 14,
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                {ride.payment_status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    marginVertical: 10,
  },
  firstName: {
    fontSize: 24,
  },
});
