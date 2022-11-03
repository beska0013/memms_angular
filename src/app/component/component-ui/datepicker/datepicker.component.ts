import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbDatepickerModule, NbIconLibraries} from "@nebular/theme";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {EMPTY, map, Subscription, switchMap, take, tap} from "rxjs";
import {CustomFormService} from "../../../custom-form/custom-form.service";
import {AppService} from "../../../app.service";
import {parseISO} from "date-fns";

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [CommonModule, NbDatepickerModule, NebularModule, ReactiveFormsModule],
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {

  @ViewChild('dateInput') private dateInput:ElementRef

  @Input() labelfor:string;
  @Input() dataType:string;
  @Input() title:string;
  @Input() inputControl = new FormControl();

  @Output() output = new EventEmitter();
  @Output() onInputStart = new EventEmitter();

  constructor(
    private customFmSrv: CustomFormService,
    private appSrv: AppService,
    protected iconLibraries: NbIconLibraries,
    private cdr: ChangeDetectorRef,
    ) {
    this.iconLibraries.registerSvgPack('datepicker', {
      'calendar': ' <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512"  xml:space="preserve"><rect y="83.2" style="fill:#C9E3F7;" width="512" height="422.4"/><rect x="256" y="83.2" style="fill:#78B9EB;" width="256" height="422.4"/><rect x="64" y="83.2" style="fill:#3C5D76;" width="384" height="89.6"/><rect x="102.4" y="6.4" style="fill:#C9E3F7;" width="76.8" height="115.2"/><g><rect x="332.8" y="6.4" style="fill:#78B9EB;" width="76.8" height="115.2"/><rect x="102.4" y="236.8" style="fill:#78B9EB;" width="76.8" height="76.8"/></g><g><rect x="332.8" y="236.8" style="fill:#3C5D76;" width="76.8" height="76.8"/><rect x="332.8" y="352" style="fill:#3C5D76;" width="76.8" height="76.8"/></g><g><rect x="102.4" y="352" style="fill:#78B9EB;" width="76.8" height="76.8"/><rect x="217.6" y="236.8" style="fill:#78B9EB;" width="76.8" height="76.8"/><rect x="217.6" y="352" style="fill:#78B9EB;" width="76.8" height="76.8"/></g><g><rect x="256" y="236.8" style="fill:#3C5D76;" width="38.4" height="76.8"/><rect x="256" y="352" style="fill:#3C5D76;" width="38.4" height="76.8"/></g><polygon style="fill:#C9E3F7;" points="256,6.4 217.6,6.4 217.6,121.6 256,121.6 268.8,57.6 "/><rect x="256" y="6.4" style="fill:#78B9EB;" width="38.4" height="115.2"/></svg>'
    });
  }

  $fmCntValSubscription:Subscription;
  $fieldLockSubscription:Subscription;

  tooltip:string;
  fieldLock = this.customFmSrv.SeessionLogFieldTypes()
    .pipe(
      map(res => res.find(item => item.Field_type === this.dataType && item?.sessionId !== this.appSrv.getSessionId())),
      switchMap( res => !!res ? this.lockField(res) : this.unlockField())
    )

  onFirstInput(){
    //console.log(this.inputControl);
    if(!this.inputControl) return null;
    this.onInputStart.emit(this.dataType)
    // this.inputControl.valueChanges
    //   .pipe(take(1))
    //   .subscribe(() => this.onInputStart.emit(this.dataType))
  }
  onFieldChange(event?){
    const date = event ? event : this.inputControl.value;
    this.output.emit({
      type: this.dataType,
      value: !!date ? new Date(date).toISOString() : date
    })
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
            //console.log(res[this.dataType]);
            this.inputControl.enable();
            this.inputControl.setValue(res[this.dataType] ? parseISO(res[this.dataType]) : res[this.dataType])
            this.tooltip = null;
            this.cdr.markForCheck();
            return res
          })): EMPTY
  }

  private fmControlValueChanges(){
    return this.inputControl.valueChanges.pipe(tap(() => {
      // clearTimeout(this.timeOutInterval);
      // this.onInActivity();
      this.customFmSrv.$editMode.next(true);
    }))
  }

  onDateChange(event){
    setTimeout(()=> this.onFieldChange(event), 3000);
    this.cdr.markForCheck();

  }

  ngOnInit(): void {
    this.$fieldLockSubscription = this.fmControlValueChanges().subscribe();
    this.$fmCntValSubscription = this.fieldLock.subscribe();
  }

}
