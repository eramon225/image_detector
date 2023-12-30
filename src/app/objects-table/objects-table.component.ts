import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FoundObject } from '../image.types';

@Component({
  selector: 'app-objects-table',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './objects-table.component.html',
  styleUrl: './objects-table.component.css'
})
export class ObjectsTableComponent implements OnInit {
  @Input({required: true}) objects: Array<FoundObject>;
  ngOnInit(): void {}
}
