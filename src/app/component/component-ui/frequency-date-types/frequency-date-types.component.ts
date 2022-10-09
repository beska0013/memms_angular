import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-frequency-date-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './frequency-date-types.component.html',
  styleUrls: ['./frequency-date-types.component.scss']
})
export class FrequencyDateTypesComponent implements OnInit {

  constructor() { }
  @Input() type:string

  ngOnInit(): void {
  }

}
