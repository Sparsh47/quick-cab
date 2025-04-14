import { SafeAreaView } from "react-native-safe-area-context";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useRef, useState } from "react";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

export default function Welcome() {
  const swiperRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        <Text style={styles.skipBtnText}>Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View style={[styles.dot, styles.inactiveDot]} />}
        activeDot={<View style={[styles.dot, styles.activeDot]} />}
        onIndexChanged={(index: number) => {
          setActiveIndex(index);
        }}
      >
        {onboarding.map((item) => (
          <View key={item.id} style={styles.onboardingPage}>
            <Image source={item.image} style={styles.onboardingImage} />
            <View style={styles.onboardingTextContainer}>
              <Text style={styles.onboardingTitle}>{item.title}</Text>
            </View>
            <Text style={styles.onboardingDesc}>{item.description}</Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        customStyles={{ marginHorizontal: 20 }}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : //@ts-ignore
              swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  skipBtn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 20,
  },
  skipBtnText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "Jakarta-Bold",
  },
  dot: {
    width: 32,
    height: 4,
    marginHorizontal: 4,
    borderRadius: 400,
  },
  inactiveDot: {
    backgroundColor: "#E2E8F0",
  },
  activeDot: {
    backgroundColor: "#0286FF",
  },
  onboardingPage: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  onboardingImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  onboardingTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 28,
  },
  onboardingTitle: {
    color: "#000",
    fontSize: 28,
    fontFamily: "Jakarta-Bold",
    marginHorizontal: 20,
    textAlign: "center",
  },
  onboardingDesc: {
    fontSize: 16,
    fontFamily: "Jakarta-SemiBold",
    textAlign: "center",
    color: "#858585",
    marginHorizontal: 20,
    marginTop: 10,
  },
});
