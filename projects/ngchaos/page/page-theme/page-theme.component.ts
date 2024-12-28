import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ChaosPageService } from 'ngchaos/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'c-pageTheme',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    OverlayPanelModule,
    ReactiveFormsModule
  ],
  templateUrl: './page-theme.component.html',
  styleUrl: './page-theme.component.scss'
})
export class PageThemeComponent {
  
  listThemes: any[] = [
    "lara-light-blue-theme",
    "lara-light-indigo-theme",
    "lara-light-purple-theme",
    "lara-light-teal-theme",
    "lara-dark-blue-theme",
    "lara-dark-indigo-theme",
    "lara-dark-purple-theme",
    "lara-dark-teal-theme",
  ];
  
  listFonts: any[] = [
    "Sarabun",
    "Noto Sans Thai",
    "Noto Serif Thai",
    "Kanit",
    "Prompt",
  ];
  
  listFontSizes: any[] = [
    "12px",
    "14px",
    "16px",
    "20px"
  ];
  
  fontCtrl: FormControl= new FormControl();
  fontSizeCtrl: FormControl= new FormControl();
  themeCtrl: FormControl= new FormControl();
  
  constructor(
    private page: ChaosPageService 
  ) {
    this.themeCtrl.setValue(this.page.theme());
    this.themeCtrl.valueChanges.subscribe((value) => {
      this.page.theme.set(value);
    });
    
    this.fontCtrl.setValue(this.page.font());
    this.fontCtrl.valueChanges.subscribe((value) => {
      this.page.font.set(value);
    });
    
    this.fontSizeCtrl.setValue(this.page.fontSize());
    this.fontSizeCtrl.valueChanges.subscribe((value) => {
      this.page.fontSize.set(value);
    });
  }
  
  get theme() {
    return this.page.theme();
  }
  
  get fontSize() {
    return this.page.fontSize();
  }
  
  get font()  {
    return this.page.font();
  }
  
  save() {
    this.page.saveTheme();
    window.location.reload();
  }
  
}
