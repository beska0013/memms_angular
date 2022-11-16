import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import { NbComponentSize} from "@nebular/theme";
import { map, Observable, of, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {NebularModule} from "../../../shared/nebular/nebular.module";


@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NebularModule],
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchableDropdownComponent implements OnInit, OnChanges {

  constructor() { }

  @ViewChild('autoInput') input;

  @Input() allowAdd:boolean = false;
  @Input() dataType:string
  @Input() labelFor:string;
  @Input() title:string;
  @Input() fieldSize!:NbComponentSize;
  @Input() fmControl!:any;
  @Input() dropdownList:any[];
  @Input() form:any[];
  @Input() lastOption:{ID:number,Id:number, Title:string};
  @Output() output = new EventEmitter<{type: string, value: string | number}>();

  //when data loads first time
  dataFirstChange = true;
  closeState = true;
  filteredOptions$: Observable<string[] | never>;
  addItemState:boolean = false;
  tooltip:string;
  private areaDataType = 'CHOrganizationBoundShadow:CH1BoundShadow:CH2BoundShadow:CH3BoundShadow:CH4BoundShadow:CH5BoundShadow:CH6BoundShadow:CH7BoundShadow:CH8BoundShadow:CH9BoundShadow:CH10BoundShadow'

  private onFieldstateChange(value:any, changeType:string){
    if(changeType === environment.fieldInputChange) return null;
    if(this.dataFirstChange) {
      this.dataFirstChange = false;
      return null;
    }

    const item = this.dropdownList?.find(item => item.Title ? item.Title === value : item === value )
    this.output.emit({
      type: this.dataType,
      value: !!item ? item.ID : this.lastOption ? this.lastOption.ID: null
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

  onChange(){
    this.closeState = true;
    !!this.input.nativeElement.value ?
    this.onFieldstateChange(this.input.nativeElement.value, environment.fieldInputChange) :
    null
  }
  onInput(){
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
  onFirstInput(){
      this.closeState = false;


  }
  onFocusout(){
    this.closeState =  true;

  }
  trackBy =(index, item) => index

  onAddNewItem(){
    console.log(this.input.nativeElement.value);
  }


  ngOnInit(): void {


    this.filteredOptions$ = of(this.dropdownList);
    this.tooltip = `Add New ${this.title}`;
  }

  ngOnChanges(changes: SimpleChanges): void {

    for (let propName in changes) {
      if(propName === 'dropdownList'){
        this.filteredOptions$ = of(this.dropdownList);
      }
    }
  }

}
