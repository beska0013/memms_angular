import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {SearchableDropdownComponent} from "../../component-ui/searchable-dropdown/searchable-dropdown.component";
import {ControlDataTypes} from "../../../../models/formDataTypes";



@Component({
  selector: 'app-fm-control',
  standalone: true,
    imports: [
        CommonModule,
        NebularModule,
        ReactiveFormsModule,
        SearchableDropdownComponent,

    ],
  templateUrl: './fm-control.component.html',
  styleUrls: ['./fm-control.component.scss']
})
export class FmControlComponent implements OnInit, AfterViewInit {
  constructor() { }

  @Input() formData!: any
  @Input() humanResource!:any;
  @Input() status:any;
  @Input() statusReason:any;
  @Input() organizations!:any;
  @Input() cntSectionFmControls:any
  @Output() output = new EventEmitter()


  dataTypes = new ControlDataTypes()
  priorityGroup = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  prioritySubGroup = ['A', 'B', 'C'];


  onFieldChange(event){
    console.log(event);
    //this.output.emit(event)
  }




  ngOnInit(): void {
    console.log(this.dataTypes.orgId);

  }



  ngAfterViewInit(): void {

  }



}
