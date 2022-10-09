import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbDatepickerModule} from "@nebular/theme";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import { NbIconLibraries } from '@nebular/theme';
@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, NbDatepickerModule, NebularModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Input() for:string

  constructor(protected iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerSvgPack('datepicker', {
      'calendar': ' <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"  xml:space="preserve"><rect y="83.2" style="fill:#C9E3F7;" width="512" height="422.4"/><rect x="256" y="83.2" style="fill:#78B9EB;" width="256" height="422.4"/><rect x="64" y="83.2" style="fill:#3C5D76;" width="384" height="89.6"/><rect x="102.4" y="6.4" style="fill:#C9E3F7;" width="76.8" height="115.2"/><g><rect x="332.8" y="6.4" style="fill:#78B9EB;" width="76.8" height="115.2"/><rect x="102.4" y="236.8" style="fill:#78B9EB;" width="76.8" height="76.8"/></g><g><rect x="332.8" y="236.8" style="fill:#3C5D76;" width="76.8" height="76.8"/><rect x="332.8" y="352" style="fill:#3C5D76;" width="76.8" height="76.8"/></g><g><rect x="102.4" y="352" style="fill:#78B9EB;" width="76.8" height="76.8"/><rect x="217.6" y="236.8" style="fill:#78B9EB;" width="76.8" height="76.8"/><rect x="217.6" y="352" style="fill:#78B9EB;" width="76.8" height="76.8"/></g><g><rect x="256" y="236.8" style="fill:#3C5D76;" width="38.4" height="76.8"/><rect x="256" y="352" style="fill:#3C5D76;" width="38.4" height="76.8"/></g><polygon style="fill:#C9E3F7;" points="256,6.4 217.6,6.4 217.6,121.6 256,121.6 268.8,57.6 "/><rect x="256" y="6.4" style="fill:#78B9EB;" width="38.4" height="115.2"/></svg>'

    });
  }

  ngOnInit(): void {
  }

}
