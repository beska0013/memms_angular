import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutoTextDataTypes} from "../../../../models/formDataTypes";
import {InputUiComponent} from "../../component-ui/input-ui/input-ui.component";

@Component({
  selector: 'app-auto-text',
  standalone: true,
  imports: [CommonModule, InputUiComponent],
  templateUrl: './auto-text.component.html',
  styleUrls: ['./auto-text.component.scss']
})
export class AutoTextComponent implements OnInit {

  constructor() { }

  @Input() formData:any;
  @Input() fmControls:any;

  @Output() output = new EventEmitter();

  dataTypes = new AutoTextDataTypes()


  ngOnInit(): void {}

}
