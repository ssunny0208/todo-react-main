import TodoList from "@/components/TodoList";
import styles from "@/styles/globals.css"; // 필요한 경우 import

export default function Home() {
  return (
    <div className={styles.centerContainer}>
      <h1 className={styles.title}>To Do List</h1>
      <TodoList />
    </div>
  );
}
