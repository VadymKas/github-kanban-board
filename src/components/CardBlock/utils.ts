const getIssueCols = (issues: []): CardCol[] => {
  const todo = issues?.filter(
    (issue: FetchProps) => issue.state === 'open' && !issue.assignees.length,
  );

  const inProgress = issues?.filter(
    (issue: FetchProps) => issue.state === 'open' && issue.assignees.length,
  );

  const done = issues?.filter((issue: FetchProps) => issue.state === 'closed');

  return [
    {
      name: 'ToDo',
      id: 'ToDo',
      issues: todo,
    },
    {
      name: 'In Progress',
      id: 'InProgress',
      issues: inProgress,
    },
    {
      name: 'Done',
      id: 'Done',
      issues: done,
    },
  ];
};



export default getIssueCols;
