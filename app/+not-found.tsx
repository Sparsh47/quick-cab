import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <Text>This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  link: {
    fontSize: 20,
    backgroundColor: "#000",
    borderRadius: 15,
    borderColor: "#FFF",
    borderWidth: 1,
    color: "#FFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
