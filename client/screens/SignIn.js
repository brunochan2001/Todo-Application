import React, { useState, useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert
} from "react-native";
import { postSignIn } from "../services/todoList";

export const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSignIn = async () => {
    if (email === "" || password === "") {
      return;
    } else {
      const response = await postSignIn(email, password);
      if (response && response.data) {
        Alert.alert(
          "Successful login",
        );
        navigation.navigate("Todo List", { id: response.data.id });
        resetForm();
      }
    }
  };



  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.description}>Sign in to continue</Text>
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write your email"
            onChangeText={setEmail}
            defaultValue={email}
            scrollEnabled={false}
          />
          <TextInput
            style={styles.containerTextInput}
            placeholder="Write your password"
            onChangeText={setPassword}
            defaultValue={password}
            secureTextEntry={true}
            scrollEnabled={false}
          />
          <Pressable onPress={handleSignIn} style={styles.button}>
            <Text style={styles.textButton}>Sign In</Text>
          </Pressable>
        </View>
        <View style={styles.textBottom}>
          <Text style={{ textAlign: "center" }}>
            Don't have an account?{' '}
            <Text
              style={{ fontWeight: "bold" }}
              onPress={() => {
                navigation.navigate("Sign up");
              }}
            >
              Sign Up
            </Text>
          </Text>
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
