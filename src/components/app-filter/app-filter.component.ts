import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-filter',
  imports: [
    ButtonModule,
    InputTextModule,
    DividerModule
  ],
  templateUrl: './app-filter.component.html',
  styleUrl: './app-filter.component.scss'
})
export class AppFilter {

}
