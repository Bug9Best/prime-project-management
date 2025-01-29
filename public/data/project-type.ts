export interface ProjectType {
  title: string;
  description: string;
  value?: string;
  icon: string;
  color: string;
}

export var listProjectType: ProjectType[] = [
  {
    title: 'PROJECT_SCRUM',
    description: 'PROJECT_SCRUM_DESCRIPTION',
    value: 'SCRUM',
    icon: 'pi-spinner',
    color: 'blue'
  },
  {
    title: 'PROJECT_WATERFALL',
    description: 'PROJECT_WATERFALL_DESCRIPTION',
    value: 'WATERFALL',
    icon: 'pi-check-circle',
    color: 'green'
  },
  {
    title: 'PROJECT_KANBAN',
    description: 'PROJECT_KANBAN_DESCRIPTION',
    value: 'KANBAN',
    icon: 'pi-clipboard',
    color: 'orange'
  },
]