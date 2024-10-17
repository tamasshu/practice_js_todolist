import { showDeletePopup } from "./popup-manager.js";

export const onClickAdd = () => {
  const inputText = document.getElementById("input-task").value;
  const taskPriority = document.getElementById("task-priority").value;
  const taskDeadline = document.getElementById("task-deadline").value;

  if (inputText === "") return;

  addTask(inputText, false, taskPriority, taskDeadline);

  document.getElementById("input-task").value = "";
  document.getElementById("task-priority").value = "task-priority__medium";
  document.getElementById("task-deadline").value = "";
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

  const taskPrioritySelect = createPrioritySelect(priority);


  const taskDeadlineInput = document.createElement("input");
  taskDeadlineInput.classList.add("task-deadline");
  taskDeadlineInput.type = "date";
  taskDeadlineInput.value = deadline;

  const buttonDiv = createButtonDiv(li);

  taskInfoDiv.appendChild(taskPrioritySelect);
  taskInfoDiv.appendChild(taskDeadlineInput);
  taskInfoDiv.appendChild(buttonDiv);

  li.appendChild(taskNameSpan);
  li.appendChild(taskInfoDiv);

  return li;
};

const createPrioritySelect = (priority) => {
  const taskPrioritySelect = document.createElement("select");
  taskPrioritySelect.classList.add("task-priority");
  const priorities = [
    { value: "task-priority__heigh", text: "高" },
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

  return taskPrioritySelect;
}

const createButtonDiv = (li) => {
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("buttons");

  const completeButton = createCompleteButton(li);
  const deleteButton = createDeleteButton(li);

  buttonDiv.appendChild(completeButton);
  buttonDiv.appendChild(deleteButton);

  return buttonDiv;
};

const createCompleteButton = (li) => {
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.classList.add("button__complete");
  completeButton.addEventListener("click", () => {
    li.classList.toggle("completed");
  });
  return completeButton;
};

const createDeleteButton = (li) => {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.classList.add("button__delete");

  deleteButton.addEventListener("click", () => {
    showDeletePopup(li);
  });

  return deleteButton;
};
