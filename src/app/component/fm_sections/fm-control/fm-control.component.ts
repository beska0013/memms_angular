import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NbAutocompleteModule, NbInputModule, NbLayoutModule, NbSelectModule} from "@nebular/theme";
import {map, Observable, of} from "rxjs";



@Component({
  selector: 'app-fm-control',
  standalone: true,
  imports: [
    CommonModule,
    NbSelectModule,
    NbLayoutModule,
    NbAutocompleteModule,
    NbInputModule,

  ],
  templateUrl: './fm-control.component.html',
  styleUrls: ['./fm-control.component.scss']
})
export class FmControlComponent implements OnInit {

  constructor() { }
  selectedItem = 2


  @Input() formData!: any
  @Input() humanResource:any;
  @Input() status:any;
  @Input() statusReason:any;
  @Input() organizations:any;

  priorityGroup = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  prioritySubGroup = ['A', 'B', 'C'];


  ngOnInit(): void {

    console.log('humanResource', this.humanResource);
    console.log('status', this.status);
    console.log('statusReason', this.statusReason);
    console.log('organizations', this.organizations);
  }

}
