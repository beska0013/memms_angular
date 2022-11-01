import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output, ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {debounceTime, EMPTY, map, Subscription, switchMap, take, tap} from "rxjs";

import {CustomFormService} from "../../../custom-form/custom-form.service";
import {AppService} from "../../../app.service";
import {NbAdjustment, NbPosition} from "@nebular/theme";
import {LoaderUiComponent} from "../loader-ui/loader-ui.component";


@Component({
  selector: 'app-input-ui',
  standalone: true,
    imports: [CommonModule, ReactiveFormsModule, NebularModule, LoaderUiComponent],
  templateUrl: './input-ui.component.html',
  styleUrls: ['./input-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputUiComponent implements OnInit,OnDestroy{

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
  @Output() onInputStart = new EventEmitter();

  tooltip:string;
  timeOutInterval:any;
  loading = this.customFmSrv.loading().pipe(
    //tap((res) => res ? this.inputControl.disable() : this.inputControl.enable())
  );

  disableState = false;
  inputControl:FormControl;

  fieldLock = this.customFmSrv.SeessionLogFieldTypes()
    .pipe(
      map(res => res.find(item => item.Field_type === this.dataType && item?.sessionId !== this.appSrv.getSessionId())),
      switchMap( res => !!res ? this.lockField(res) : this.unlockField())
    )

  $fieldLockSubscription:Subscription;
  $fmCntValSubscription:Subscription;


  onFirstInput(){
    if(!this.inputControl) return null;
    this.inputControl.valueChanges
      .pipe(take(1))
      .subscribe(() => this.onInputStart.emit(this.dataType))
  }

  onFieldChange(){
    this.output.emit({
      type: this.dataType,
      value: this.inputControl.value
    })
    clearInterval(this.timeOutInterval);
  }

  private lockField = (res) => {
    this.inputControl.disable();
    this.tooltip = `Modyfing by ${res.Username}`;
    this.cdr.markForCheck();
    return EMPTY
  }
  private unlockField = () => {
    return this.inputControl.disabled ?
      this.appSrv.getFormField(this.dataType)
        .pipe(
          tap((res) =>  {
            console.log('unlockField line 92',res);
            this.inputControl.enable()
              this.inputControl.setValue(res[this.dataType])
              this.tooltip = null;
              this.cdr.markForCheck();
              return res
        })): EMPTY
  }
  private onInActivity(){
    this.timeOutInterval = setTimeout(() => this.inputRef.nativeElement.blur(), 3000)
  }
  private initFmControl(){
   this.inputControl = new FormControl({value: this.initialValue, disabled: this.disableState});
 }
  private fmControlValueChanges(){
    return this.inputControl.valueChanges.pipe(tap(() => {
      clearInterval(this.timeOutInterval);
      this.onInActivity();
      this.customFmSrv.$editMode.next(true);
    }))
  }

  ngOnInit(): void {
    this.initFmControl();
    this.$fieldLockSubscription = this.fmControlValueChanges().subscribe();
    this.$fmCntValSubscription = this.fieldLock.subscribe();
  }

  ngOnDestroy(): void {
    this.$fieldLockSubscription.unsubscribe();
    this.$fmCntValSubscription.unsubscribe();
  }
}

