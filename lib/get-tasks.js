export const getTasks = (li) => {
  const name = li.querySelector(".input-name").innerText;
  const completed = li.classList.contains("completed");
  const priority = li.querySelector(".input-priority").value;
  const deadline = li.querySelector(".input-deadline").value;

  return { name, completed, priority, deadline };
};
