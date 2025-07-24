import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch tasks in real time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await addDoc(collection(db, "tasks"), { text: input, completed: false });
      setInput("");
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  // Start editing a task
  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.text);
  };

  // Save the edited task
  const saveEdit = async (id) => {
    if (editText.trim()) {
      await updateDoc(doc(db, "tasks", id), { text: editText });
    }
    setEditId(null);
    setEditText("");
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  return (
    <div>
      <form onSubmit={addTask}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button type="submit">Add</button>
      </form>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Task</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                {editId === task.id ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  task.text
                )}
              </td>
              <td>
                {editId === task.id ? (
                  <>
                    <button onClick={() => saveEdit(task.id)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => startEdit(task)}>Edit</button>
                )}
              </td>
              <td>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
