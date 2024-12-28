interface MenuItem {
    label: string;
    icon: string;
    routerLink: string;
}

export class ConfigMenu {
    private readonly projectId: string;
    private readonly planningLabel: string = 'TITLE_PLANNING';
    private readonly planningIcon: string = 'pi-chevron-down';
    private readonly planningExpanded: boolean = true;
    private readonly configLabel: string = 'TITLE_CONFIG';
    private readonly configIcon: string = 'pi-chevron-down';
    private readonly configExpanded: boolean = true;

    constructor(projectId: string) {
        this.projectId = projectId;
    }

    private getCommonItems(): MenuItem[] {
        return [
            { label: 'MENU_DASHBOARD', icon: 'pi-th-large', routerLink: `/project/${this.projectId}/dashboard` },
        ];
    }

    private getResourceItem(): MenuItem {
        return { label: 'MENU_RESOURCE', icon: 'pi-file', routerLink: `/project/${this.projectId}/resource` };
    }

    private getSpecificItems(menuType: 'scrum' | 'waterfall' | 'kanban'): MenuItem[] {
        const specificItems: Record<string, MenuItem[]> = {
            scrum: [
                { label: 'MENU_SPRINT', icon: 'pi-spinner', routerLink: `/project/${this.projectId}/sprint` },
                { label: 'MENU_BACKLOG', icon: 'pi-align-left', routerLink: `/project/${this.projectId}/backlog` },
                { label: 'MENU_LIST', icon: 'pi-list-check', routerLink: `/project/${this.projectId}/task` },
            ],
            waterfall: [
                { label: 'MENU_GANTT', icon: 'pi-calendar-clock', routerLink: `/project/${this.projectId}/gantt` },
                { label: 'MENU_LIST', icon: 'pi-list-check', routerLink: `/project/${this.projectId}/task` },
            ],
            kanban: [
                { label: 'MENU_BOARD', icon: 'pi-clipboard', routerLink: `/project/${this.projectId}/board` },
            ],
        };

        return specificItems[menuType] || [];
    }

    private getPlanningItems(menuType: 'scrum' | 'waterfall' | 'kanban'): MenuItem[] {
        return [
            ...this.getCommonItems(),
            ...this.getSpecificItems(menuType),
            this.getResourceItem(),
        ];
    }

    private getConfigItems(): MenuItem[] {
        return [
            { label: 'MENU_PROJECT_MEMBER', icon: 'pi-users', routerLink: `/project/${this.projectId}/member` },
            { label: 'MENU_PROJECT_SETTING', icon: 'pi-cog', routerLink: `/project/${this.projectId}/setting` }
        ];
    }

    private getMenu(menuType: 'scrum' | 'waterfall' | 'kanban') {
        return [
            {
                label: this.planningLabel,
                icon: this.planningIcon,
                expanded: this.planningExpanded,
                items: this.getPlanningItems(menuType),
            },
            {
                label: this.configLabel,
                icon: this.configIcon,
                expanded: this.configExpanded,
                items: this.getConfigItems(),
            }
        ];
    }

    getScrumMenu() {
        return this.getMenu('scrum');
    }

    getWaterfallMenu() {
        return this.getMenu('waterfall');
    }

    getKanbanMenu() {
        return this.getMenu('kanban');
    }
}
