import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "../component/header/header.component";
import {FmTitleComponent} from "../component/fm_sections/fm-title/fm-title.component";
import {FmControlComponent} from "../component/fm_sections/fm-control/fm-control.component";
import {AppService} from "../app.service";
import {NbCardModule, NbLayoutModule, NbSelectModule} from "@nebular/theme";



@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FmTitleComponent,
    FmControlComponent,
    NbSelectModule,
    NbLayoutModule,
    NbCardModule,
  ],
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
})
export class CustomFormComponent   implements OnInit {

  constructor( private srv:AppService) { }



  @Input() formData: any;

  onTitleChange(event){
    this.formData.form.ProjectTitle = event
  }




  ngOnInit(): void {
    console.log(this.formData);
    this.srv.createSubscription().then(r => console.log(r))

  }

}
