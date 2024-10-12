export const onClickAdd = () => {
  const inputText = document.getElementById("input-task").value;
  const taskPriority = document.getElementById("task-priority").value;
  const taskDeadline = document.getElementById("task-deadline").value;

  if (inputText === "") return;

  document.getElementById("input-task").value = "";
  document.getElementById("task-priority").value = "task-priority__medium";
  document.getElementById("task-deadline").value = "";
  setTodayDate();

  addTask(inputText, false, taskPriority, taskDeadline);
};

export const addTask = (inputText, completed, priority = "", deadline = "") => {
  const tasksContainer = document.getElementById("tasks");
  const fragment = document.createDocumentFragment();
  const taskElement = createTaskElement(
    inputText,
    completed,
    priority,
    deadline
  );
  fragment.appendChild(taskElement);
  tasksContainer.appendChild(fragment);
};

// タスク要素を作成する関数
const createTaskElement = (inputText, completed, priority, deadline) => {
  const li = document.createElement("li");
  li.classList.add("task");
  if (completed) {
    li.classList.add("completed");
  }

  const taskNameSpan = document.createElement("span");
  taskNameSpan.classList.add("task-name");
  taskNameSpan.innerText = inputText;

  const taskInfoDiv = document.createElement("div");
  taskInfoDiv.classList.add("task-info");

  const taskPrioritySelect = document.createElement("select");
  taskPrioritySelect.classList.add("task-priority");
  const priorities = [
    { value: "task-priority__high", text: "高" },
    { value: "task-priority__medium", text: "中" },
    { value: "task-priority__low", text: "低" },
  ];

  // 優先度のオプションを追加
  priorities.forEach(({ value, text }) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = text;
    if (value === priority) {
      option.selected = true;
    }
    taskPrioritySelect.appendChild(option);
  });

  const taskDeadlineInput = document.createElement("input");
  taskDeadlineInput.classList.add("task-deadline");
  taskDeadlineInput.type = "date";
  taskDeadlineInput.value = deadline;

  const completedButton = document.createElement("button");
  completedButton.classList.add("button-complete");
  completedButton.innerText = "完了";
  completedButton.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("button-delete");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    const popup = document.getElementById("delete-popup");
    const popupTaskName = document.getElementById("popup-task-name");
    const popupTaskPriority = document.getElementById("popup-task-priority");
    const popupTaskDeadline = document.getElementById("popup-task-deadline");

    popupTaskName.innerText = inputText;
    popupTaskPriority.innerText = taskPrioritySelect.options[taskPrioritySelect.selectedIndex].text;
    popupTaskDeadline.innerText = deadline || "なし";

    const confirmDeleteButton = document.getElementById("button-confirm");
    const cancelDeleteButton = document.getElementById("button-cancel");

    popup.classList.remove("hidden");

    confirmDeleteButton.addEventListener("click", () => {
      li.remove();
      popup.classList.add("hidden");
    });

    cancelDeleteButton.addEventListener("click", () => {
      popup.classList.add("hidden");
    });
  });

  taskInfoDiv.appendChild(taskPrioritySelect);
  taskInfoDiv.appendChild(taskDeadlineInput);
  taskInfoDiv.appendChild(completedButton);
  taskInfoDiv.appendChild(deleteButton);

  li.appendChild(taskNameSpan);
  li.appendChild(taskInfoDiv);

  return li;
};

// 今日の日付を設定する関数
export const setTodayDate = () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("task-deadline").value = today;
};
