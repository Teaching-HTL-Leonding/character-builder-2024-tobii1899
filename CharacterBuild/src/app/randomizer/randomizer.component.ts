import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-randomizer',
  standalone: true,
  imports: [CommonModule,  HttpClientModule],
  templateUrl: './randomizer.component.html',
  styleUrl: './randomizer.component.css'
})
export class RandomizerComponent {
  currentImageUrl: string | null = null;
  imageSize: number = 500;
  randomImageOptions: any;

  constructor(private http: HttpClient) {}

  async generateRandomImage() {
    const response = await this.http.get<any>('http://localhost:5110/get-random-image-options').toPromise();

    const result = await this.http.post<any>('http://localhost:5110/build-image-url', {
      eye: response.eye,
      hasHammer: response.hasHammer,
      mouth: response.mouth,
      rightHand: response.rightHand,
      hasTail: response.hasTail
    }).toPromise();

    this.currentImageUrl = result.url;
  }

  zoomIn() {
    if (this.imageSize < 700) {
      this.imageSize += 50;
    }
  }

  zoomOut() {
    if (this.imageSize > 50) {
      this.imageSize -= 50;
    }
  }

  ngOnInit() {
    this.generateRandomImage();
  }
}
