import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'c-menubar',
  styles: `
    .menu-text {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 60vw;
      font-size: 1.15rem;
      
      @media screen and (max-width: 600px) {
        font-size: 0.95rem;
      }
      
      @supports (-webkit-line-clamp: 2) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    
    ::ng-deep .c-menubar {

      .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon,
      .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon,
      .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
        color: light-dark(#2e2e2e, #f5f5f5);
      }

      .p-menubar-root-list > .p-menuitem > .p-menuitem-content {
        background-color: transparent;
      }

      .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon,
      .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
        color: light-dark(#2e2e2e, #f5f5f5);
      }

      .p-submenu-list {
        z-index: 10;
        width: 280px;
      }

      @media screen and (max-width: 960px) {
        .p-menubar-button {
          color: light-dark(#2e2e2e, #f5f5f5);
        }
        .p-menubar-button:hover {
          color: light-dark(#2e2e2e, #f5f5f5);
          background: var(--primary-color);
        }
        .p-menubar-root-list {
          width: 320px;
          left: auto;
          right: 0;
        }
        .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-submenu-icon,
        .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon,
        .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
          color: light-dark(#2e2e2e, #f5f5f5);
        }
        .p-submenu-list {
          width: 100%;
        }
      }
    }
  `,
  template: `
    <div class="w-full flex align-items-center justify-content-between lg:justify-content-start" [style]="{ minHeight: '60px' }">
      @if(showLabel) {
        <div class="ml-3 flex align-items-center">
          <span class="material-symbols-outlined w-2rem">
            {{ icon }}
          </span>
          <span class="font-bold menu-text">
            {{ label }}
          </span>
        </div>
      }
      <div>
        <p-menubar [model]="items" styleClass="c-menubar bg-transparent border-none" />
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule, 
    MenubarModule
  ],
})
export class ChaosMenubar {

  @Input()
  icon: string = 'engineering';

  @Input()
  label: string = 'Menu';

  @Input()
  items: MenuItem[] = [];
  
  @Input()
  showLabel: boolean = true;

}
