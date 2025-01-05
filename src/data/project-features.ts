export interface ProjectFeature {
  title: string;
  description: string;
  icon: string;
}

export var listProjectFeatures: ProjectFeature[] = [
  {
    title: 'FEATURE_SCRUM',
    description: 'FEATURE_SCRUM_DESCRIPTION',
    icon: 'pi-spinner'
  },
  {
    title: 'FEATURE_WATER_FALL',
    description: 'FEATURE_WATER_FALL_DESCRIPTION',
    icon: 'pi-check-circle'
  },
  {
    title: 'FEATURE_KANBAN',
    description: 'FEATURE_KANBAN_DESCRIPTION',
    icon: 'pi-clipboard'
  },
  {
    title: 'FEATURE_MEMBER',
    description: 'FEATURE_MEMBER_DESCRIPTION',
    icon: 'pi-users'
  },
  {
    title: 'FEATURE_RESOURCE',
    description: 'FEATURE_RESOURCE_DESCRIPTION',
    icon: 'pi-file'
  },
  {
    title: 'FEATURE_NOTIFY',
    description: 'FEATURE_NOTIFY_DESCRIPTION',
    icon: 'pi-send'
  },

]