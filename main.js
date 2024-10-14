'use strict'

// タスク追加ボタンのクリック時の処理
const onClickAdd = () => {
  const inputText = document.getElementById("input-task").value;
  if (inputText === "") return; // 空入力の防止

  addTask(inputText, false); // タスクを追加

  document.getElementById("input-task").value = "";
};

// タスクの追加処理
const addTask = (inputText) => {
  const tasksContainer = document.getElementById("tasks");
  const fragment = document.createDocumentFragment(); // フラグメントを作成
  const taskElement = createTaskElement(inputText, completed);
  fragment.appendChild(taskElement); // フラグメントにタスクを追加
  tasksContainer.appendChild(fragment); // フラグメントをDOMに追加
};

// タスク要素を作成する関数
const createTaskElement = (inputText, completed) => {
  const li = document.createElement("li");
  if (completed) {
    li.classList.add("completed");
  }

  const p = document.createElement("p");
  p.innerText = inputText;

  const buttonDiv = createButtonDiv(li);

  li.appendChild(p);
  li.appendChild(buttonDiv);

  return li;
};

const createButtonDiv = (li) => {
  const buttonDiv = document.createElement("div");

  const completeButton = createCompleteButton(li);
  const deleteButton = createDeleteButton(li);

  buttonDiv.appendChild(completeButton);
  buttonDiv.appendChild(deleteButton);

  return buttonDiv;
};

const createCompleteButton = (li) => {
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
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
    document.getElementById("tasks").removeChild(li);
  });
  return deleteButton;
};

// タスク追加ボタンのクリックイベント
document.getElementById("button-add").addEventListener("click", onClickAdd);
