import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImageInfo } from './image.types';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ImageInputModalComponent } from './image-input-modal/image-input-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ThumbnailComponent, HttpClientModule, ImageInputModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  incomingData: Array<ImageInfo>;
  search: string;

  constructor(private http: HttpClient) { }

  @HostListener('QueryDataCustomEvent', ['$event'])
  onQueryDataEventCaptured(event: any) {
    this.queryData();
  }

  queryData() {
    this.http.get<any>('http://localhost:5000/images').subscribe(data => {
      this.incomingData = data;
    })
  }

  ngOnInit() {
    this.queryData();
  }

  updateSearch( event: any ) {
    this.search = event.target.value;
  }

  onSearch() {
    if ( Number(this.search) ) {
      this.http.get<any>(`http://localhost:5000/images/${Number(this.search)}`).subscribe(data => {
        if ( !Array.isArray( data ) ) {
          this.incomingData = [data];
        } else {
          this.incomingData = data;
        }
      })
    } else {
      this.http.get<any>(`http://localhost:5000/images?objects=${this.search}`).subscribe(data => {
        this.incomingData = data;
      })
    }
  }
}
