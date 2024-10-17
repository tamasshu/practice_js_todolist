import { onClickAdd } from "./task-manager.js";
import { sortTasks } from "./sort.js";

window.addEventListener("DOMContentLoaded", () => {
  // タスク追加ボタンのクリックイベント
  document.getElementById("button-add").addEventListener("click", onClickAdd);

  // ソートの設定
  document
    .getElementById("sort-select-priority")
    .addEventListener("change", sortTasks);
  document
    .getElementById("sort-select-deadline")
    .addEventListener("change", sortTasks);
});
