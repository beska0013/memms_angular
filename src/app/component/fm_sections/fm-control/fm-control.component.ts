import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
export class FmControlComponent implements OnInit {
  constructor(private cdr:ChangeDetectorRef) { }

  @Input() formData!: any
  @Input() humanResource!:any;
  @Input() status:any;
  @Input() statusReason:any;
  @Input() organizations!:any;
  @Input() cntSectionFmControls:any;

  @Output() output = new EventEmitter();

  statusReasonList:any[]

  dataTypes = new ControlDataTypes();
  priorityGroup = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  prioritySubGroup = ['A', 'B', 'C'];


  onFieldChange(event){
    if(this.formData[event.type] === event.value) return null
    //console.log('onFieldChange',event);
   // console.log(event.type, this.formData[event.type]);
    if(event.type === 'StatusId'){
      this.statusFieldsCascade(event.value)
    }
    this.output.emit(event)
  }
//TODO fix cascade between status and status_reason
  private statusFieldsCascade(statusId:number){
    this.statusReasonList = this.statusReason.filter(item => item.StatusId === statusId);
    //this.cntSectionFmControls.StatusReasonSelect.reset()

  }


  ngOnInit(): void {
    this.organizations.push({ID:-1,Id:-1, Title:'(None)'})
    //console.log(this.organizations);
    this.statusReasonList = this.statusReason.filter(item => item.StatusId === this.formData.StatusId)

  }




}
