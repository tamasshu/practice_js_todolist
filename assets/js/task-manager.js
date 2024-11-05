import { showDeletePopup } from "./popup-manager.js";
import { appendChildren } from "../../lib/append-children.js";
import { createTaskElement } from "../../lib/create-task-element.js";

export const clickAddButton = () => {
  // タスクデータを取得
  const taskData = {
    name: document.getElementById("input-task").value,
    priority: document.getElementById("input-priority").value,
    deadline: document.getElementById("input-deadline").value,
  };

  if (!taskData.name) {
    return;
  }

  // タスクを追加
  addTask(taskData, false);

  // 入力欄をクリア
  document.getElementById("input-task").value = "";
  document.getElementById("input-priority").value = "input-priority__medium";
  document.getElementById("input-deadline").value = "";
};

export const addTask = (taskData, completed) => {
  const tasksContainer = document.getElementById("tasks");
  const fragment = document.createDocumentFragment();
  const taskElement = createTaskListElement(taskData, completed);
  appendChildren(fragment, [taskElement]);
  appendChildren(tasksContainer, [fragment]);
};

const createTaskListElement = (taskData, completed) => {
  const taskLi = document.createElement("li");

  if (completed) {
    taskLi.classList.add("completed");
  }

  const nameElement = createTaskElement("span", "input-name", "innerText");
  nameElement.innerText = taskData.name;

  const prioritiesAndButtons = createTaskElement(
    "div",
    "priorities-and-buttons",
    ""
  );

  const priorityElement = createPriority(taskData.priority);

  const deadlineElement = createTaskElement(
    "input",
    "input-deadline",
    "value",
    {
      type: "date",
    }
  );
  deadlineElement.value = taskData.deadline;

  const buttons = createButtons(taskLi);

  appendChildren(prioritiesAndButtons, [
    priorityElement,
    deadlineElement,
    buttons,
  ]);
  appendChildren(taskLi, [nameElement, prioritiesAndButtons]);

  return taskLi;
};

const createPriority = (priority) => {
  const priorityElement = createTaskElement("select", "input-priority");

  const priorities = [
    { value: "input-priority__high", text: "高" },
    { value: "input-priority__medium", text: "中" },
    { value: "input-priority__low", text: "低" },
  ];

  const options = priorities.map(({ value, text }) => {
    const option = createTaskElement(
      "option",
      "input-priority-option",
      "innerText",
      {
        value,
      }
    );
    option.innerText = text;

    if (priority === value) {
      option.selected = true;
    }

    return option;
  });

  appendChildren(priorityElement, options);

  return priorityElement;
};

const createButtons = (taskLi) => {
  const buttons = createTaskElement("div", "buttons", "");

  const completeButton = createCompleteButton(taskLi);
  const deleteButton = createDeleteButton(taskLi);

  appendChildren(buttons, [completeButton, deleteButton]);

  return buttons;
};

const createCompleteButton = (taskLi) => {
  const completeButton = createTaskElement(
    "button",
    "button__complete",
    "innerText",
    { type: "button" }
  );
  completeButton.innerText = "完了";

  completeButton.addEventListener("click", () => {
    taskLi.classList.toggle("completed");
  });

  return completeButton;
};

const createDeleteButton = (taskLi) => {
  const deleteButton = createTaskElement(
    "button",
    "button__delete",
    "innerText",
    { type: "button" }
  );
  deleteButton.innerText = "削除";

  deleteButton.addEventListener("click", () => {
    showDeletePopup(taskLi);
  });

  return deleteButton;
};
