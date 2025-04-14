import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { ButtonProps } from "@/types/type";

interface CustomButtonProps extends ButtonProps {
  customStyles?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

type BgVariant = NonNullable<ButtonProps["bgVariant"]>;
type TextVariant = NonNullable<ButtonProps["textVariant"]>;

const bgColors: Record<BgVariant, string> = {
  primary: "#0286FF",
  secondary: "oklch(55.1% 0.027 264.364)",
  danger: "oklch(63.7% 0.237 25.331)",
  success: "oklch(72.3% 0.219 149.579)",
  outline: "transparent",
};

const textColors: Record<TextVariant, string> = {
  primary: "#000",
  secondary: "oklch(96.7% 0.003 264.542)",
  danger: "oklch(93.6% 0.032 17.717)",
  success: "oklch(96.2% 0.044 156.743)",
  default: "#FFF",
};

const CustomButton: React.FC<CustomButtonProps> = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  customStyles,
  textStyle,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColors[bgVariant] },
        bgVariant === "outline" && {
          borderWidth: 0.5,
          borderColor: "oklch(87% 0 0)",
        },
        customStyles,
      ]}
      onPress={onPress}
      {...props}
    >
      {IconLeft && (
        <View style={styles.icon}>
          <IconLeft />
        </View>
      )}
      <Text
        style={[styles.text, { color: textColors[textVariant] }, textStyle]}
      >
        {title}
      </Text>
      {IconRight && (
        <View style={styles.icon}>
          <IconRight />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 200,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  icon: {},
  text: {
    fontFamily: "Jakarta-SemiBold",
    fontSize: 20,
  },
});

export default CustomButton;
