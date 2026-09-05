import { useEffect, useState } from "react";
import "./App.css";
import { getCurrentWindow } from "@tauri-apps/api/window";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("pixel-todo-tasks");
    const lastDate = localStorage.getItem("pixel-todo-last-date");

    const todayKey = new Date().toLocaleDateString("en-CA");

    if (!savedTasks) {
      return [];
    }

    const parsedTasks: Task[] = JSON.parse(savedTasks);

    if (lastDate === todayKey) {
      return parsedTasks;
    }

    return parsedTasks.filter((task) => !task.done);
  });

  const handleDrag = async (event: React.MouseEvent) => {
  const target = event.target as HTMLElement;

  if (
    target.closest("button") ||
    target.closest("input") ||
    target.closest("label")
  ) {
    return;
  }

  await getCurrentWindow().startDragging();
  };

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
  localStorage.setItem("pixel-todo-tasks", JSON.stringify(tasks));

  const todayKey = new Date().toLocaleDateString("en-CA");
  localStorage.setItem("pixel-todo-last-date", todayKey);
  }, [tasks]);

  const today = new Date();

  const day = today
    .toLocaleDateString("en-US", {
      weekday: "long",
    })
    .toUpperCase();

  const date = today
    .toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    })
    .toUpperCase();

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              done: !task.done,
            }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );
  };

  const addTask = () => {
    const trimmed = newTask.trim();

    if (!trimmed) return;

    const task: Task = {
      id: Date.now(),
      text: trimmed,
      done: false,
    };

    setTasks((current) => [...current, task]);

    setNewTask("");
  };

  const completed = tasks.filter((task) => task.done).length;

  const progress =
    tasks.length === 0
      ? 0
      : (completed / tasks.length) * 100;

  return (
    <main className="widget-shell">
      <div
        className="todo-widget"
        onMouseDown={handleDrag}
      >

        <header
          className="top-bar"
          data-tauri-drag-region
        >
          <span className="day">
            ★ {day}
          </span>

          <span className="date">
            {date}
          </span>
        </header>

        <div className="pixel-divider" />

        <p className="section-title">
          TODAY'S QUESTS
        </p>

        <section className="task-list">
          {tasks.map((task) => (
            <div
              className={`task-row ${
                task.done ? "task-done" : ""
              }`}
              key={task.id}
            >

              <button
                className={`checkbox ${
                  task.done ? "checked" : ""
                }`}
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "✓" : ""}
              </button>

              <span className="task-text">
                {task.text}
              </span>

              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
              >
                ×
              </button>

            </div>
          ))}
        </section>

        <section className="add-task-row">

          <input
            value={newTask}
            placeholder="+ NEW QUEST"
            onChange={(event) =>
              setNewTask(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addTask();
              }
            }}
          />

          <button
            className="add-button"
            onClick={addTask}
          >
            ADD
          </button>

        </section>

        <div className="bottom-divider" />

        <footer>

          <div className="progress-shell">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <span className="quest-count">
            ★ {completed} / {tasks.length}
          </span>

        </footer>

      </div>
    </main>
  );
}

export default App;