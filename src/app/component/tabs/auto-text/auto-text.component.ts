import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auto-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auto-text.component.html',
  styleUrls: ['./auto-text.component.scss']
})
export class AutoTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
