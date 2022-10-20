import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {DatepickerComponent} from "../../component-ui/datepicker/datepicker.component";
import {NbSharedModule} from "@nebular/theme/components/shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {InputUiComponent} from "../../component-ui/input-ui/input-ui.component";
import {GeneralTabDataTypes} from "../../../../models/formDataTypes";
import {CustomFormService} from "../../../custom-form/custom-form.service";
import {tap} from "rxjs";

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

  dataTypes = new GeneralTabDataTypes();
  @Input() formData:any
  @Input() fmControls:any;


  ngOnInit(): void {
    console.log('general',this.formData);
    // this.sessionLogFieldTypes.subscribe(res=>{
    //   console.log('genTab',res);
    // })
  }

}
