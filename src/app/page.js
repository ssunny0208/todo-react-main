"use client";

import { SessionProvider } from "next-auth/react";

import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <SessionProvider>
      <div>
        <TodoList />
      </div>
    </SessionProvider>
  );
}
