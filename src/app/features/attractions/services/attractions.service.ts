import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { ApiService } from '../../../core/services/api.service';
import { Attractions } from '../models/attraction.model';

@Injectable({
  providedIn: 'root',
})
export class AttractionsService {
  constructor(private apiService: ApiService) {}

  getAttractions(params?: {
    page?: number;
    per_page?: number;
    search?: string;
  }): Observable<ApiResponse<Attractions[]>> {
    return this.apiService.get<Attractions[]>('attractions', params);
  }

  createAttraction(
    user: Partial<Attractions>
  ): Observable<ApiResponse<Attractions>> {
    return this.apiService.post<Attractions>('auth/attractions/create', user);
  }

  updateAttraction(
    id: number,
    user: Partial<Attractions>
  ): Observable<ApiResponse<Attractions>> {
    return this.apiService.put<Attractions>(`auth/attractions/update`, user);
  }

  deleteAttraction(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`attractions/delete`, { id: id });
  }
}
