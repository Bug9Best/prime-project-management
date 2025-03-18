export interface ProjectType {
  title: string;
  description: string;
  value?: string;
  icon: string;
  color: string;
}

export var listProjectType: ProjectType[] = [
  {
    title: 'project.scrum.title',
    description: 'project.scrum.description',
    value: 'SCRUM',
    icon: 'pi-sync',
    color: 'blue'
  },
  {
    title: 'project.kanban.title',
    description: 'project.kanban.description',
    value: 'KANBAN',
    icon: 'pi-clipboard',
    color: 'orange'
  },
  {
    title: 'project.waterfall.title',
    description: 'project.waterfall.description',
    value: 'WATERFALL',
    icon: 'pi-check-circle',
    color: 'green'
  },
]