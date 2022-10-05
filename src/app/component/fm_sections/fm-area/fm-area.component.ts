import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fm-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fm-area.component.html',
  styleUrls: ['./fm-area.component.scss']
})
export class FmAreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
