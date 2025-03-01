export interface TaskPriority {
  label: string;
  value: string;
}

export var listTaskPriority: TaskPriority[] = [
  {
    label: 'detail.task.priority.low',
    value: 'LOW',
  },
  {
    label: 'detail.task.priority.medium',
    value: 'MEDIUM',
  },
  {
    label: 'detail.task.priority.high',
    value: 'HIGH',
  },
  {
    label: 'detail.task.priority.critical',
    value: 'CRITICAL',
  },
]