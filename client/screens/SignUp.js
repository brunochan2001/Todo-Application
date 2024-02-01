import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import { createUser } from "../services/todoList";

export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setName("")
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async () => {
    if (name === "" || email === "" || password === "") {
      return;
    } else {
      const response = await createUser(email, name, password);
      if (response.error) {
      } else {
        Alert.alert(
          "Congratulations 🎉",
          `Your new account is ready`,
          [{ text: "Okay" }]
        );
        resetForm()
        navigation.navigate("Home");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.description}>Sign up to continue</Text>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write your name"
            scrollEnabled={true}
            onChangeText={setName}
            defaultValue={name}
          />
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write your email"
            scrollEnabled={true}
            onChangeText={setEmail}
            defaultValue={email}
          />
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write your password"
            scrollEnabled={true}
            onChangeText={setPassword}
            defaultValue={password}
            secureTextEntry={true}
          />
          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.textButton}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    paddingTop: 30
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
  textBottom: { position: "absolute", bottom: 20, width: "100%" },
});
