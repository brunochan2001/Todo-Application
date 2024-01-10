import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { InputTask, TaskList } from "./components";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { getTodoListById } from "./services/todoList";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetTodoList();
  }, []);

  const handleGetTodoList = async () => {
    const response = await getTodoListById(1);
    setData(response.data);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <TaskList data={data} setData={setData} />
          <InputTask data={data} setData={setData} />
        </SafeAreaView>
        <StatusBar style="auto" />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
});
