import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'section-footer',
  imports: [
    TranslateModule
  ],
  templateUrl: './section-footer.component.html',
  styleUrl: './section-footer.component.scss'
})
export class SectionFooter {

  contact : string = 'footer.contact';
  university : string = 'footer.university';
  locate : string = 'footer.locate';
}
