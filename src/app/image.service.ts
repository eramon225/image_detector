import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ImagePayload } from "./image.types";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ImageService {
  url = 'http://localhost:5000/images';
  constructor(private http: HttpClient) { }
  
  getImages() {
    return this.http.get<any>(this.url);
  }

  getImageByObjects(objects: string) {
    console.log(`${this.url}?objects="${objects}"`)
    return this.http.get<any>(`${this.url}?objects=${objects}`);
  }

  getImageById(id: number) {
    return this.http.get<any>(`${this.url}\\${id}`);
  }

  postImage(payload: ImagePayload | FormData): Observable<any> {
    return this.http.post(this.url, payload, { headers: {'Access-Control-Allow-Origin': '*'}});
  }
}