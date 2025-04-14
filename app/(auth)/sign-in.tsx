import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

export default function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  async function onLogInPress() {}

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Image
            source={images.signUpCar}
            style={{ zIndex: 0, width: "100%", height: 200 }}
          />
          <Text style={styles.title}>Welcome</Text>
        </View>
        <View style={styles.signUpForm}>
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Log In"
            onPress={onLogInPress}
            customStyles={{ marginTop: 24 }}
          />

          <OAuth />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              marginTop: 15,
            }}
          >
            <Text style={{ fontSize: 16, color: "#858585" }}>
              Don't have an account?
            </Text>
            {"\t"}
            <Link href="/sign-up" style={{ fontSize: 16, color: "#0286FF" }}>
              Sign Up
            </Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    position: "absolute",
    left: 20,
    bottom: 20,
    color: "#000",
    fontFamily: "Jakarta-SemiBold",
    fontSize: 20,
  },
  signUpForm: {
    paddingInline: 15,
  },
});
