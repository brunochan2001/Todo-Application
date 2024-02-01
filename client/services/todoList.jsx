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

export const getTodoSharedById = async (id) => {
  try {
    const response = await fetch(
      `${REACT_APP_BACKEND_URL}/todos/shared-todo/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postSharedTodo = async (todo_id, user_id, email) => {
  const body = { todo_id: todo_id, user_id, email: email };

  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/todos/shared-todo`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postCreateTodo = async (user_id, title) => {
  const body = { title, user_id };

  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/todos/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const postSignIn = async (email, password) => {
  const body = { email, password };

  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/user/sign-in`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (email, name, password) => {
  const body = { email, name, password };

  try {
    const response = await fetch(`${REACT_APP_BACKEND_URL}/user/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
