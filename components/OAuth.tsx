import { Image, Text, View } from "react-native";
import CustomButton from "@/components/CustomButton";
import { icons } from "@/constants";

export default function OAuth() {
  async function handleGoogleSignIn() {}

  return (
    <View>
      <View
        style={{
          flex: 1,
          gap: 10,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "#CED1DD" }}></View>
        <Text style={{ fontSize: 16 }}>Or</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#CED1DD" }}></View>
      </View>
      <CustomButton
        title="Log In with Google"
        textVariant="primary"
        bgVariant="outline"
        onPress={handleGoogleSignIn}
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            style={{ marginHorizontal: 8, width: 28, height: 28 }}
          />
        )}
      />
    </View>
  );
}
