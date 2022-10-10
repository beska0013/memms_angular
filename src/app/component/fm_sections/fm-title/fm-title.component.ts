import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";


@Component({
  selector: 'app-fm-title',
  standalone: true,
  imports: [CommonModule, FormsModule, NebularModule],
  templateUrl: './fm-title.component.html',
  styleUrls: ['./fm-title.component.scss']
})
export class FmTitleComponent {

  constructor() { }

  @Input() titleValue:string;
  @Output() titleInput = new EventEmitter;

  onTitleInput(title){
    this.titleInput.emit(title)
  }

  onChange(){
    console.log(this.titleValue);
  }

}
