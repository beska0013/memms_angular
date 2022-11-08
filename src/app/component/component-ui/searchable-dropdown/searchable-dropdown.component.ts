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
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {NbAutocompleteModule, NbComponentSize, NbInputModule} from "@nebular/theme";
import {map, Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NbInputModule, NbAutocompleteModule],
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchableDropdownComponent implements OnInit, OnChanges {

  constructor(private cdr:ChangeDetectorRef) { }

  @ViewChild('autoInput') input;

  @Input() dataType:string
  @Input() labelFor:string;
  @Input() title:string;
  @Input() fieldSize!:NbComponentSize;
  @Input() fmControl!:any;
  @Input() dropdownList:any[];
  @Input() form:any[];
  @Output() output = new EventEmitter<{type: string, value: string | number}>()

  //when data loads first time
  dataFirstChange = true;

  inputControl:FormControl;
  filteredOptions$: Observable<string[]>;

  onChange(){
    //console.log(this.input.nativeElement.value);
    !!this.input.nativeElement.value ?
    this.onFieldstateChange(this.input.nativeElement.value, environment.fieldInputChange) :
    null
  }

  onInput(){
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }


  onSelectionChange(event) {
   // console.log('onSelectionChange', event);
    if(!(!!event)) return null
    this.filteredOptions$ = this.getFilteredOptions(event);
    //TODO fix on first change
    this.onFieldstateChange(event, environment.fieldSelectChange);

  }

  onFirstInput(){

  }

  private onFieldstateChange(value:any, changeType:string){
    if(changeType === environment.fieldInputChange) return null;
    if(this.dataFirstChange) {
      this.dataFirstChange = false;
      return null;
    }

    const item = this.dropdownList?.find(item => item.Title ? item.Title === value : item === value )

    this.output.emit({
      type: this.dataType,
      value: item ? item.ID ? item.Id : item : value
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

  ngOnInit(): void {
    //this.firstChange = false
    this.filteredOptions$ = of(this.dropdownList);
  }

  ngOnChanges(changes: SimpleChanges): void {

    for (let propName in changes) {
      if(propName === 'dropdownList'){
        this.filteredOptions$ = of(this.dropdownList);
       // console.log(propName);
        //this.cdr.markForCheck();
      }
    }
  }

}
