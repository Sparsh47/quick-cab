import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
import { icons } from "@/constants";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarItemStyle: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          overflow: "hidden",
          marginHorizontal: 20,
          marginVertical: 10,
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabIcon focused={focused} source={icons.home} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabIcon focused={focused} source={icons.list} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabIcon focused={focused} source={icons.chat} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabIcon focused={focused} source={icons.profile} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) {
  return (
    <View
      style={{
        height: 40,
        width: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 8,
      }}
    >
      <View
        style={{
          borderRadius: 20,
          width: 40,
          height: 40,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: focused ? "#0CC25F" : "transparent",
        }}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          style={{ width: 24, height: 24 }}
        />
      </View>
    </View>
  );
}
