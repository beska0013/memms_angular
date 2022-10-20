import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NebularModule} from "../../../shared/nebular/nebular.module";

@Component({
  selector: 'app-time',
  standalone: true,
    imports: [CommonModule, NebularModule],
  templateUrl: './time.component.html',
  styleUrls: ['./time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
