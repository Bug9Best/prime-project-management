export interface TaskType {
  label: string;
  value: string;
}

export var listTaskType: TaskType[] = [
  {
    label: 'detail.task.type.task',
    value: 'TASK',
  },
  {
    label: 'detail.task.type.subTask',
    value: 'SUBTASK',
  },
  {
    label: 'detail.task.type.bug',
    value: 'BUG',
  },
]