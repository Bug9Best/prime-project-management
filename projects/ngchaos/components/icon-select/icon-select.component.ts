import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, output, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { TabViewModule } from 'primeng/tabview';

export type IconSelectOutput = {
  icon: string;
  styleClass: string;
}

@Component({
  selector: 'c-iconSelect',
  standalone: true,
  imports: [
    CommonModule,
    OverlayPanelModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule
  ],
  templateUrl: './icon-select.component.html',
  styleUrl: './icon-select.component.scss'
})
export class IconSelect {
  
  onSelect = output<IconSelectOutput>();
  
  icon: string = "people";
  styleClass: string = "text-blue-500";
  
  filteredListEmoticons: any[] = [];
  listEmoticons: any[] = [];
  
  filteredListIcons: any[] = [];
  listIcons: any[] = [];
  
  listColors = [
    'text-red-500',
    'text-pink-500',
    'text-purple-500',
    'text-blue-500',
    'text-teal-500',
    'text-green-500',
    'text-yellow-500',
    'text-orange-500',
    'text-500'
  ];
  
  searchEmojiCtrl = new FormControl();
  searchIconCtrl = new FormControl();
  
  constructor(
    private client: HttpClient
  ) {
    this.searchIconCtrl.valueChanges.subscribe((value: string) => {
      this.filteredListIcons = this.listIcons.filter((emoticon: string) => {
        return emoticon.includes(value);
      });
    });
    this.searchEmojiCtrl.valueChanges.subscribe((value: string) => {
      this.filteredListEmoticons = this.listEmoticons.filter((emoticon: any) => {
        return emoticon.name.includes(value);
      });
    });
  }
  
  @ViewChild('overlay')
  panel!: OverlayPanel;
  
  /**
   * Open overlay panel
   *
   * Download google icons json file and list all icons
   * https://raw.githubusercontent.com/marella/material-symbols/refs/heads/main/metadata/versions.json
   
   * @param ev 
   */
  open(ev: any) {
    this.panel.toggle(ev);
    this.client.get('/assets/json/google_icons.json').subscribe((res: any) => {
      this.listIcons = Object.keys(res);
      this.filteredListIcons = this.listIcons;
    });
    this.client.get('/assets/json/emoji.json').subscribe((res: any) => {
      this.listEmoticons = res;
      this.filteredListEmoticons = this.listEmoticons;
    });
  }
  
  @ViewChild('overlayColor')
  panelColor!: OverlayPanel;

  selectColor(ev: any, icon: string) {
    this.panelColor.toggle(ev);
    this.icon = icon;
  }
  
  selectIcon(color: string) {
    this.panel.hide();
    this.panelColor.hide();
    
    this.styleClass = color;
    this.onSelect.emit({
      icon: this.icon,
      styleClass: this.styleClass
    });
  }
  
  selectEmoji(emoji: string) {
    this.panel.hide();
    this.icon = emoji;
    this.onSelect.emit({
      icon: this.icon,
      styleClass: ''
    });
  }
  
}
