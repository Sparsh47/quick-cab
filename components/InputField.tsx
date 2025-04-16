import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { InputFieldProps } from "@/types/type";

export default function InputField({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  customStyle,
  ...props
}: InputFieldProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback>
        <View style={{ marginBlock: 6, width: "100%" }}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          <View style={[styles.container, containerStyle]}>
            {icon && <Image source={icon} style={[styles.icon, iconStyle]} />}
            <TextInput
              style={[styles.input, inputStyle]}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#F7F7F7",
    borderRadius: 500,
    borderWidth: 1,
    borderColor: "#F7F7F7",
  },
  label: {
    fontSize: 18,
    fontFamily: "Jakarta-SemiBold",
    marginBottom: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  input: {
    borderRadius: 500,
    padding: 16,
    fontFamily: "Jakarta-SemiBold",
    fontSize: 16,
    flex: 1,
    textAlign: "left",
    color: "#898989",
  },
});
