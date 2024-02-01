import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignUp, SignIn, TodoList } from "../screens";

const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SignIn}
        options={{ title: "Sign in" }}
      />
      <Stack.Screen
        name="Sign up"
        component={SignUp}
        options={{ title: "Sign up" }}
      />
      <Stack.Screen name="Todo List" component={TodoList} />
    </Stack.Navigator>
  );
};
