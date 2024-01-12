import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SingUpSignIn, TodoList } from "../screens";

const Stack = createNativeStackNavigator();

export const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={SingUpSignIn}
        options={{ title: "Sign in" }}
      />
      <Stack.Screen name="Todo List" component={TodoList} />
    </Stack.Navigator>
  );
};
