import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { TaskList } from "./components";

export default function App() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <TaskList />
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
});
