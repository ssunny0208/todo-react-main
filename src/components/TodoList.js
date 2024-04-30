"use client";

import React, { useState } from "react";
import TodoItem from "./TodoItem";
import styles from "@/styles/TodoList.module.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTodo = () => {
    if (!inputText || !dueDate) {
      alert("모든 필드를 채워주세요.");
      return;
    }
    const newTodo = { id: Date.now(), text: inputText, dueDate: dueDate };
    setTodos([...todos, newTodo]);
    setInputText("");
    setDueDate("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="할 일을 입력하세요"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className={styles.todoInput}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className={styles.dateInput}
      />
      <button onClick={addTodo} className={styles.addButton}>
        추가
      </button>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
