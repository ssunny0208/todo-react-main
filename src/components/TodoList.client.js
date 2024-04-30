import React, { useState, useEffect } from "react";
import { db } from "@firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import TodoItem from "@/components/TodoItem";
import styles from "@styles/TodoList.module.css";

const todoCollection = collection(db, "todos");

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const getTodos = async () => {
    const q = query(todoCollection);
    const results = await getDocs(q);
    const newTodos = results.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(newTodos);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (input.trim() === "") return;
    const docRef = await addDoc(todoCollection, {
      text: input,
      completed: false,
    });
    setTodos([...todos, { id: docRef.id, text: input, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          const todoDoc = doc(todoCollection, id);
          updateDoc(todoDoc, { completed: !todo.completed });
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  const deleteTodo = (id) => {
    const todoDoc = doc(todoCollection, id);
    deleteDoc(todoDoc);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // TodoItem 컴포넌트의 사용 예시 등 추가 구현이 필요할 수 있습니다.

  return (
    <div className={styles.todoList}>
      {/* 여기에 TodoItem을 렌더링하는 로직 추가 */}
    </div>
  );
};

export default TodoList;
