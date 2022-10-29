import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {DatepickerComponent} from "../../component-ui/datepicker/datepicker.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputUiComponent} from "../../component-ui/input-ui/input-ui.component";
import {GeneralTabDataTypes} from "../../../../models/formDataTypes";
import {CustomFormService} from "../../../custom-form/custom-form.service";


@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    CommonModule,
    NebularModule,
    DatepickerComponent,
    ReactiveFormsModule,
    InputUiComponent
  ],
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  constructor(private customFmSrv:CustomFormService) { }
  @Input() formData:any
  @Input() fmControls:any;
           dataTypes = new GeneralTabDataTypes();
  @Output() output = new EventEmitter();



  onOutputChange = (event) => this.customFmSrv.sessionLogDeleteHandler(event)


  inputStart = (dataType:string) => this.customFmSrv.createSessionLog(dataType)


  ngOnInit(): void {}

}
