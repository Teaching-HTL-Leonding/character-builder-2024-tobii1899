import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebAPIService {
  private httpClient = inject(HttpClient);

  async getImage(eye: string, hasHammer: boolean, mouth: string, rightHand: string, hasTail: boolean): Promise<WebAPIService> {
    const requestBody = {
      eye: eye,
      hasHammer: hasHammer,
      mouth: mouth,
      rightHand: rightHand,
      hasTail: hasTail
    };

    const response = await firstValueFrom(
      this.httpClient.post<WebAPIService>(
        'http://localhost:3000/openai/deployments/gpt-4o-mini/chat/completions',
        requestBody
      )
    );

    return response;
  }
}
