import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fm-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fm-tags.component.html',
  styleUrls: ['./fm-tags.component.scss']
})
export class FmTagsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
