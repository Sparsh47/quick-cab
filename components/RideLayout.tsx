import { Image, Text, TouchableOpacity, View } from "react-native";
import { ReactNode, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { router } from "expo-router";
import { icons } from "@/constants";
import Map from "@/components/Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function RideLayout({
  title,
  children,
  snapPoints,
}: {
  title?: string;
  children: ReactNode;
  snapPoints?: string[];
}) {
  const sheetRef = useRef<BottomSheet>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, backgroundColor: "#2b7fff" }}>
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              zIndex: 10,
              top: 60,
              alignItems: "center",
              justifyContent: "flex-start",
              paddingHorizontal: 20,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#fff",
                  borderRadius: 200,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={icons.backArrow}
                  style={{ width: 24, height: 24 }}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Jakarta-SemiBold",
                marginLeft: 20,
              }}
            >
              {title ? title : "Go Back"}
            </Text>
          </View>
          <Map />
        </View>
        <BottomSheet
          keyboardBehavior="extend"
          ref={sheetRef}
          snapPoints={snapPoints ? snapPoints : ["45%", "85%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
