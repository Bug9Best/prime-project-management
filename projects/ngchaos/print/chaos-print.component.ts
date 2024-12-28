import { Component, ContentChildren, TemplateRef, effect, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ChaosPrintToolbar } from './chaos-print-toolbar';
import { ChaosPrintDirective } from './chaos-print.directive'

@Component({
  selector: 'chaos-print',
  templateUrl: './chaos-print.component.html',
  styleUrl: './chaos-print.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ChaosPrintToolbar,
  ],
})
export class ChaosPrint {

  title = input<string>("พิมพ์เอกสาร");
  label = input<string>("พิมพ์เอกสาร");
  desc = input<string>("ตัวอย่างเอกสารก่อนพิมพ์");
  paperSize = input<string>("a4-standard");
  fontFamily = input<string>("THSarabunNew");
  fontSize = input<string>("16pt");
  fontWeight = input<string>("normal");

  constructor(titleService: Title) {
    effect(() => {
      titleService.setTitle(this.title());
    });
  }
  
  get config() {
    return {
      title: this.title()
    }
  }
  
  @ContentChildren(ChaosPrintDirective)
  templates?: ChaosPrintDirective[];
  
  sections: TemplateRef<any>[] = [];
  
  ngAfterContentInit() {
    this.templates?.forEach(t => {
      switch(t.getType()) {
        case "section":
          this.sections.push(t.template);
          break;
      }
    });
  }
  
  print() {
    window.print();
  }
  
}
