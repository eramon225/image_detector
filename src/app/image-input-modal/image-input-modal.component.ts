import { Component, ElementRef, TemplateRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImageInfo, ImagePayload } from '../image.types';
import { ThumbnailComponent } from '../thumbnail/thumbnail.component';

@Component({
  selector: 'app-image-input-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ThumbnailComponent],
  templateUrl: './image-input-modal.component.html',
  styleUrl: './image-input-modal.component.css'
})
export class ImageInputModalComponent {

  constructor(private http: HttpClient, private elementRef: ElementRef) { }

  private modalService = inject(NgbModal);
  modalReference: NgbModalRef;
  imageUrl: string;
  label: string;
  waiting: boolean = false;
  failed: boolean = false;
  receivedImage: ImageInfo | undefined;

  resetModal() {
    this.waiting = false;
    this.receivedImage = undefined;
    this.failed = false;
  }

  open( content: TemplateRef<any> ) {
    this.modalReference = this.modalService.open(content);
    // Reset the modal when we close
    this.modalReference.result.then(() => {
      this.resetModal();
    }, () => {
      this.resetModal();
    })

  }
  
  updateUrl( event: any ) {
    this.imageUrl = event.target.value;
  }

  updateLabel( event: any ){
    this.label = event.target.value;
  }

  onSubmit() {
    this.waiting = true;
    const payload: ImagePayload = {'detect': false, 'location': this.imageUrl};
    if ( this.label !== undefined ) {
      payload.label = this.label;
    }
    this.http.post<any>('http://localhost:5000/images', payload, { headers: {'Access-Control-Allow-Origin': '*'}} ).subscribe({
      next: data => {
        this.receivedImage = data;
        this.waiting = false;
        const event: CustomEvent = new CustomEvent('QueryDataCustomEvent', {
          bubbles: true,
          detail: data,
        });
        this.elementRef.nativeElement.dispatchEvent(event);
      },
      error: error => { // catch errors and detect failure
        this.failed = true;
      }
    })
  }
}
