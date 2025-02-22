export interface ProjectFeature {
  title: string;
  description: string;
  icon: string;
}

export var listProjectFeatures: ProjectFeature[] = [
  {
    title: 'feature.scrum',
    description: 'feature.scrumDescription',
    icon: 'pi-spinner'
  },
  {
    title: 'feature.waterfall',
    description: 'feature.waterfallDescription',
    icon: 'pi-check-circle'
  },
  {
    title: 'feature.kanban',
    description: 'feature.kanbanDescription',
    icon: 'pi-clipboard'
  },
  {
    title: 'feature.member',
    description: 'feature.memberDescription',
    icon: 'pi-users'
  },
  {
    title: 'feature.resource',
    description: 'feature.resourceDescription',
    icon: 'pi-file'
  },
  {
    title: 'feature.notify',
    description: 'feature.notifyDescription',
    icon: 'pi-send'
  },

]