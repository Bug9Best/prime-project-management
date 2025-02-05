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
        label: 'PROJECT_MENU_DASHBOARD',
        icon: 'pi pi-th-large'
    },
    {
        type: 'menu',
        tabIndex: 1,
        label: 'PROJECT_MENU_SPRINT',
        icon: 'pi pi-spinner'
    },
    {
        type: 'menu',
        tabIndex: 2,
        label: 'PROJECT_MENU_BACKLOG',
        icon: 'pi pi-align-left'
    },
    {
        type: 'menu',
        tabIndex: 5,
        label: 'PROJECT_MENU_TASK',
        icon: 'pi pi-list-check'
    },
    {
        type: 'menu',
        tabIndex: 6,
        label: 'PROJECT_MENU_RESOURCE',
        icon: 'pi pi-file'
    },
    {
        type: 'divider',
    },
    {
        type: 'menu',
        tabIndex: 7,
        label: 'PROJECT_MENU_MEMBER',
        icon: 'pi pi-users'
    },
    {
        type: 'menu',
        tabIndex: 8,
        label: 'PROJECT_MENU_SETTING',
        icon: 'pi pi-cog'
    },
]


export var listWaterfallProjectMenu: ProjectMenu[] = [
    {
        type: 'menu',
        tabIndex: 0,
        label: 'PROJECT_MENU_DASHBOARD',
        icon: 'pi pi-th-large'
    },
    {
        type: 'menu',
        tabIndex: 3,
        label: 'PROJECT_MENU_GANTT',
        icon: 'pi pi-calendar-clock'
    },
    {
        type: 'menu',
        tabIndex: 5,
        label: 'PROJECT_MENU_TASK',
        icon: 'pi pi-list-check'
    },
    {
        type: 'menu',
        tabIndex: 6,
        label: 'PROJECT_MENU_RESOURCE',
        icon: 'pi pi-file'
    },
    {
        type: 'divider',
    },
    {
        type: 'menu',
        tabIndex: 7,
        label: 'PROJECT_MENU_MEMBER',
        icon: 'pi pi-users'
    },
    {
        type: 'menu',
        tabIndex: 8,
        label: 'PROJECT_MENU_SETTING',
        icon: 'pi pi-cog'
    },
]


export var listKanbanProjectMenu: ProjectMenu[] = [
    {
        type: 'menu',
        tabIndex: 0,
        label: 'PROJECT_MENU_DASHBOARD',
        icon: 'pi pi-th-large'
    },
    {
        type: 'menu',
        tabIndex: 4,
        label: 'PROJECT_MENU_BOARD',
        icon: 'pi pi-clipboard'
    },
    {
        type: 'menu',
        tabIndex: 5,
        label: 'PROJECT_MENU_TASK',
        icon: 'pi pi-list-check'
    },
    {
        type: 'menu',
        tabIndex: 6,
        label: 'PROJECT_MENU_RESOURCE',
        icon: 'pi pi-file'
    },
    {
        type: 'divider',
    },
    {
        type: 'menu',
        tabIndex: 7,
        label: 'PROJECT_MENU_MEMBER',
        icon: 'pi pi-users'
    },
    {
        type: 'menu',
        tabIndex: 8,
        label: 'PROJECT_MENU_SETTING',
        icon: 'pi pi-cog'
    },
]
