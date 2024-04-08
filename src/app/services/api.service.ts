import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG, AppConfig } from '../../config';
import { PaymentDto, Status } from '../interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private readonly httpClient: HttpClient) { }

  public getTransactions(
    page: number,
    size: number,
    status?: Status,
    createdAtStart?: string,
    createdAtEnd?: string
  ): Observable<PaymentDto> {
    let params = new HttpParams();
    params = params.append("page", page);
    params = params.append("size", size);
    params = params.append("status", status ?? "");
    params = params.append("createdAtStart", createdAtStart ?? "");
    params = params.append("createdAtEnd", createdAtEnd ?? "");

    return this.httpClient.get<PaymentDto>(
      `${this.config.serverUrl}/api/v1/payments`, {
        params
    })
  }
}
