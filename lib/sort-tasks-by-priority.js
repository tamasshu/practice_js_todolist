export const sortTasksByPriority = (tasks, order) => {
  tasks.sort((a, b) => {
    return order === "sort-select__priority-high"
      ? quantifyPriority(b.priority) - quantifyPriority(a.priority)
      : quantifyPriority(a.priority) - quantifyPriority(b.priority);
  });
};

// 優先度を数値化する
const quantifyPriority = (priority) => {
  switch (priority) {
    case "input-priority__high":
      return 3;
    case "input-priority__medium":
      return 2;
    case "input-priority__low":
      return 1;
    default:
      return 0;
  }
};
