import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {NebularModule} from "../../../shared/nebular/nebular.module";

@Component({
  selector: 'app-fm-area',
  standalone: true,
  imports: [CommonModule, NebularModule, ReactiveFormsModule],
  templateUrl: './fm-area.component.html',
  styleUrls: ['./fm-area.component.scss']
})
export class FmAreaComponent implements OnInit {

  constructor() { }

  @Input() organizations!:any;
  @Input() areaPathList!:any;
  @Input() areaFmControl!:any;
  @Input() searchScope!:any;


  searchsCope:any

  ngOnInit(): void {
  }

}
