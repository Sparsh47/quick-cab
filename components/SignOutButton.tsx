import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { Alert, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      Linking.openURL(Linking.createURL("/"));
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error: ", err.errors[0].longMessage);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      style={{
        backgroundColor: "#FFF",
        width: 40,
        height: 40,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={icons.out} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
  );
};
