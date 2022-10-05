import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-fm-title',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fm-title.component.html',
  styleUrls: ['./fm-title.component.scss']
})
export class FmTitleComponent {

  constructor() { }

  @Input() titleValue:string;
  @Output() titleInput= new EventEmitter;

  onTitleChannge(title){

    this.titleInput.emit(title)
  }



}
