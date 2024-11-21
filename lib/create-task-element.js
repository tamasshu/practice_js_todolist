export const createTaskElement = (
  tagName,
  className,
  propertyName = "",
  attributes = {}
) => {
  const taskElement = document.createElement(tagName);
  taskElement.classList.add(className);

  if (propertyName) {
    taskElement[propertyName] = "";
  }

  for (const [key, value] of Object.entries(attributes)) {
    taskElement[key] = value;
  }

  return taskElement;
};
