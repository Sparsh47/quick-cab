import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignOutButton } from "@/components/SignOutButton";

export default function Home() {
  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
        <SignOutButton />
      </View>
    </SafeAreaView>
  );
}
