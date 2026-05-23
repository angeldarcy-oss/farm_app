"use client";

import { useState } from "react";

// 1. id（文字列または数値）を追加しました
type Task = {
  id: string;
  text: string;
  date: string;
  category: string;
  completed: boolean;
};

// カテゴリの選択肢をあらかじめ定義しておきます
const CATEGORIES = ["トマト", "じゃがいも", "きゅうり", "なす", "その他"];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "トマトの水やり",
      date: "2026-05-23",
      category: "トマト",
      completed: false,
    },
    {
      id: "2",
      text: "じゃがいもの収穫",
      date: "2026-05-22",
      category: "じゃがいも",
      completed: true,
    },
  ]);

  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("トマト"); // 初期値を設定

  const addTask = () => {
    if (!text || !date || !category) return;

    // 新しいタスクに一意のID（ここではタイムスタンプ）を持たせます
    // ※今後Supabaseを使うときは、Supabase側が自動でIDを生成してくれます
    const newTask: Task = {
      id: crypto.randomUUID(), // ランダムなIDを生成
      text,
      date,
      category,
      completed: false,
    };

    setTasks([newTask, ...tasks]);

    setText("");
    setDate("");
    setCategory("トマト");
  };

  // indexではなく、idを使って削除するように変更しました
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // indexではなく、idを使って完了状態を切り替えるように変更しました
  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
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
              className="w-full border rounded-xl px-4 py-3 focus:outline-green-600"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 focus:outline-green-600"
            />

            {/* 作物カテゴリを入力式から「選択式（セレクト）」に変更しました */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 bg-white focus:outline-green-600"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={addTask}
              className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition font-semibold shadow-md"
            >
              作業を追加
            </button>
          </div>
        </div>

        <div className="mb-4 text-gray-700 font-medium">
          作業件数: {tasks.length}件
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            // keyを index から task.id に変更しました
            <div key={task.id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-green-700"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)} // idを渡す
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

                  <p className="text-gray-500 text-sm mb-1">📅 {task.date}</p>

                  <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                    🥬 {task.category}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(task.id)} // idを渡す
                  className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 text-sm font-medium transition"
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
