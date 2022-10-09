import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {DatepickerComponent} from "../../component-ui/datepicker/datepicker.component";

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [CommonModule, NebularModule, DatepickerComponent],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
