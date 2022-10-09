import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {NbDatepickerModule} from "@nebular/theme";
import {DatepickerComponent} from "../../component-ui/datepicker/datepicker.component";
import {FrequencyDateTypesComponent} from "../../component-ui/frequency-date-types/frequency-date-types.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-fm-review-frequency',
  standalone: true,
  imports: [CommonModule, NebularModule, NbDatepickerModule, DatepickerComponent, FrequencyDateTypesComponent, FormsModule],
  templateUrl: './fm-review-frequency.component.html',
  styleUrls: ['./fm-review-frequency.component.scss']
})
export class FmReviewFrequencyComponent implements OnInit {

  constructor() { }
  frequency = [
    'No Review',
    'Daily',
    'Week from now',
    'Weekly on',
    'Mon - Wed',
    'Tue - Thur',
    'Mon - Wed - Fri',
    'Month from now',
    'Monthly on',
    'Twice a month',
    'Two weeks from now',
    'Every two weeks on',
    'Every two months',
    'Quarterly',
    'Six months from now',
    'Twice a year on',
    'This day next year',
    'Yearly on',
    'Custom review date'
  ]

  type:string;

  frequencyChage(frequencyType){
    this.type = frequencyType
  }

  ngOnInit(): void {
  }

}
