export interface ProjectFeature {
  title: string;
  description: string;
  icon: string;
}

export var listProjectFeatures: ProjectFeature[] = [
  {
    title: 'home.feature.scrum',
    description: 'home.feature.scrumDescription',
    icon: 'pi-spinner'
  },
  {
    title: 'home.feature.waterfall',
    description: 'home.feature.waterfallDescription',
    icon: 'pi-check-circle'
  },
  {
    title: 'home.feature.kanban',
    description: 'home.feature.kanbanDescription',
    icon: 'pi-clipboard'
  },
  {
    title: 'home.feature.member',
    description: 'home.feature.memberDescription',
    icon: 'pi-users'
  },
  {
    title: 'home.feature.resource',
    description: 'home.feature.resourceDescription',
    icon: 'pi-file'
  },
  {
    title: 'home.feature.notify',
    description: 'home.feature.notifyDescription',
    icon: 'pi-send'
  },

]