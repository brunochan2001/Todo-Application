import { REACT_APP_BACKEND_URL } from "@env";

export const getTodoListById = async (id) => {
  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/todos/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodoById = async (id) => {
  try {
    const response = await fetch(
      `${REACT_APP_BACKEND_URL}/todos/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const putTodoById = async (id, completed) => {
  const status = completed ? false : true;
  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/todos/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        status,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
