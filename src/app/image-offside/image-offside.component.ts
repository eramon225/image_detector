import { Component, Input, OnInit, TemplateRef, inject } from '@angular/core';
import { ImageInfo } from '../image.types';
import { CommonModule } from '@angular/common';
import { NgbOffcanvasModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-offside',
  standalone: true,
  imports: [CommonModule, NgbOffcanvasModule],
  templateUrl: './image-offside.component.html',
  styleUrl: './image-offside.component.css'
})
export class ImageOffsideComponent implements OnInit {

  @Input({required: true}) label: string;
  @Input() objects: Array<Object>;

  private service = inject( NgbOffcanvas );

  constructor() {} 
  
  ngOnInit() {} 
  
  open(content: TemplateRef<any>) {
		this.service.open(content, { position: 'end'});
	}
}
