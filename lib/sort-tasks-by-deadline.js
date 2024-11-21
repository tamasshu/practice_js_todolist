export const sortTasksByDeadline = (tasks, order) => {
  tasks.sort((a, b) => {
    const dateA = a.deadline ? new Date(a.deadline) : new Date(0);
    const dateB = b.deadline ? new Date(b.deadline) : new Date(0);

    return order === "sort-select__deadline-early"
      ? dateA - dateB
      : dateB - dateA;
  });
};
