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
import {AppService} from "../../../app.service";
import {filter, map, Observable, of, tap} from "rxjs";




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
  constructor(
    private cdr:ChangeDetectorRef,
    private appSrv: AppService
  ) { }

  @Input() formData!: any
  @Input() humanResource!:any;
  @Input() status:any;
  @Input() statusReason:any;
  @Input() organizations!:any;
  @Input() cntSectionFmControls:any;

  @Output() output = new EventEmitter();
  humanResource$:Observable<any>
  statusReasonList$:Observable<any>;

  noOrgValueStr = '(Select an Organization)'

  dataTypes = new ControlDataTypes();
  priorityGroup = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  prioritySubGroup = ['A', 'B', 'C'];
  lastSelectOption = {ID:-1,Id:-1, Title:'(None)'};
  dataFirstChange = true;

  onFieldChange(event){
    console.log(event);
    if(event.type === 'StatusId'){
      this.statusFieldsCascade(event.value);
    }
    if(event.type === 'OrganizationId'){
      this.onOrgChange(event.value)
    }

    this.output.emit(event)
  }
//TODO fix cascade between status and status_reason
  private statusFieldsCascade(statusId:number){
    this.statusReasonList$ = of(this.statusReason)
      .pipe(map((sts) => sts.filter(item => item.StatusId === statusId )))
   !this.dataFirstChange ? this.cntSectionFmControls.StatusReasonSelect.setValue('(None)'): null;
    this.dataFirstChange = false;
  }

  private onOrgChange(orgId:number){
    if(orgId < 0) return this.noOrgValueForHumanRrecource();
    this.humanResource$ = this.appSrv.getListByFilter('ProjectHumanResources', ['ID','Title'], 320, `OrganizationId eq ${orgId}`)
                          .pipe(map(res =>  res['value']));
   this.resetHumanRrecourceInputs();
  }
  private noOrgValueForHumanRrecource(){
    this.cntSectionFmControls.OwnerSelect.setValue(this.noOrgValueStr);
    this.cntSectionFmControls.LeadSelect.setValue(this.noOrgValueStr);
    this.cntSectionFmControls.ManagerSelect.setValue(this.noOrgValueStr);
  }
  private resetHumanRrecourceInputs(){
    if(
      this.cntSectionFmControls.OwnerSelect.value === this.noOrgValueStr ||
      this.cntSectionFmControls.OwnerSelect.value === this.noOrgValueStr ||
      this.cntSectionFmControls.OwnerSelect.value === this.noOrgValueStr
    ){
      this.cntSectionFmControls.OwnerSelect.reset();
      this.cntSectionFmControls.LeadSelect.reset();
      this.cntSectionFmControls.ManagerSelect.reset();
    }
  }

  ngOnInit(): void {
    this.humanResource$ = of(this.humanResource);
    this.statusFieldsCascade(this.formData.StatusId);


    this.statusReasonList$.subscribe(res => {
      console.log(res);
    })
  }





}
