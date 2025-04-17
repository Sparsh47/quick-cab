import { GoogleInputProps } from "@/types/type";
import { Image, StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export default function GoogleTextInput({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where do you want to go?"
        debounce={200}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
          numberOfLines: 1,
          ellipsizeMode: "tail",
          style: {
            flex: 1,
            color: "#000",
          },
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        renderLeftButton={() => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 30,
              height: 30,
            }}
          >
            <Image
              source={icon ? icon : icons.search}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </View>
        )}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            marginHorizontal: 20,
            position: "relative",
            shadowColor: "#e4e4e4",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor || "#fff",
            borderRadius: 10,
            paddingHorizontal: 10,
            fontSize: 16,
            fontWeight: "500",
            marginTop: 5,
            width: "100%",
            color: "#000",
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "#fff",
            position: "relative",
            width: "100%",
            top: 0,
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
});
