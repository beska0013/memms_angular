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

  @Output() output = new EventEmitter();

  dataTypes = new GeneralTabDataTypes();
  private dateInputTypes = [
    this.dataTypes.due_date,
    this.dataTypes.completion_date,
    this.dataTypes.commit_date,
    this.dataTypes.current_sts_date,
    this.dataTypes.project_start_date,
  ];

  onOutputChange = (event) => this.customFmSrv.prjFormUpdateHandler(event);
  inputStart = (dataType:string) => this.customFmSrv.createSessionLog(dataType)

  resetDates(){
    this.fmControls.due_date.reset();
    this.fmControls.commit_date.reset();
    this.fmControls.project_start_date.reset();
    this.fmControls.completion_date.reset();
    this.fmControls.current_sts_date.reset();
    this.dateInputTypes.forEach(type => this.inputStart(type));
    setTimeout(()=>this.dateInputTypes.forEach(type => this.onOutputChange({type: type, value: null})), 3000);
  }

  ngOnInit(): void {
    console.log(this.fmControls);
  }

}
