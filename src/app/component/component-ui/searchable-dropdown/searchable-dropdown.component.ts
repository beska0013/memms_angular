import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {NbAutocompleteModule, NbInputModule} from "@nebular/theme";

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

  @Input() labelFor:string;
  @Input() title:string;
  @Input() fmControl!:any;
  @Input() dropdownList:any[];

  inputModel:string

  onChange(){
    const item = this.dropdownList.find(item => item.Title === this.fmControl.value)
    console.log('onChange', item);
  }

  ngOnInit(): void {
    // console.log('onChange', this.fmControl.value);
  }

}
