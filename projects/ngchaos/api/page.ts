import { effect, inject, Injectable, signal } from "@angular/core";
import { ChaosAuth } from "../auth/auth";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: 'root' })
export class ChaosPageService  {

  auth = inject(ChaosAuth);
  translate = inject(TranslateService);
  
  key: string = 'ngchaos';
  font = signal<string>('Noto Sans Thai');
  fontSize = signal<string>('16px');
  theme = signal<string>('lara-light-teal-theme');
  lang = signal<string>('th');
  
  project = signal<string>('default');
  menu = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.setFont(this.font());
      this.setFontSize(this.fontSize());
      this.setTheme(this.theme());
      this.setLang(this.lang());
    });
  }

  loadTheme(): void {
    let config = localStorage.getItem(this.key);
    if (config) {
      const json = JSON.parse(config);
      this.font.set(json.font || 'Noto Sans Thai');
      this.fontSize.set(json.fontSize || '16px');
      this.theme.set(json.theme || 'lara-light-teal-theme');
      this.lang.set(json.lang || 'th');
      this.project.set(json.project || 'default');
    }
  }
  
  saveTheme(): void {
    localStorage.setItem(this.key, JSON.stringify({
      font: this.font(),
      fontSize: this.fontSize(),
      theme: this.theme(),
      lang: this.lang(),
      project: this.project()
    }));
  }
  
  setFontSize(size: string) {
    document.documentElement.style.setProperty('--font-size', size);
  }
  
  setFont(font: string) {
    document.documentElement.style.setProperty('--font-family', font);
  }
  
  setTheme(theme: string) {
    let themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${theme}.css`;
    }
  }
  
  setLang(lang: string) {
    this.translate.use(lang);
  }
  
}