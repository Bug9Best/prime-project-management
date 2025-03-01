export interface TaskStatus {
  label: string;
  value: number;
}

export var listTaskStatus: TaskStatus[] = [
  {
    label: 'detail.task.status.todo',
    value: 1,
  },
  {
    label: 'detail.task.status.doing',
    value: 2,
  },
  {
    label: 'detail.task.status.done',
    value: 3,
  },
]