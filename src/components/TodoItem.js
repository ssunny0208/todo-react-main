import React from "react";
import styles from "@/styles/TodoList.module.css";

function TodoItem({ todo, onDelete }) {
  return (
    <div>
      {todo.text} ({todo.dueDate})
      <button onClick={() => onDelete(todo.id)} className={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
