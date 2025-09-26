import { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask(name) {
    if (name.trim() === "") return; //this is do nothing if empty
    const newTask = {
      id: Date.now().toString(), 
      text: name,
      done: false,
    };
    setTasks([...tasks, newTask]); 
    setTask(""); 
  }

  function toggleTask(id) {
    const newTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    setTasks(newTasks);
  }

  function deleteTask(id) {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
  }

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      {}
      <TouchableOpacity onPress={() => toggleTask(item.id)}>
        <Text style={styles.checkbox}>{item.done ? "✅" : "⬜"}</Text>
      </TouchableOpacity>

      {}
      <Text style={item.done ? styles.taskDone : styles.taskText}>
        {item.text}
      </Text>

      {}
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={styles.header}>Task List App</Text>
      </View>

      {}
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={task}
        onChangeText={setTask}
      />

      {}
      <TouchableOpacity onPress={() => addTask(task)}>
        <View style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Task</Text>
        </View>
      </TouchableOpacity>

      {}
      {tasks.length === 0 ? (
        <Text style={styles.noTasks}>No tasks yet.</Text>
      ) : (
        <FlatList
          style={{ marginTop: 10 }}
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
  },
  noTasks: {
    color: "gray",
    marginTop: 5,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
  },
  taskDone: {
    flex: 1,
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "gray",
    marginLeft: 8,
  },
  checkbox: {
    fontSize: 18,
  },
  deleteText: {
    fontSize: 18,
    color: "red",
  },
});
