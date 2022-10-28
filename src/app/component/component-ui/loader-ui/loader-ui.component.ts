import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader-ui.component.html',
  styleUrls: ['./loader-ui.component.scss']
})
export class LoaderUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
