import { addTask } from "./task-manager.js";

export const sortTasks = () => {
  const tasks = Array.from(document.querySelectorAll("#tasks li")).map(li => {
    const taskText = li.querySelector(".task-name").innerText;
    const completed = li.classList.contains("completed");
    const priority = li.querySelector(".task-priority").value;
    const deadline = li.querySelector(".task-deadline").value;
    return { text: taskText, completed, priority, deadline };
  });

  // 優先度と締切日のセレクションを取得
  const selectedPriority = document.getElementById('sort-select-priority')?.value;
  const selectedDeadline = document.getElementById('sort-select-deadline')?.value;

  if (!selectedPriority || !selectedDeadline) return;

  // 締切日でソート
  if (selectedDeadline === 'sort-select__deadline-early') {
    tasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  } else if (selectedDeadline === 'sort-select__deadline-late') {
    tasks.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
  }

  // 優先度でソート
  if (selectedPriority === 'sort-select__priority-heigh') {
    tasks.sort((a, b) => priorityValue(b.priority) - priorityValue(a.priority));
  } else if (selectedPriority === 'sort-select__priority-low') {
    tasks.sort((a, b) => priorityValue(a.priority) - priorityValue(b.priority));
  }

  // タスクリストを再表示
  const tasksContainer = document.getElementById("tasks");
  tasksContainer.innerHTML = ""; // タスクリストをクリア
  tasks.map(task => addTask(task.text, task.completed, task.priority, task.deadline)); // ソートされたタスクを再追加
};

// 優先度の値を数値化
const priorityValue = (priority) => {
  switch (priority) {
    case 'task-priority__heigh': return 3;
    case 'task-priority__medium': return 2;
    case 'task-priority__low': return 1;
    default: return 0;
  }
};
