import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FoundObject, ImageInfo } from '../image.types';
import { ObjectsTableComponent } from '../objects-table/objects-table.component';

@Component({
  selector: 'app-details-collapse',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule, ObjectsTableComponent],
  templateUrl: './details-collapse.component.html',
  styleUrl: './details-collapse.component.css'
})
export class DetailsCollapseComponent {
  @Input({required: true}) info: ImageInfo;
  isCollapsed = true;
}
