export const showDeletePopup = (li) => {
  const popup = document.getElementById("delete-popup");
  const popupTaskName = document.getElementById("popup-task-name");
  const popupTaskPriority = document.getElementById("popup-task-priority");
  const popupTaskDeadline = document.getElementById("popup-task-deadline");
  const confirmDeleteButton = document.getElementById("button-confirm");
  const cancelDeleteButton = document.getElementById("button-cancel");

  const taskName = li.querySelector(".task-name").innerText;
  const taskPriority = li.querySelector(".task-priority");
  const taskDeadline = li.querySelector(".task-deadline");

  popupTaskName.innerText = taskName;
  popupTaskPriority.innerText = taskPriority.options[taskPriority.selectedIndex].text || "なし";
  popupTaskDeadline.innerText = taskDeadline.value || "なし";

  popup.classList.remove("hidden");

  confirmDeleteButton.addEventListener("click", () => {
    li.remove();
    popup.classList.add("hidden");
  });

  cancelDeleteButton.addEventListener("click", () => {
    popup.classList.add("hidden");
  });
};
