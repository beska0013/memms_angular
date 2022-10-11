import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {NbAutocompleteModule, NbComponentSize, NbInputModule} from "@nebular/theme";
import {map, Observable, of} from "rxjs";


@Component({
  selector: 'app-searchable-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NbInputModule, NbAutocompleteModule],
  templateUrl: './searchable-dropdown.component.html',
  styleUrls: ['./searchable-dropdown.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SearchableDropdownComponent implements OnInit {

  constructor() { }

  @ViewChild('autoInput') input;

  @Input() dataType:string
  @Input() labelFor:string;
  @Input() title:string;
  @Input() fieldSize!:NbComponentSize;
  @Input() fmControl!:any;
  @Input() dropdownList:any[];
  @Output() output = new EventEmitter<{type: string, value: string | number}>()

  filteredOptions$: Observable<string[]>;

  onChange(){
    !!this.input.nativeElement.value ?
    this.onFieldstateChange(this.input.nativeElement.value, 'input change') :
    null
  }

  onInput(){
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange(event) {
    this.filteredOptions$ = this.getFilteredOptions(event);
    this.onFieldstateChange(event, 'selectChange')
  }

  private onFieldstateChange(value:any, changeType:string){
    console.log('SearchableDropdownComponent/onFieldstateChange - change type',changeType);
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
    this.filteredOptions$ = of(this.dropdownList);
  }

}
