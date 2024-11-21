import { addTask } from "./task-manager.js";
import { getTasks } from "../../lib/get-tasks.js";
import { sortTasksByPriority } from "../../lib/sort-tasks-by-priority.js";
import { sortTasksByDeadline } from "../../lib/sort-tasks-by-deadline.js";

export const sortTasks = () => {
  const tasks = Array.from(document.querySelectorAll("#tasks li")).map((li) => {
    const taskData = getTasks(li);
    const completed = li.classList.contains("completed");
    return { ...taskData, completed };
  });

  // 優先度と締切日のセレクションを取得
  const selectedPriority = document.getElementById(
    "sort-select-priority"
  )?.value;
  const selectedDeadline = document.getElementById(
    "sort-select-deadline"
  )?.value;

  if (!selectedPriority || !selectedDeadline) return;

  // 締切日でソート
  if (selectedDeadline) {
    sortTasksByDeadline(tasks, selectedDeadline);
  }

  // 優先度でソート
  if (selectedPriority) {
    sortTasksByPriority(tasks, selectedPriority);
  }

  // タスクリストを再表示
  const tasksContainer = document.getElementById("tasks");
  tasksContainer.innerHTML = ""; // タスクリストをクリア
  tasks.map(({ completed, ...taskData }) => addTask(taskData, completed));
};
