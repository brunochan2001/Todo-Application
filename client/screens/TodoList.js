import React, { useEffect, useState } from "react";
import { InputTask, TaskList } from "../components";
import { getTodoListById } from "../services/todoList";

export const TodoList = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  const idUser = route.params.id;

  useEffect(() => {
    if (idUser) {
      handleGetTodoList(idUser);
    }
  }, [idUser]);

  const handleGetTodoList = async (id) => {
    const response = await getTodoListById(id);
    setData(response.data);
  };

  return (
    <>
      <TaskList data={data} setData={setData} />
      <InputTask data={data} setData={setData} />
    </>
  );
};
