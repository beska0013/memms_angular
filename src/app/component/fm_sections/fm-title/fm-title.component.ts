import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";
import {InputUiComponent} from "../../component-ui/input-ui/input-ui.component";
import {CustomFormService} from "../../../custom-form/custom-form.service";


@Component({
  selector: 'app-fm-title',
  standalone: true,
  imports: [CommonModule, FormsModule, NebularModule, InputUiComponent],
  templateUrl: './fm-title.component.html',
  styleUrls: ['./fm-title.component.scss']
})
export class FmTitleComponent {

  constructor(private customFmSrv:CustomFormService) { }

  @Input() titleValue:string;
  @Output() titleInput = new EventEmitter;

  onTitleInput(title){
    this.titleInput.emit(title)
  }

  onOutputChange = (event) => this.customFmSrv.sessionLogDeleteHandler(event)

  inputStart = (dataType:string) => this.customFmSrv.createSessionLog(dataType)


}
