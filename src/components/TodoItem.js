import React from "react";
import styles from "@/styles/TodoList.module.css";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  // 날짜를 보기 좋게 포맷하기 위한 함수 (예: 2024-05-10)
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDelete = () => {
    const userName = prompt("[삭제 확인] 닉네임을 다시 입력해주세요");
    onDelete(todo.id, userName); // 입력 받은 이름을 onDelete 함수에 인자로 전달
  };

  return (
    <li className={styles.todoItem}>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span
        className={styles.todoText}
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
      >
        {todo.text}
      </span>
      {/* Due Date를 표시합니다. */}
      {todo.dueDate && (
        <span className={styles.dueDate}>Due: {formatDate(todo.dueDate)}</span>
      )}
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
