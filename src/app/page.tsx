"use client";

import { useState, useEffect } from "react";

type Task = {
  id: string;
  text: string;
  date: string;
  category: string;
  weather: string; // 🌤 天気の型を追加
  completed: boolean;
};

const TASK_CONTENTS = [
  "種まき",
  "定植",
  "直播",
  "水やり",
  "除草",
  "収穫",
  "その他",
];
const CATEGORIES = ["トマト", "じゃがいも", "きゅうり", "なす", "その他"];
const WEATHERS = ["☀️ 晴", "☔ 雨", "☁️ 曇", "🌀 その他"]; // 🌤 天気の選択肢を定義

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [text, setText] = useState("種まき");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("トマト");
  const [weather, setWeather] = useState("☀️ 晴"); // 🌤 天気の初期値
  const [isLoaded, setIsLoaded] = useState(false);

  // 💾 データの読み込み
  useEffect(() => {
    const savedTasks = localStorage.getItem("farm-tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks([
        {
          id: "1",
          text: "水やり",
          date: "2026-05-23",
          category: "トマト",
          weather: "☀️ 晴",
          completed: false,
        },
        {
          id: "2",
          text: "収穫",
          date: "2026-05-22",
          category: "じゃがいも",
          weather: "☁️ 曇",
          completed: true,
        },
      ]);
    }
    setIsLoaded(true);
  }, []);

  // 💾 データの保存
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("farm-tasks", JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  const addTask = () => {
    if (!text || !date || !category || !weather) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      date,
      category,
      weather, // 🌤 新しいタスクに天気を追加
      completed: false,
    };

    setTasks([newTask, ...tasks]);

    setText("種まき");
    setDate("");
    setCategory("トマト");
    setWeather("☀️ 晴"); // 天気をリセット
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  if (!isLoaded) return null;

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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                作業内容
              </label>
              <select
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 bg-white focus:outline-green-600"
              >
                {TASK_CONTENTS.map((content) => (
                  <option key={content} value={content}>
                    {content}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                日付
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:outline-green-600"
              />
            </div>

            {/* 🌤 天気の入力欄（セレクトボックス）を追加 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                天気
              </label>
              <select
                value={weather}
                onChange={(e) => setWeather(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 bg-white focus:outline-green-600"
              >
                {WEATHERS.map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                作物カテゴリ
              </label>
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
            </div>

            <button
              onClick={addTask}
              className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition font-semibold shadow-md mt-2"
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
            <div key={task.id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-green-700"
                      checked={task.completed}
                      onChange={() => toggleComplete(task.id)}
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

                  <p className="text-gray-500 text-sm mb-2">📅 {task.date}</p>

                  <div className="flex gap-2">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                      🥬 {task.category}
                    </span>
                    {/* 🌤 記録カードに天気のバッジを表示 */}
                    <span className="inline-block bg-blue-50 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                      {task.weather}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
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
