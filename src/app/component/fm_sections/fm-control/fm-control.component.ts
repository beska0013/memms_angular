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
import {EMPTY, filter, map, Observable, of, tap} from "rxjs";
import {NEW_HUMAN_RESOURCE_ITEM} from "../../../../environments/environment";




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
  disabled = false;
  tooltip:string;
  onFieldChange(event){
    if(event.type === this.dataTypes.sts){
      this.statusFieldsCascade(event.value);
    }
    if(event.type === this.dataTypes.orgId){
      this.onOrgChange(event.value)
    }
    console.log('fm-control.onFieldChange',event);
    this.output.emit(event);
  }
  inputStart(event){
    console.log(event);
  }

  private lockSection(res){
    this.disabled = true;
    this.tooltip = `Modyfing by ${res.Username}`;
    this.cdr.markForCheck();
    return EMPTY
  }

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
    this.cntSectionFmControls.OwnerSelect.disable();
    this.cntSectionFmControls.LeadSelect.disable();
    this.cntSectionFmControls.ManagerSelect.disable();
    this.humanResource$ = EMPTY;
  }
  private resetHumanRrecourceInputs(){
    this.cntSectionFmControls.OwnerSelect.reset();
    this.cntSectionFmControls.LeadSelect.reset();
    this.cntSectionFmControls.ManagerSelect.reset();
    this.cntSectionFmControls.OwnerSelect.enable();
    this.cntSectionFmControls.LeadSelect.enable();
    this.cntSectionFmControls.ManagerSelect.enable();
  }

  ngOnInit(): void {
    this.humanResource$ = of(this.humanResource);
    this.statusFieldsCascade(this.formData.StatusId);


  }





}
