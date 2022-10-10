import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {SearchableDropdownComponent} from "../../component-ui/searchable-dropdown/searchable-dropdown.component";



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

  @Input() formData!: any
  @Input() humanResource!:any;
  @Input() status:any;
  @Input() statusReason:any;
  @Input() organizations!:any;


  @Input() cntSectionFmControls:any

  constructor() { }
  selectedItem = 2;






  // ownerInputFormControl = new FormControl();

  priorityGroup = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  prioritySubGroup = ['A', 'B', 'C'];






  ngOnInit(): void {


   // this.orgInputFormControl.valueChanges.subscribe(res => console.log(res))

    // console.log('humanResource', this.humanResource);
    // console.log('status', this.status);
    // console.log('statusReason', this.statusReason);
    // console.log('organizations', this.organizations);
  }



  ngAfterViewInit(): void {

  }



}
