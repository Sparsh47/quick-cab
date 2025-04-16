import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import { ReactNativeModal } from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default", // 'default' | 'pending' | 'success' | 'failed'
    error: "",
    code: "",
  });

  const { isLoaded, signUp, setActive } = useSignUp();

  async function onSignUpPress() {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp?.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }

  async function onVerifyPress() {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp?.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });

        setVerification({
          ...verification,
          state: "success",
          error: "",
        });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification Failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View>
          <Image
            source={images.signUpCar}
            style={{ zIndex: 0, width: "100%", height: 200 }}
          />
          <Text style={styles.title}>Create Your Account</Text>
        </View>
        <View style={styles.signUpForm}>
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
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
            title="Sign Up"
            onPress={onSignUpPress}
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
              Already have an account?
            </Text>
            {"\t"}
            <Link href="/sign-in" style={{ fontSize: 16, color: "#0286FF" }}>
              Log In
            </Link>
          </View>
        </View>
      </View>

      {/* Verification Code Modal */}
      <ReactNativeModal isVisible={verification.state === "pending"}>
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Jakarta-ExtraBold",
              marginBottom: 10,
            }}
          >
            Verification
          </Text>
          <Text style={{ fontFamily: "Jakarta-Regular" }}>
            We've sent a verification code to {form.email}
          </Text>
          <InputField
            label="Code"
            icon={icons.lock}
            placeholder="12345"
            value={verification.code}
            keyboardType="number-pad"
            onChangeText={(code) => setVerification({ ...verification, code })}
          />
          {verification.error && (
            <Text style={{ color: "rgb(239, 68, 68)", fontSize: 14 }}>
              {verification.error}
            </Text>
          )}
          <CustomButton
            title="Verify Email"
            onPress={onVerifyPress}
            customStyles={{ marginTop: 20, backgroundColor: "#38A169" }}
          />
        </View>
      </ReactNativeModal>

      {/* Success Modal */}
      <ReactNativeModal isVisible={verification.state === "success"}>
        <View style={styles.modalContainer}>
          <Image
            source={images.check}
            style={{
              width: 110,
              height: 110,
              alignSelf: "center",
              marginVertical: 20,
            }}
          />
          <Text
            style={{
              fontSize: 24,
              fontFamily: "Jakarta-Bold",
              textAlign: "center",
            }}
          >
            Verified
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "rgb(156, 163, 175)",
              fontFamily: "Jakarta-Regular",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            You have successfully verified your account.
          </Text>
          <CustomButton
            title="Browse Home"
            onPress={() => {
              setVerification({ state: "default", code: "", error: "" });
              router.replace("/(root)/(tabs)/home");
            }}
            customStyles={{
              marginTop: 20,
              elevation: 10,
            }}
          />
        </View>
      </ReactNativeModal>
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
    paddingHorizontal: 15,
  },
  modalContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 15,
    minHeight: 300,
    justifyContent: "center",
  },
});
