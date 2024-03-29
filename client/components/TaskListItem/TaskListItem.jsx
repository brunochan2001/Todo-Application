import { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { deleteTodoById, putTodoById } from "../../services/todoList";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SharedTodoModal } from "../SharedTodoModal";
import { TodoContentModal } from "../TodoContentModal";

function CheckMark({ id, handleToggleTodo, completed }) {
  const handleToggle = async () => {
    await putTodoById(id, completed);
    handleToggleTodo(id);
  };
  return (
    <Pressable
      onPress={handleToggle}
      style={[
        styles.checkMark,
        { backgroundColor: completed == 0 ? "#E9E9EF" : "#0EA5E9" },
      ]}
    />
  );
}

export const TaskListItem = ({
  id,
  title,
  shared_with_id,
  completed,
  handleToggleTodo,
  handleClearTodo,
}) => {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const sharedBottomSheetRef = useRef(null);
  const snapPoints = ["25%", "48%", "75%"];
  const snapPointsShared = ["40%"];

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };

  const handlePresentShared = () => {
    sharedBottomSheetRef.current?.present();
  };

  const handleDeleteTodo = async () => {
    await deleteTodoById(id);
    handleClearTodo(id);
  };

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.containerTextCheckBox}>
        <CheckMark
          id={id}
          completed={completed}
          handleToggleTodo={handleToggleTodo}
        />
        <Text style={styles.text}>{title}</Text>
      </View>
      {shared_with_id !== null ? (
        <Feather
          onPress={handlePresentShared}
          name="users"
          size={20}
          color="#383839"
        />
      ) : (
        <Feather
          onPress={handlePresentModal}
          name="share"
          size={20}
          color="#383839"
        />
      )}
      {isDeleteActive && (
        <Pressable onPress={handleDeleteTodo} style={styles.deleteButton}>
          <Text style={{ color: "white", fontWeight: "bold" }}>x</Text>
        </Pressable>
      )}
      <BottomSheetModal
        ref={sharedBottomSheetRef}
        snapPoints={snapPointsShared}
        backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
      >
        <SharedTodoModal
          id={id}
          title={title}
          shared_with_id={shared_with_id}
          completed={completed}
        />
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        index={2}
        backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
      >
        <TodoContentModal id={id} title={title} />
      </BottomSheetModal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 21,
    marginBottom: 10,
    backgroundColor: "white",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#383839",
    letterSpacing: -0.011 * 16,
    flexShrink: 1,
    marginHorizontal: 8,
  },
  checkMark: {
    width: 20,
    height: 20,
    borderRadius: 7,
  },
  containerTextCheckBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
  },
  deleteButton: {
    position: "absolute",
    right: 0,
    top: -6,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    borderRadius: 10,
  },
});
