import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ImageInfo } from './image.types';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ImageInputModalComponent } from './image-input-modal/image-input-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from './image.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ThumbnailComponent, ImageInputModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  incomingData: Array<ImageInfo>;
  search: string;
  images: Array<ImageInfo>;

  constructor(private imageService: ImageService, private modalService: NgbModal) {}

  ngOnInit() {
    this.fetchAllImages();
  }

  fetchAllImages() {
    this.imageService.getImages().subscribe(data => {
      this.incomingData = data;
    })
  }

  updateSearch( event: any ) {
    this.search = event.target.value;
  }

  onSearch() {
    if ( this.search === undefined || this.search === "" ) {
      this.fetchAllImages();
    } else if ( Number(this.search) ) {
      this.imageService.getImageById(Number(this.search)).subscribe(data => {
        if ( !Array.isArray( data ) ) {
          this.incomingData = [data];
        } else {
          this.incomingData = data;
        }
      });
    } else {
      // Format the string by removing white spaces after each comma
      const formatedObjects = this.search.replace(/\s*,\s*/g, ",");
      this.imageService.getImageByObjects(formatedObjects).subscribe(data => {
          this.incomingData = data;
      })
    }
  }

  open() {
		this.modalService.open(ImageInputModalComponent);
  }
}
