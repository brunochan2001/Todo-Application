import React from "react";
import { Button } from "react-native";

export const SingUpSignIn = ({ navigation }) => {
  return (
    <Button
      title="Sign In"
      onPress={() => navigation.navigate("Todo List", { id: 2 })}
    />
  );
};
