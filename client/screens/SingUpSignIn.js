import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export const SingUpSignIn = ({ navigation }) => {
  const [emailSignIn, setEmailSignIn] = useState("");
  const [emailSignUp, setEmailSignUp] = useState("");

  const handleSubmit = () => {
    navigation.navigate("Todo List", { id: 2 });
  };

  const handleChangeEmailSignIn = (text) => {
    setEmailSignUp("");
    setEmailSignIn(text);
  };

  const handleChangeEmailSignUp = (text) => {
    setEmailSignIn("");
    setEmailSignUp(text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.description}>Sign in to continue</Text>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write your email"
            scrollEnabled={true}
            onChangeText={(text) => handleChangeEmailSignIn(text)}
            defaultValue={emailSignIn}
          />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.textButton}>Sign In</Text>
          </Pressable>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.description}>Sign up to continue</Text>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Email"
            scrollEnabled={true}
            onChangeText={(text) => handleChangeEmailSignUp(text)}
            defaultValue={emailSignUp}
          />
          <Pressable onPress={() => {}} style={styles.button}>
            <Text style={styles.textButton}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    gap: 20,
  },
  contentContainer: {
    display: "flex",
    gap: 10,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  containerTextInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 30,
    minHeight: 45,
    paddingHorizontal: 15,
    fontSize: 12,
    borderColor: "lightgray",
    backgroundColor: "#fff",
    fontWeight: "600",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0EA5E9",
    borderRadius: 30,
    borderWidth: 1,
    minHeight: 45,
    paddingHorizontal: 15,
    borderColor: "lightgray",
  },
  textButton: {
    color: "#fff",
    fontWeight: "600",
  },
});
