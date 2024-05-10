"use client";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import TodoItem from "@/components/TodoItem";
import styles from "@/styles/TodoList.module.css";

import { db } from "@/firebase";
import {
  collection,
  query,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  where,
} from "firebase/firestore";

const todoCollection = collection(db, "todos");

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState(""); // Due Date 상태 추가

  const router = useRouter();
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/login");
    },
  });

  useEffect(() => {
    console.log("data", data);
    getTodos();
  }, [data]);

  const getTodos = async () => {
    if (!data?.user?.name) return;

    const q = query(todoCollection, where("userName", "==", data?.user?.name));

    const results = await getDocs(q);
    const newTodos = [];

    results.docs.forEach((doc) => {
      newTodos.push({ id: doc.id, ...doc.data() });
    });

    setTodos(newTodos);
  };
  const addTodo = async () => {
    if (input.trim() === "") return;
    const docRef = await addDoc(todoCollection, {
      userName: data?.user?.name,
      text: input,
      completed: false,
      dueDate: dueDate,
    });

    setTodos([
      ...todos,
      { id: docRef.id, text: input, completed: false, dueDate: dueDate },
    ]);
    setInput("");
    setDueDate("");
  };

  const deleteTodo = async (id, userName) => {
    if (userName === data?.user?.name) {
      const todoDoc = doc(todoCollection, id);
      await deleteDoc(todoDoc);
      setTodos(todos.filter((todo) => todo.id !== id));
    } else {
      alert("이름이 틀립니다. 삭제할 수 없습니다.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="text-xl mb-4 font-bold underline underline-offset-4 decoration-wavy">
        {data?.user?.name}'s Todo List
      </h1>
      <input
        type="text"
        className="w-full p-1 mb-4 border border-gray-300 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="date"
        className="w-full p-1 mb-4 border border-gray-300 rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        className="w-40 justify-self-end p-1 mb-4 bg-blue-500 text-white
                   border border-blue-500 rounded hover:bg-white hover:text-blue-500"
        onClick={addTodo}
      >
        Add Todo
      </button>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={() => deleteTodo(todo.id, data?.user?.name)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
