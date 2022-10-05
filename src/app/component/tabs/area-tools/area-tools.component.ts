import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-area-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './area-tools.component.html',
  styleUrls: ['./area-tools.component.scss']
})
export class AreaToolsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
