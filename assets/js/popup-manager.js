export const showDeletePopup = (taskLi) => {
  const popup = {
    popup: document.getElementById("delete-popup"),
    taskName: document.getElementById("popup-task-name"),
    taskPriority: document.getElementById("popup-task-priority"),
    taskDeadline: document.getElementById("popup-task-deadline"),
    confirmDeleteButton: document.getElementById("button-confirm"),
    cancelDeleteButton: document.getElementById("button-cancel"),
  };

  const popupTask = {
    name: taskLi.querySelector(".input-name").innerText,
    priority: taskLi.querySelector(".input-priority"),
    deadline: taskLi.querySelector(".input-deadline"),
  };

  popup.taskName.innerText = popupTask.name;
  popup.taskPriority.innerText =
    popupTask.priority.options[popupTask.priority.selectedIndex].text || "なし";
  popup.taskDeadline.innerText = popupTask.deadline.value || "なし";

  popup.popup.classList.remove("hidden");

  popup.confirmDeleteButton.addEventListener("click", () => {
    taskLi.remove();
    popup.popup.classList.add("hidden");
  });

  popup.cancelDeleteButton.addEventListener("click", () => {
    popup.popup.classList.add("hidden");
  });
};
