'use strict'

// ページ読み込み時にlocalStorageからタスクを取得して表示する
window.addEventListener('load', () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach(task => addTask(task.text, task.completed));
});

// タスク追加ボタンのクリック時の処理
const onClickAdd = () => {
  const inputText = document.getElementById("input-task").value;
  if (inputText === "") return; // 空入力の防止
  document.getElementById("input-task").value = ""; // 入力欄を初期化

  addTask(inputText, false); // タスクを追加

  saveTasks(); // タスクを保存
};

// タスクの追加処理
const addTask = (inputText, completed) => {
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

// 完了ボタンと削除ボタンのDivを作成する関数
const createButtonDiv = (li) => {
  const buttonDiv = document.createElement("div");
  buttonDiv.classList.add("buttons");

  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks(); // 状態変更後にタスクを保存
  });

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.classList.add("button__delete");
  deleteButton.addEventListener("click", () => {
    document.getElementById("tasks").removeChild(li);
    saveTasks(); // タスクを削除後に保存
  });

  buttonDiv.appendChild(completeButton);
  buttonDiv.appendChild(deleteButton);

  return buttonDiv;
};

// 現在のタスクリストをlocalStorageに保存する関数
const saveTasks = () => {
  const taskList = [];
  document.querySelectorAll("#tasks li").forEach(li => {
    const taskText = li.querySelector("p").innerText;
    const completed = li.classList.contains("completed"); // 完了状態を確認
    taskList.push({ text: taskText, completed: completed });
  });

  localStorage.setItem('tasks', JSON.stringify(taskList)); // タスクリストをlocalStorageに保存
};

// タスク追加ボタンのクリックイベント
document.getElementById("button-add").addEventListener("click", onClickAdd);
