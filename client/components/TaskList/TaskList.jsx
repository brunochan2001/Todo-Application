import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { TaskListItem } from "../TaskListItem";
import { getTodoListById } from "../../services/todoList";

export const TaskList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetTodoList();
  }, []);

  const handleGetTodoList = async () => {
    const response = await getTodoListById(1);
    setData(response.data);
  };

  const handleClearTodo = (id) => {
    setData(data.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id) => {
    setData(
      data.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({ item }) => (
        <TaskListItem
          {...item}
          handleClearTodo={handleClearTodo}
          handleToggleTodo={handleToggleTodo}
        />
      )}
      ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
  contentContainerStyle: {
    padding: 15,
  },
});
