import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import { NbComponentSize} from "@nebular/theme";
import {map, Observable, of, Subscription, tap} from "rxjs";
import {environment, NEW_HUMAN_RESOURCE_ITEM, ALL_VALUE, NONE_VALUE} from "../../../../environments/environment";
import {NebularModule} from "../../../shared/nebular/nebular.module";




@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NebularModule],
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchableDropdownComponent implements OnInit, OnChanges, OnDestroy {

  constructor() { }

  @ViewChild('autoInput') input;
  @ViewChild('optionList') optionList;

  @Input() allowAdd:boolean = false;
  @Input() dataType:string
  @Input() labelFor:string;
  @Input() title:string;
  @Input() fieldSize!:NbComponentSize;
  @Input() fmControl!:any;
  @Input() dropdownList:any[];
  // @Input() form:any[];
  @Input() lastOption:{ID:number,Id:number, Title:string};
  @Output() output = new EventEmitter<{type: string, value: string | number}>();
  @Output() onInputStart = new EventEmitter();
  @Output() duringInput = new EventEmitter();

  $fmControlValueChangesSubs:Subscription;

  dataFirstChange = true; // => when data loads first time
  closeState = true;
  firstInput = true; // check for first charachter input;
  sessionLogcreateState = false;
  filteredOptions$: Observable<string[] | never>;
  addItemState:boolean = false;
  newItemModel:string;
  private areaDataType = 'CHOrganizationBoundShadow:CH1BoundShadow:CH2BoundShadow:CH3BoundShadow:CH4BoundShadow:CH5BoundShadow:CH6BoundShadow:CH7BoundShadow:CH8BoundShadow:CH9BoundShadow:CH10BoundShadow'

  private onFieldstateChange(value:any, changeType:string){
    if(changeType === environment.fieldInputChange) return null;
    if(this.dataFirstChange) {
      this.dataFirstChange = false;
      return null;
    }

    const item = this.dropdownList?.find(item => item.Title ? item.Title === value : item === value );
    if(!!item) {
      return !!item.ID ?
        this.onOutputEmit(item.ID, 'type:item') :
        this.onOutputEmit(item, 'type:item')
    }
    this.sessionLogcreateState = false;
    return value === NONE_VALUE || value === ALL_VALUE ?
      !!this.lastOption ? this.onOutputEmit(this.lastOption.ID, 'type:lastOption'):null :
      this.onOutputEmit(value, 'type:value')

  }

  private onOutputEmit(value:any, type:string){
    console.log(value);
    console.log(' typeof', typeof value);
    console.log(type);
    return  this.output.emit({
      type: this.dataType,
      value: value
    })
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.dropdownList.filter(optionValue =>
      optionValue.Title ?
        optionValue.Title.toLowerCase().includes(filterValue):
        optionValue.toLowerCase().includes(filterValue));
  }

  private getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  private onFirstinput(){
    if(this.sessionLogcreateState) return null;
    this.onInputStart.emit(this.dataType);
    this.firstInput = false;
    this.sessionLogcreateState = true;
  }

  onOptionListHover = () => this.onFirstinput();
  onChange(){
    this.closeState = true;
    !!this.input.nativeElement.value ?
    this.onFieldstateChange(this.input.nativeElement.value, environment.fieldInputChange) :
    null
  }
  onInput(){
    this.newItemModel = this.input.nativeElement.value;
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value)
      .pipe(
        tap(list => {
          this.addItemState = this.allowAdd && list.length <= 0;
        })
      );
  }
  onSelectionChange(event) {
    if(!(!!event)) return null
    this.filteredOptions$ = this.getFilteredOptions(event);
    this.closeState = true;
    this.onFieldstateChange(event, environment.fieldSelectChange);

  }
  onInputClick(){
    this.dataType !== this.areaDataType ? this.filteredOptions$ = of(this.dropdownList): null;

  }
  onFocusIn(){
     this.closeState = false;
     this.$fmControlValueChangesSubs = this.fmControl.valueChanges.subscribe(res =>{
        if(this.firstInput) this.onFirstinput();
        this.duringInput.emit(res);
      })

  }
  onFocusout(){
    this.closeState =  true;

    this.firstInput = true;
  }
  trackBy = (index, item) => index;

  onCreateNewItem(event){
    event.stopPropagation();
    event.preventDefault();
    return this.addItemState ?
      this.output.emit({
        type: NEW_HUMAN_RESOURCE_ITEM,
        value: this.input.nativeElement.value
      }) :
      null
  }

  ngOnInit(): void {
    this.filteredOptions$ = of(this.dropdownList);
  }

  ngOnChanges(changes: SimpleChanges): void {

    for (let propName in changes) {
      if(propName === 'dropdownList'){
        this.filteredOptions$ = of(this.dropdownList);
      }
    }
  }

  ngOnDestroy(): void {

   this.$fmControlValueChangesSubs.unsubscribe();
  }

}
