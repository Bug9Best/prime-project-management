export interface ProjectMenu {
    type: string;
    tabIndex?: number;
    label?: string;
    icon?: string;
}

export var listScrumProjectMenu: ProjectMenu[] = [
    {
        type: 'menu',
        tabIndex: 0,
        label: 'project.menu.dashboard',
        icon: 'pi pi-th-large'
    },
    {
        type: 'menu',
        tabIndex: 1,
        label: 'project.menu.sprint',
        icon: 'pi pi-sync'
    },
    {
        type: 'menu',
        tabIndex: 2,
        label: 'project.menu.backlog',
        icon: 'pi pi-align-left'
    },
    {
        type: 'menu',
        tabIndex: 5,
        label: 'project.menu.task',
        icon: 'pi pi-list-check'
    },
    {
        type: 'menu',
        tabIndex: 6,
        label: 'project.menu.resource',
        icon: 'pi pi-file'
    },
    {
        type: 'divider',
    },
    {
        type: 'menu',
        tabIndex: 7,
        label: 'project.menu.member',
        icon: 'pi pi-users'
    },
    {
        type: 'menu',
        tabIndex: 8,
        label: 'project.menu.setting',
        icon: 'pi pi-cog'
    },
]


export var listWaterfallProjectMenu: ProjectMenu[] = [
    {
        type: 'menu',
        tabIndex: 0,
        label: 'project.menu.dashboard',
        icon: 'pi pi-th-large'
    },
    {
        type: 'menu',
        tabIndex: 3,
        label: 'project.menu.gantt',
        icon: 'pi pi-calendar-clock'
    },
    {
        type: 'menu',
        tabIndex: 5,
        label: 'project.menu.task',
        icon: 'pi pi-list-check'
    },
    {
        type: 'menu',
        tabIndex: 6,
        label: 'project.menu.resource',
        icon: 'pi pi-file'
    },
    {
        type: 'divider',
    },
    {
        type: 'menu',
        tabIndex: 7,
        label: 'project.menu.member',
        icon: 'pi pi-users'
    },
    {
        type: 'menu',
        tabIndex: 8,
        label: 'project.menu.setting',
        icon: 'pi pi-cog'
    },
]


export var listKanbanProjectMenu: ProjectMenu[] = [
    {
        type: 'menu',
        tabIndex: 0,
        label: 'project.menu.dashboard',
        icon: 'pi pi-th-large'
    },
    {
        type: 'menu',
        tabIndex: 4,
        label: 'project.menu.board',
        icon: 'pi pi-clipboard'
    },
    {
        type: 'menu',
        tabIndex: 5,
        label: 'project.menu.task',
        icon: 'pi pi-list-check'
    },
    {
        type: 'menu',
        tabIndex: 6,
        label: 'project.menu.resource',
        icon: 'pi pi-file'
    },
    {
        type: 'divider',
    },
    {
        type: 'menu',
        tabIndex: 7,
        label: 'project.menu.member',
        icon: 'pi pi-users'
    },
    {
        type: 'menu',
        tabIndex: 8,
        label: 'project.menu.setting',
        icon: 'pi pi-cog'
    },
]
