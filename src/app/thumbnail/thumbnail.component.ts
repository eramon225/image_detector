import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoundObject } from '../image.types';
import { DetailsCollapseComponent } from '../details-collapse/details-collapse.component';

const b64toBlob = (b64Data: string, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
    
  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [CommonModule, DetailsCollapseComponent],
  templateUrl: './thumbnail.component.html',
  styleUrl: './thumbnail.component.css'
})
export class ThumbnailComponent implements OnInit {
  @Input() imageUrl: string;
  @Input({required: true}) label: string;
  @Input() objects: Array<FoundObject>;
  @Input() data: string;
  objectURL: string;

  constructor() {}
  ngOnInit(): void {
  }
  ngOnChanges(change: any): void {
    try {
      // We only want to render the image when we finally get data
      if ( change.data ) {
        const blob = b64toBlob(change.data.currentValue);
        this.objectURL = URL.createObjectURL(blob);
      }
    } catch (error) {
      console.log('Failed to use data blob to render image');      
    }
  }
}
