"use client";

import { useState } from "react";

type Task = {
  text: string;
  date: string;
  category: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      text: "トマトの水やり",
      date: "2026-05-23",
      category: "トマト",
      completed: false,
    },
    {
      text: "じゃがいもの収穫",
      date: "2026-05-22",
      category: "じゃがいも",
      completed: true,
    },
  ]);

  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const addTask = () => {
    if (!text || !date || !category) return;

    const newTask: Task = {
      text,
      date,
      category,
      completed: false,
    };

    setTasks([newTask, ...tasks]);

    setText("");
    setDate("");
    setCategory("");
  };

  const deleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-green-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-2">
          農作業管理アプリ 🌱
        </h1>

        <p className="text-center text-gray-600 mb-8">
          今日の農作業を記録しましょう
        </p>

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">作業を追加</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="作業内容"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="作物カテゴリ"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              onClick={addTask}
              className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition"
            >
              作業を追加
            </button>
          </div>
        </div>

        <div className="mb-4 text-gray-700 font-medium">
          作業件数: {tasks.length}件
        </div>

        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div key={index} className="bg-white rounded-2xl shadow p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(index)}
                    />

                    <h3
                      className={`text-xl font-semibold ${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </h3>
                  </div>

                  <p className="text-gray-500">📅 {task.date}</p>

                  <p className="text-gray-500">🥬 {task.category}</p>
                </div>

                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                >
                  削除
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
