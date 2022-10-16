import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {EMPTY, map, switchMap, take, tap} from "rxjs";

import {CustomFormService} from "../../../custom-form/custom-form.service";
import {AppService} from "../../../app.service";
import {NbAdjustment, NbPosition} from "@nebular/theme";


@Component({
  selector: 'app-input-ui',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NebularModule],
  templateUrl: './input-ui.component.html',
  styleUrls: ['./input-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputUiComponent implements OnInit{

  constructor(
    private customFmSrv: CustomFormService,
    private appSrv: AppService,
    private cdr:ChangeDetectorRef
  ){}

  @ViewChild('input')inputRef:ElementRef

  @Input() labelFor:string;
  @Input() title:string;
  @Input() initialValue!:string;
  @Input() dataType:string;

  @Output() output = new EventEmitter();

  tooltip:string;
  timeOutInterval:any
  // toolTipPosition:NbPosition = NbPosition.BOTTOM_END;
  // toolTipAdgustment:NbAdjustment = NbAdjustment.NOOP;
  disableState = false;
  inputControl:FormControl;
  fieldLock = this.customFmSrv.SeessionLogFieldTypes()
    .pipe(
      map(res => res.find(item => item.Field_type === this.dataType && item?.sessionId !== this.appSrv.getSessionId())),
      switchMap( res => !!res ? this.lockField(res) : this.unlockField())
    )

  onFirstInput(){
    if(!this.inputControl) return null;
    this.inputControl.valueChanges
      .pipe(
        take(1),
      )
      .subscribe(() => this.createSessionLog())
  }

  onFieldChange(){
    this.customFmSrv.$deleteSessionLogItemState.next(true);
    const list = [...this.customFmSrv.$updatableList.value]
          list.push({[`${this.dataType}`]: this.inputControl.value});
    this.customFmSrv.$updatableList.next(list);
    clearInterval(this.timeOutInterval);
  }

  private lockField = (res) => {
    this.inputControl.disable();
    this.tooltip = `Modyfing by ${res.Username}`;
    this.cdr.markForCheck()
    return EMPTY
  }

  private unlockField = () => {
    return this.inputControl.disabled ?
      this.appSrv.getFormField(this.dataType)
        .pipe(tap((res) =>  {
          this.inputControl.enable()
          this.inputControl.setValue(res[this.dataType])
          this.tooltip = null;
          this.cdr.markForCheck()
          return res
        })): EMPTY
  }

  private initInputControl() {
    this.inputControl = new FormControl({value: this.initialValue, disabled: this.disableState});
  }

  private createSessionLog() {
    const list = [ ...this.customFmSrv.$sessionLogListToCreate.value];
          list.push({ type: this.dataType});
    this.customFmSrv.$sessionLogListToCreate.next(list);
  }

  onInActivity(){
    this.timeOutInterval = setTimeout(() => {
      this.inputRef.nativeElement.blur();
      },
      3000
    )

  }



  ngOnInit(): void {
    this.initInputControl();
    this.fieldLock.subscribe(res => {
      console.log('fieldLock',res);
    })
    this.inputControl.valueChanges.subscribe(res => {
          clearInterval(this.timeOutInterval);
          this.onInActivity()
    })

  }
}

