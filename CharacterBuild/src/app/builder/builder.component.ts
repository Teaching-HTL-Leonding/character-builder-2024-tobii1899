import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

interface WebAPIService {
  url: string;
}

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './builder.component.html',
  styleUrl: './builder.component.css'
})
export class BuilderComponent {
  eye = signal<string>('NoEye');
  hasHammer = signal<boolean>(false);
  mouth = signal<string>('NoMouth');
  rightHand = signal<string>('NoHand');
  hasTail = signal<boolean>(false);

  constructor(private httpClient: HttpClient) {}

  async getImage(): Promise<WebAPIService> {
    const requestBody = {
      eye: this.eye(),
      hasHammer: this.hasHammer(),
      mouth: this.mouth(),
      rightHand: this.rightHand(),
      hasTail: this.hasTail()
    };

    const response = await firstValueFrom(
      this.httpClient.post<WebAPIService>(
        'http://localhost:5110/build-image-url',
        requestBody
      )
    );

    return response;
  }

  async onBuildImage() {
    try {
      const result = await this.getImage();
      const image = document.getElementById('image') as HTMLImageElement;

      image.src = result.url;

      console.log(image.src)
    } catch (error) {
      console.error('Error building image:', error);
    }
  }
}
